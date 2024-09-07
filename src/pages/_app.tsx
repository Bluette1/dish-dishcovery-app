import Footer from "@/components/footer";
import Headers from "@/components/headers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const barlow = localFont({
  src: "../../public/fonts/Barlow.ttf",
  variable: "--font-barlow",
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <section className={`${barlow.variable}  font-[family-name:var(--font-barlow)]`}>
      <Headers />
      <main className="pt-16"> {/* Padding to account for the fixed header */}
        <Component {...pageProps} />
      </main>
      <Footer />
    </section>
  );;
}
