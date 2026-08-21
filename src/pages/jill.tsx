import { useEffect, useRef, useState } from "react";

import MessageList from "../components/MessageList";
import { type Message } from "../models";

function Jill() {
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
    if (!main.current) {
      return;
    }
    if (main.current.getBoundingClientRect().bottom > window.innerHeight) {
      window.scrollBy({
        behavior: "smooth",
        top: window.innerHeight,
      });
      clearTimeout_();
      timeout.current = window.setTimeout(() => scroll(), 5 * 1000);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    if (messages.length) {
      clearTimeout_();
      setIsVisible(true);
      timeout.current = window.setTimeout(() => scroll(), 5 * 1000);
    }
  }, [messages]);

  useEffect(() => {
    window.scroll(0, 0);
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
        *:[div]:h-screen
        *:[div]:overflow-hidden
        duration-2000
        font-[helvetica_neue]
        font-bold
        jill-theme
        leading-5
        text-base
        text-shadow-md/40
        text-white
      `}
      ref={main}
    >
      <MessageList
        isColor={true}
        isMiranda={false}
        messages={messages}
        setMessages={setMessages}
      />
    </main>
  );
}

export default Jill;
