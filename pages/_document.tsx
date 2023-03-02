import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/gamefi/lottery/fav.ico" />
          <meta name="description" content="Welcome to Hero Arena Lottery" />
          <meta property="og:title" content="Hero Arena Lottery" />
          <meta property="og:url" content="https://lottery.heroarena.app/" />
          <meta property="og:image" content="/gamefi/lottery/img/banners/banner-1.png" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Hero Arena Lottery" />
          <meta property="og:image:alt" content="Visit lottery.heroarena.app" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
