import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Mengatur favicon */}
          <link rel="icon" href="/daiku/logo.png" type="image/png" />

          {/* Mengatur title default dan meta description */}
          <meta name="description" content="Daiku - Spesialis desain interior dan eksterior serta furniture berkualitas untuk rumah, kantor, dan usaha." />

          {/* Font Google Montserrat dan Poppins */}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Poppins:wght@400;600&display=swap"
            rel="stylesheet"
          />

          {/* Font Awesome Icons */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
