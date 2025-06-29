import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { Router } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChangeError = (err) => {
      if (err.cancelled) {
        console.log('Route change was cancelled');
      }
    };

    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;