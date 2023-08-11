import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* <!--==================== UNICONS ====================--> */}
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
        />

        {/* <!--==================== Config infos link sharing ====================--> */}
        <meta
          name="description"
          content="Carolina's portfolio, get to know me better. Frontend developer"
        />
        <meta property="og:title" content="Frontend developer" />
        <meta
          property="og:url"
          content="https://findcarolinacosta.vercel.app/"
        />
        <meta
          property="og:description"
          content="Carolina's portfolio, get to know me better. Frontend developer"
        />

        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>Carolina</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
