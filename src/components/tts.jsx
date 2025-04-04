/* global ya */
import React, { useRef, useEffect, useState } from 'react'

import Messages from '../components/messages'

let interval = null

export default function Tts ({ main, ...props }) {
  const [apiKey, setApiKey] = useState(null)
  const api = useRef(null)
  const isBusy = useRef(false)
  const tts = useRef([])

  function main_ (data) {
    setApiKey(data.tts_api_key)
    if (main) {
      main(data)
    }
  }

  function processMessage (message) {
    if (message.id === 'tts') {
      tts.current.push(message.text)
    }
  }

  function worker () {
    if (!isBusy.current) {
      const message = tts.current.shift()
      if (message) {
        isBusy.current = true
        api.current.speak(message)
      }
    }
  }

  useEffect(() => {
    if (apiKey) {
      ya.speechkit.settings.apikey = apiKey
      api.current = new ya.speechkit.Tts({
        speaker: 'omazh',
        stopCallback: () => {
          isBusy.current = false
        }
      })
      interval = setInterval(() => worker(), 2000)
    }
    return () => {
      if (apiKey) {
        clearInterval(interval)
        interval = null
      }
    }
  }, [apiKey])

  return (
    <Messages
      main={main_}
      processMessage={processMessage}
      {...props}
    />
  )
}
