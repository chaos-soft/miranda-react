import React, { useState } from 'react'

import Base from '../components/base'
import Messages from '../components/messages'

export default function TwoB () {
  const [messages, setMessages] = useState([])

  function onAnimationEnd (e) {
    e.target.animate(
      [{ marginTop: `-${e.target.offsetHeight}px` }],
      { delay: 5000, duration: 500, fill: 'forwards' }
    )
  }

  return (
    <Base>
      <main className='stream twob'>
        <Messages
          isColor
          messages={messages}
          offset={-10}
          onAnimationEnd={onAnimationEnd}
          setMessages={setMessages}
          systemIds={['e', 'p', 'js']}
        />
      </main>
    </Base>
  )
}
