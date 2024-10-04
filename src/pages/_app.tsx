// src/pages/_app.tsx
import Footer from "@/components/footer";
import Headers from "@/components/headers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { useState, useEffect, ReactNode } from "react";
import Router from "next/router";
import LoadingSpinner from "../components/loading-spinner";
import { SessionProvider, signIn, useSession } from "next-auth/react";

// Local font configuration
const barlow = localFont({
  src: "../../public/fonts/Barlow.ttf",
  variable: "--font-barlow",
  weight: "400",
});

// Define the Auth component for general user authentication
interface AuthProps {
  children: ReactNode;
}

function Auth({ children }: AuthProps) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") {
    return <div>Loading or not authenticated...</div>;
  }

  return <>{children}</>;
}

// Define the AdminAuth component for admin-specific authentication
function AdminAuth({ children }: AuthProps) {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") {
    return <div>Loading or not authenticated...</div>;
  }

  // Check if the user is an admin
  const isAdmin = session?.user?.user?.role === "admin";

  if (!isAdmin) {
    return (
      <section className="h-screen flex justify-center">
        <p>Admin login required!</p>
      </section>
    );
  }

  return <>{children}</>;
}

// Main MyApp component
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleError);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };
  }, []);

  return (
    <SessionProvider
      refetchInterval={1 * 45 * 60} // Should be less than session maxAge
      refetchOnWindowFocus={true}
      session={pageProps.session}
    >
      {loading && <LoadingSpinner />}
      <section
        className={`${barlow.variable} font-[family-name:var(--font-barlow)]`}
      >
        <Headers />
        <main className="pt-16">
          {Component.adminAuth ? (
            <AdminAuth>
              <Component {...pageProps} />
            </AdminAuth>
          ) : Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
        <Footer />
      </section>
    </SessionProvider>
  );
}

export default MyApp;
