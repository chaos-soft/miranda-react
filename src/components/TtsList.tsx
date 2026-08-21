import { useEffect, useRef, useState } from "react";

import MessageList, { type MessageListProps } from "./MessageList";
import { MessageM, type DataServer, type Message } from "../models";

function TtsList({ main, ...props }: MessageListProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const api = useRef<{ speak: (text: string) => void } | null>(null);
  const isBusy = useRef(false);
  const tts = useRef<string[]>([]);

  function main_(data: DataServer) {
    setApiKey(data.tts_api_key);
    main?.(data);
  }

  function processMessage(message: Message) {
    if (
      message instanceof MessageM &&
      (message.isDonate || message.isEvent || message.isTts)
    ) {
      tts.current.push(message.text);
      worker();
    }
  }

  function worker() {
    if (!isBusy.current) {
      const message = tts.current.shift();
      if (message) {
        isBusy.current = true;
        try {
          api.current?.speak(message);
        } catch (e) {
          console.error("TTS speak failed:", e);
          isBusy.current = false;
          worker();
        }
      }
    }
  }

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    const key: string = apiKey;
    let interval: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    function initTts() {
      if (!isMounted) {
        return false;
      }
      try {
        ya.speechkit.settings.apikey = key;
        api.current = new ya.speechkit.Tts({
          speaker: "omazh",
          stopCallback: () => {
            isBusy.current = false;
            worker();
          },
        });
        console.log("TTS init complete.");
        return true;
      } catch (e) {
        console.error("Failed to init TTS:", e);
        return false;
      }
    }

    if (!initTts()) {
      const startTime = Date.now();
      interval = window.setInterval(() => {
        if (initTts() || Date.now() - startTime > 10 * 1000) {
          if (interval) {
            clearInterval(interval);
          }
        }
      }, 1000);
    }

    return () => {
      api.current = null;
      isBusy.current = false;
      isMounted = false;
      tts.current = [];
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [apiKey]);

  return (
    <MessageList {...props} main={main_} processMessage={processMessage} />
  );
}

export default TtsList;
