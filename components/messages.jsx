/* global WebSocket */
import React, { useEffect, useState } from 'react'

import { Message } from './common'

const icons = { g: 'g.png', s: 's.ico', t: 't.ico', w: 'w.png' }
const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL

function Messages ({
  emptyData,
  error,
  isColor,
  main,
  messages,
  offset,
  setMessages,
  systemIds,
  ...props
}) {
  const [isReconnect, setIsReconnect] = useState(true)
  let names = []
  offset = offset || 0

  function processMessage (message) {
    if (message.id === 'js' && message.text === 'clean_chat') {
      setMessages([])
    } else if (message.id in icons) {
      message.classes = [message.id]
      new Message(message).replace()
      names.forEach((name) => {
        if (message.text.search(name) !== -1) {
          message.classes.push('name')
        }
      })
    }
  }

  useEffect(() => {
    const w = new WebSocket(url)
    w.addEventListener('close', () => {
      clearInterval(interval)
      setTimeout(() => setIsReconnect(!isReconnect), 5 * 1000)
      if (error) {
        error()
      }
    })
    w.addEventListener('message', (e) => {
      const data = JSON.parse(e.data)
      names = data.names
      offset = data.total
      if (main) {
        main(data)
      }
      if (data.messages.length) {
        data.messages.forEach((message) => processMessage(message))
        setMessages((messages) => [...messages, ...data.messages])
      } else if (emptyData) {
        emptyData()
      }
    })
    const interval = setInterval(() => {
      if (w.readyState === w.OPEN) {
        w.send(JSON.stringify({ offset }))
      }
    }, 5 * 1000)
    return () => w.close()
  }, [isReconnect])

  return (
    messages.map((message, i) => {
      if (systemIds.includes(message.id)) {
        return (
          <div key={i} className={message.id} {...props}>
            <b>Miranda</b>: {message.text}
          </div>
        )
      } else if (message.id in icons) {
        return (
          <div key={i} className={message.classes.join(' ')} {...props}>
            <img src={`store/icons/${icons[message.id]}`} loading='lazy' />
            {' '}
            {isColor
              ? <b style={{ color: message?.color }}>{message.name}</b>
              : <b>{message.name}</b>}
            {': '}
            <span dangerouslySetInnerHTML={{ __html: message.text }} />
          </div>
        )
      }
      return null
    })
  )
}

export { Messages as default, icons }
