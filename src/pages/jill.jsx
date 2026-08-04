import React, { useState, useEffect, useRef } from 'react'

import Messages from '../components/messages'

let scrollInterval = null

export default function Jill () {
  const [index, setIndex] = useState(0)
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const main = useRef(null)

  function scroll () {
    window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (index !== 0) {
      scroll()
    }
    scrollInterval = setInterval(() => {
      scroll()
      setIndex((index) => index + 1)
    }, 5 * 1000)
    setTotal(messages.length)
    return () => {
      clearInterval(scrollInterval)
      scrollInterval = null
    }
  }, [messages])

  useEffect(() => {
    if (index >= total) {
      clearInterval(scrollInterval)
      scrollInterval = null
      setIndex(total)
    }
  }, [index])

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <main
      className={`
        ${index >= total ? 'opacity-0' : ''}
        *:[&_b]:text-frost3
        *:[&_img]:first:align-sub
        *:[&_img]:first:w-[16px]
        *:[div]:h-screen
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
      <Messages
        isColor
        isMiranda={false}
        messages={messages}
        offset={-2}
        setMessages={setMessages}
      />
    </main>
  )
}
