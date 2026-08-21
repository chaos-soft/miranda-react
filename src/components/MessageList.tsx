import DOMPurify from "dompurify";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";

import MessageItem from "./MessageItem";
import useWebSocket from "./hooks/useWebSocket.ts";
import {
  MessageG,
  MessageM,
  MessageT,
  MessageV,
  MessageY,
  type DataServer,
  type DataServerMessage,
  type Message,
} from "../models";

const messagesMaxLength = 500;

class MessageFactory {
  create(data: DataServerMessage): Message {
    switch (data.id) {
      case "g":
        return new MessageG(data);
      case "m":
        return new MessageM(data);
      case "t":
        return new MessageT(data);
      case "v":
        return new MessageV(data);
      case "y":
        return new MessageY(data);
      default:
        throw new Error(`Unknown message id: ${data.id}`);
    }
  }
}

const factory = new MessageFactory();

interface MessageListProps {
  error?: () => void;
  imageOnLoad?: () => void;
  isColor?: boolean;
  isMiranda?: boolean;
  main?: (v: DataServer) => void;
  messages: Message[];
  processMessage?: (v: Message) => void;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

function MessageList({
  error,
  imageOnLoad,
  isColor,
  isMiranda,
  main,
  messages,
  processMessage,
  setMessages,
}: MessageListProps) {
  const names = useRef<string[]>([]);

  function onMessage(data: string) {
    let d: DataServer;
    try {
      d = JSON.parse(data);
    } catch {
      return;
    }
    names.current = d.names;
    main?.(d);
    if (d.messages.length) {
      for (let i = 0; i < d.messages.length; i++) {
        if (!isMiranda && d.messages[i].id === "m") {
          continue;
        }
        const message = factory.create(d.messages[i]);
        processMessage_(message, i);
        processMessage?.(message);
        setMessages((messages) => {
          const next = [...messages, message];
          return next.length > messagesMaxLength
            ? next.slice(next.length - messagesMaxLength)
            : next;
        });
      }
    }
  }

  function processMessage_(message: Message, index: number) {
    if (message instanceof MessageM && message.text === "clean_chat") {
      setMessages([]);
      return;
    }
    if (!(message instanceof MessageM)) {
      if (index === 0) {
        message.addClass("first");
      }
      message.findNames(names.current);
      message.process();
    }
  }

  useEffect(() => {
    return () => {
      names.current = [];
    };
  }, []);

  useWebSocket(onMessage, error);

  return messages.map((message, i) => {
    if (message instanceof MessageM) {
      return (
        <div key={i} className={message.getClasses()}>
          <b>{message.name}</b>
          {": "}
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(message.text),
            }}
          />
        </div>
      );
    } else {
      return (
        <MessageItem
          imageOnLoad={imageOnLoad}
          isColor={isColor}
          key={i}
          message={message}
        />
      );
    }
  });
}

export { MessageList as default, type MessageListProps };
