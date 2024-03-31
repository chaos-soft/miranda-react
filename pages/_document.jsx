import { Html, Head, Main, NextScript } from 'next/document'

const isProd = process.env.NODE_ENV === 'production'

export default function Document () {
  return (
    <Html lang='ru'>
      <Head>
        {isProd && <link rel='stylesheet' href='store/xxx.css' />}
        {!isProd &&
          <>
            <link rel='stylesheet' href='store/reset.css' />
            <link rel='stylesheet' href='store/common.css' />
            <link rel='stylesheet' href='store/2b.css' />
            <link rel='stylesheet' href='store/jill.css' />
            <link rel='stylesheet' href='store/main.css' />
            <link rel='stylesheet' href='store/stream.css' />
          </>}
        <meta name='description' content='' />
        <meta name='keywords' content='' />
        <script async src='https://static.goodgame.ru/js/minified/global.js' />
        <script async src='https://webasr.yandex.net/jsapi/v1/webspeechkit-settings.js' />
        <script async src='https://webasr.yandex.net/jsapi/v1/webspeechkit.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
