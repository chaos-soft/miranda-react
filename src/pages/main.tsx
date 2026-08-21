import { useCallback, useEffect, useRef, useState } from "react";

import TtsList from "../components/TtsList";
import { MessageM, type DataServer, type Message, type Stats } from "../models";

const message = new MessageM({ text: "потеряно соединение." });

function Main() {
  const [isScrolling, setIsScrolling] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({});
  const main = useRef<HTMLElement | null>(null);
  const sentinel = useRef<HTMLDivElement | null>(null);

  const scroll = useCallback(() => {
    if (!isScrolling) {
      return;
    }
    main.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isScrolling]);

  function error() {
    setMessages(() => [message]);
  }

  function keydown(e: KeyboardEvent) {
    if (["PageUp", "Home", "ArrowUp"].indexOf(e.key) !== -1) {
      stopScroll();
    }
  }

  function mousedown(e: MouseEvent) {
    if (e.clientX > document.body.clientWidth) {
      stopScroll();
    }
  }

  function stopScroll() {
    setIsScrolling(false);
  }

  useEffect(() => {
    if (isScrolling) {
      scroll();
    }
  }, [isScrolling]);

  useEffect(() => {
    if (!sentinel.current) {
      return;
    }

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setIsScrolling(true);
      }
    };
    const options = { threshold: 1.0 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(sentinel.current);

    document.addEventListener("keydown", keydown);
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("touchstart", stopScroll);
    document.addEventListener("wheel", stopScroll);

    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("touchstart", stopScroll);
      document.removeEventListener("wheel", stopScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-night0 min-h-screen text-sm text-storm3">
      <div
        className={`
        *:[img]:w-[16px]
        backdrop-blur-md
        border-b-5
        border-night4
        fixed
        flex
        gap-2
        items-center
        justify-center
        left-0
        py-2
        select-none
        shadow-md/30
        text-shadow-lg/50
        top-0
        w-full
      `}
      >
        <img src="store/icons/g.png" alt="" />
        <span>{stats.g || "-"}</span>
        <img src="store/icons/t.ico" alt="" />
        <span>{stats.t || "-"}</span>
        <img src="store/icons/v.png" alt="" />
        <span>{stats.v || "-"}</span>
        <img src="store/icons/y.ico" alt="" />
        <span>{stats.y || "-"}</span>
        <button
          className={"cursor-pointer" + (isScrolling ? " opacity-50" : "")}
          onClick={() => setIsScrolling(!isScrolling)}
        >
          Прокрутка
        </button>
      </div>

      <main
        className={`
          *:[&>img]:first:align-sub
          *:[&>img]:w-[16px]
          *:[&_a]:hover:no-underline
          *:[&_a]:underline
          *:[&_b]:text-frost3
          *:[&_b]:text-shadow-md/40
          *:[.alert]:border-aurora5
          *:[.first]:mt-10
          *:[.name]:bg-night4
          *:[.name]:py-1
          *:[div]:border-2
          *:[div]:border-night0
          *:[div]:duration-200
          *:[div]:overflow-auto
          *:[div]:px-1
          *:[div]:rounded-md
          *:[div]:transition-colors
          flex
          flex-col
          gap-1
          leading-5
          main-theme
          mx-2 xl:mx-auto xl:w-256
          pt-15
        `}
        ref={main}
      >
        <TtsList
          error={error}
          imageOnLoad={scroll}
          isColor={true}
          isMiranda={true}
          main={(data: DataServer) => setStats(data.stats)}
          messages={messages}
          setMessages={setMessages}
        />
        <div className="h-5" ref={sentinel} />
      </main>
    </div>
  );
}

export default Main;
