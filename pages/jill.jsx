import React, { useState, useEffect, useRef } from 'react'

import Base from '../components/base'
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
    return () => clearInterval(scrollInterval)
  }, [messages])

  useEffect(() => {
    if (i === total) {
      clearInterval(scrollInterval)
    }
  }, [i])

  return (
    <Base>
      <main className={`stream jill ${i === total ? 'o0' : ''}`} ref={main}>
        <Messages
          isColor
          messages={messages}
          offset={-10}
          setMessages={setMessages}
          systemIds={['e', 'p', 'js']}
        />
      </main>
    </Base>
  )
}
