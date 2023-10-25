import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <meta property="og:title" content="Backend developer specialist" />
        <meta
          property="og:url"
          content="https://findcarolinacosta.vercel.app"
        />
        <meta
          property="og:description"
          content="Carolina's portfolio, get to know me better. Backend developer specialist"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
