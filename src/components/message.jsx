import React, { useEffect } from 'react'

export default function Message ({ message, isColor, icons, ...props }) {
  useEffect(() => {
    setTimeout(() => message.classes.shift(), 10 * 1000)
  }, [])

  return (
    <div className={message.classes.join(' ')} {...props}>
      <img src={`store/icons/${icons[message.id]}`} alt='' />
      {' '}
      {isColor
        ? <b style={{ color: message?.color }}>{message.name}</b>
        : <b>{message.name}</b>}
      {': '}
      {message.text.split(' ').map((v, i) => {
        if (v in message.images) {
          return <span key={i}><img src={message.images[v]} loading='lazy' alt='' />{' '}</span>
        } else {
          return <span key={i}>{v}{' '}</span>
        }
      })}
    </div>
  )
}
