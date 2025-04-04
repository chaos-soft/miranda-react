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
      main.current.scroll(0, 1000000)
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
    <main className={`stream ${i >= 12 ? 'o0' : ''}`} ref={main}>
      <Messages
        emptyData={emptyData}
        error={emptyData}
        isColor
        messages={messages}
        offset={-10}
        setMessages={setMessages}
        systemIds={['e', 'p', 'js']}
      />
    </main>
  )
}
