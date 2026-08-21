import { useCallback, useEffect, useMemo, useState } from "react";

import { MessageT, type Message } from "../models";

interface MessageItemProps {
  imageOnLoad?: () => void;
  isColor?: boolean;
  message: Message;
}

function MessageItem({ imageOnLoad, isColor, message }: MessageItemProps) {
  const [isAlert, setIsAlert] = useState(true);

  const onImageOnLoad = useCallback(() => {
    imageOnLoad?.();
  }, [imageOnLoad]);

  const processText = useMemo(() => {
    return message.text.split(" ").map((word) => {
      if (Object.hasOwn(message.images, word)) {
        return { type: "image", src: message.images[word] };
      } else {
        return { type: "text", content: word };
      }
    });
  }, [message.images, message.text]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsAlert(false), 10 * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${isAlert ? "alert" : ""} ${message.getClasses()}`}>
      <img src={`store/icons/${message.icon}`} alt="" onLoad={onImageOnLoad} />{" "}
      {isColor && message instanceof MessageT ? (
        <b style={{ color: message.color }}>{message.name}</b>
      ) : (
        <b>{message.name}</b>
      )}
      {": "}
      {processText.map((part, index) => {
        if (part.type === "image") {
          return (
            <span key={index}>
              <img alt="" onLoad={onImageOnLoad} src={part.src} />{" "}
            </span>
          );
        } else {
          return <span key={index}>{part.content} </span>;
        }
      })}
    </div>
  );
}

export default MessageItem;
