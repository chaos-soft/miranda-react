import React, { useState, useEffect, useRef } from 'react'

import Base from '../components/base'
import Tts from '../components/tts'

export default function Main () {
  const [messages, setMessages] = useState([])
  const [isScrolling_, setIsScrolling_] = useState(true)
  const [stats, setStats] = useState({})
  const main = useRef(null)
  const isScrolling = useRef(true)

  function emptyData () {
    isScrolling.current = false
  }

  function error () {
    const message = { id: 'm', text: 'потеряно соединение.', classes: ['m'] }
    setMessages((messages) => [...messages, message])
    emptyData()
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
      window.scroll(0, 1000000)
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
    <Base>
      <div className='main'>
        <div className='panel'>
          <div><img src='store/icons/g.png' /> <span>{stats.g}</span></div>
          <div><img src='store/icons/t.ico' /> <span>{stats.t}</span></div>
          <div><img src='store/icons/v.png' /> <span>{stats.v}</span></div>
          <i className={isScrolling_ ? '' : 'active'} onClick={startScroll}>Прокрутка</i>
        </div>
        <main className='wrapper' ref={main}>
          <Tts
            emptyData={emptyData}
            error={error}
            main={(data) => setStats(data.stats)}
            messages={messages}
            setMessages={setMessages}
            systemIds={['e', 'm', 'p', 'js', 'tts']}
          />
        </main>
      </div>
    </Base>
  )
}
