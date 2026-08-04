import React, { useState, useEffect, useRef } from 'react'

import Messages from '../components/messages'

export default function Stream () {
  // На 12 чат скрывается (через 60 секунд).
  const [i, setI] = useState(0)
  const [messages, setMessages] = useState([])
  const main = useRef(null)
  const isScrolling = useRef(true)

  function emptyData () {
    isScrolling.current = false
    setI((i) => i + 1)
  }

  function scroll () {
    if (isScrolling.current) {
      window.scroll({ top: main.current.offsetHeight, left: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    let scrollInterval = setInterval(scroll, 1000)
    return () => {
      clearInterval(scrollInterval)
      scrollInterval = null
    }
  }, [])

  useEffect(() => {
    isScrolling.current = true
    setI(0)
  }, [messages])

  return (
    <main
      className={`
        ${i >= 12 ? 'opacity-0' : ''}
        *:[&_b]:text-frost3
        *:[&_img]:first:align-sub
        *:[&_img]:first:w-[16px]
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
      <Messages
        emptyData={emptyData}
        error={emptyData}
        isColor
        isMiranda={false}
        messages={messages}
        offset={-10}
        setMessages={setMessages}
      />
    </main>
  )
}
