import Footer from "@/components/footer";
import Headers from "@/components/headers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { useState, useEffect } from 'react';
import { Router } from 'next/router';
import LoadingSpinner from '../components/loading-spinner';

const barlow = localFont({
  src: "../../public/fonts/Barlow.ttf",
  variable: "--font-barlow",
  weight: "400",
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleError);

    // Cleanup event listeners on unmount
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleError);
    };
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <section className={`${barlow.variable}  font-[family-name:var(--font-barlow)]`}>
      <Headers />
      <main className="pt-16"> {/* Padding to account for the fixed header */}
        <Component {...pageProps} />
      </main>
      <Footer />
    </section>
    </>
    
  );
}

export default MyApp;
