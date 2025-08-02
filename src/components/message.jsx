import React, { useEffect } from 'react'

export default function Message ({ message, isColor, icons, ...props }) {
  useEffect(() => {
    setTimeout(() => message.classes.shift(), 10 * 1000)
  }, [])

  return (
    <div className={message.classes.join(' ')} {...props}>
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
