import { useEffect, useRef, useState } from "react";

import MessageList from "../components/MessageList";
import { type Message } from "../models";

function Stream() {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const main = useRef<HTMLElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimeout_() {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }

  function scroll() {
    main.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }

  useEffect(() => {
    if (messages.length) {
      clearTimeout_();
      setIsVisible(true);
      timeout.current = window.setTimeout(() => setIsVisible(false), 60 * 1000);
    }
  }, [messages]);

  useEffect(() => {
    return () => clearTimeout_();
  }, []);

  return (
    <main
      className={`
        ${isVisible ? "" : "opacity-0"}
        *:[&>img]:first:align-sub
        *:[&>img]:w-[16px]
        *:[&_b]:font-bold
        *:[&_b]:text-frost3
        *:[div]:overflow-hidden
        duration-2000
        flex
        flex-col
        font-[helvetica_neue]
        font-bold
        gap-2
        leading-5
        stream-theme
        text-base
        text-shadow-md/40
        text-white
      `}
      ref={main}
    >
      <MessageList
        imageOnLoad={scroll}
        isColor={true}
        isMiranda={false}
        messages={messages}
        setMessages={setMessages}
      />
    </main>
  );
}

export default Stream;
