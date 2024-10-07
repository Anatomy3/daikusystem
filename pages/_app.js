// pages/_app.js
import '../styles/globals.css'; // Import global CSS di sini

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
