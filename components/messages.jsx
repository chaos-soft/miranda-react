/* global WebSocket */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Message } from './common'

const icons = { g: 'g.png', s: 's.ico', t: 't.ico', y: 'y.ico', v: 'v.png' }
const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL

function Messages ({
  emptyData,
  error,
  isColor,
  main,
  messages,
  offset,
  processMessage,
  setMessages,
  systemIds,
  ...props
}) {
  const [isReconnect, setIsReconnect] = useState(true)
  const router = useRouter()
  let names = []
  offset = offset || 0

  function processMessage_ (message) {
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
    if (!router.isReady) {
      return
    }
    const w = new WebSocket(url)
    w.addEventListener('close', () => {
      clearInterval(interval)
      interval = null
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
        const dm = data.messages.filter((message) => {
          if (systemIds.includes(message.id) || message.id in icons) {
            return true
          }
          return false
        })
        if (dm.length) {
          dm.forEach((message) => {
            processMessage_(message)
            if (processMessage) {
              processMessage(message)
            }
          })
          setMessages((messages) => [...messages, ...dm])
        }
      } else if (emptyData) {
        emptyData()
      }
    })
    let interval = setInterval(() => {
      if (w.readyState === w.OPEN) {
        w.send(JSON.stringify({ offset, code: router.query.code }))
      }
    }, 5 * 1000)
    return () => w.close()
  }, [isReconnect, router.isReady])

  return (
    messages.map((message, i) => {
      if (systemIds.includes(message.id)) {
        return (
          <div key={i} className={message.id} {...props}>
            <b>Miranda</b>
            {': '}
            <span dangerouslySetInnerHTML={{ __html: message.text }} />
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
