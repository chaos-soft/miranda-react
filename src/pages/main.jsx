import React, { useState, useEffect, useRef } from 'react'

import Tts from '../components/tts'

const message = { id: 'm', text: 'потеряно соединение.', classes: ['m'] }

export default function Main () {
  const [isScrolling_, setIsScrolling_] = useState(true)
  const [messages, setMessages] = useState([])
  const [offset, setOffset] = useState(0)
  const [stats, setStats] = useState({})
  const isScrolling = useRef(true)
  const main = useRef(null)

  function emptyData () {
    isScrolling.current = false
  }

  function error () {
    if ((messages[messages.length - 1] || {}).text !== message.text) {
      setMessages((messages) => [message])
    }
    emptyData()
    setOffset(-5)
  }

  function keydown (e) {
    if (['PageUp', 'Home', 'ArrowUp'].indexOf(e.key) !== -1) {
      stopScroll()
    }
  }

  function mousedown (e) {
    if (e.clientX > document.body.clientWidth) {
      stopScroll()
    }
  }

  function scroll () {
    if (isScrolling.current) {
      window.scroll({ top: main.current.offsetHeight, left: 0, behavior: 'smooth' })
    }
  }

  function startScroll () {
    isScrolling.current = true
    setIsScrolling_(true)
  }

  function stopScroll () {
    isScrolling.current = false
    setIsScrolling_(false)
  }

  useEffect(() => {
    let scrollInterval = setInterval(scroll, 1000)
    document.addEventListener('keydown', keydown)
    document.addEventListener('mousedown', mousedown)
    document.addEventListener('touchstart', stopScroll)
    document.addEventListener('wheel', stopScroll)
    return () => {
      clearInterval(scrollInterval)
      scrollInterval = null
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('mousedown', mousedown)
      document.removeEventListener('touchstart', stopScroll)
      document.removeEventListener('wheel', stopScroll)
    }
  }, [])

  useEffect(() => {
    if (isScrolling_) {
      isScrolling.current = true
    }
  }, [messages])

  return (
    <div className='bg-night0 min-h-screen text-sm text-storm3'>
      <div className={`
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
        shadow-md/30
        text-shadow-lg/50
        top-0
        w-full
      `}
      >
        <img src='store/icons/g.png' alt='' />
        <span>{stats.g || '-'}</span>
        <img src='store/icons/t.ico' alt='' />
        <span>{stats.t || '-'}</span>
        <img src='store/icons/v.png' alt='' />
        <span>{stats.v || '-'}</span>
        <img src='store/icons/y.ico' alt='' />
        <span>{stats.y || '-'}</span>
        <span
          className={
            'cursor-pointer' +
            (isScrolling_ ? ' opacity-50' : '')
          }
          onClick={startScroll}
        >
          Прокрутка
        </span>
      </div>

      <main
        className={`
          *:[&_a]:hover:no-underline
          *:[&_a]:underline
          *:[&_b]:text-frost3
          *:[&_b]:text-shadow-md/40
          *:[&_img]:first:align-sub
          *:[&_img]:first:w-[16px]
          *:[.alert]:border-aurora5
          *:[.first]:mt-10
          *:[.name]:bg-night4
          *:[.name]:py-1
          *:[div]:border-2
          *:[div]:border-night0
          *:[div]:duration-200
          *:[div]:px-1
          *:[div]:rounded-md
          *:[div]:transition-colors
          flex
          flex-col
          gap-1
          leading-5
          main-theme
          mx-2 xl:mx-auto xl:w-256
          pb-5
          pt-15
        `}
        ref={main}
      >
        <Tts
          emptyData={emptyData}
          error={error}
          isColor
          isMiranda
          main={(data) => setStats(data.stats)}
          messages={messages}
          offset={offset}
          setMessages={setMessages}
        />
      </main>
    </div>
  )
}
