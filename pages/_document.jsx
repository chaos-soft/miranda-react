import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='ru'>
      <Head>
        <link rel='stylesheet' href='store/common.css' />
        <link rel='stylesheet' href='store/2b.css' />
        <link rel='stylesheet' href='store/main.css' />
        <link rel='stylesheet' href='store/stream.css' />
        <meta name='description' content='' />
        <meta name='keywords' content='' />
        <script src='https://static.goodgame.ru/js/minified/global.js' />
        <script src='https://webasr.yandex.net/jsapi/v1/webspeechkit-settings.js' />
        <script src='https://webasr.yandex.net/jsapi/v1/webspeechkit.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
