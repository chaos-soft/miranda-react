import React, { useState, useEffect, useRef } from 'react'

import Messages from '../components/messages'

let scrollInterval = null

export default function Jill () {
  const [i, setI] = useState(0)
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const main = useRef(null)

  function scroll () {
    main.current.scrollBy(0, main.current.offsetHeight)
  }

  useEffect(() => {
    if (i !== 0) {
      scroll()
    }
    scrollInterval = setInterval(() => {
      scroll()
      setI((i) => i + 1)
    }, 5000)
    setTotal(messages.length)
    return () => {
      clearInterval(scrollInterval)
      scrollInterval = null
    }
  }, [messages])

  useEffect(() => {
    if (i >= total) {
      clearInterval(scrollInterval)
      scrollInterval = null
      setI(total)
    }
  }, [i])

  return (
    <main className={`stream jill ${i >= total ? 'o0' : ''}`} ref={main}>
      <Messages
        isColor
        messages={messages}
        offset={-2}
        setMessages={setMessages}
        systemIds={['e', 'p', 'js']}
      />
    </main>
  )
}
