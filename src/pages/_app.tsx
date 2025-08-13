import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import localFont from "next/font/local";

const customFont = localFont({
  src: [
    {
      path: "../../public/fonts/GothamXNarrow-Medium.otf", // Fixed path
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GothamXNarrow-Bold.otf", // Fixed path
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-custom",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          #GrainsOfHope | India Gate Basmati Rice – 1 Share = 1 Meal for a Child
          in Need
        </title>
        <meta
          name="description"
          content="Join India Gate Basmati Rice's #GrainsOfHope campaign. Every share helps put a full plate of food in front of a child who needs it. 1 Share = 1 Meal."
        />
        <meta
          name="keywords"
          content="GrainsOfHope, India Gate, Basmati Rice, charity, child nutrition, food donation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="#GrainsOfHope | India Gate Basmati Rice – 1 Share = 1 Meal for a Child in Need"
        />
        <meta
          property="og:description"
          content="Join India Gate Basmati Rice's #GrainsOfHope campaign. Every share helps put a full plate of food in front of a child who needs it. 1 Share = 1 Meal."
        />
        <meta property="og:image" content="/home/logo.png" />
        <meta property="og:site_name" content="India Gate Basmati Rice" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="#GrainsOfHope | India Gate Basmati Rice – 1 Share = 1 Meal for a Child in Need"
        />
        <meta
          name="twitter:description"
          content="Join India Gate Basmati Rice's #GrainsOfHope campaign. Every share helps put a full plate of food in front of a child who needs it. 1 Share = 1 Meal."
        />
        <meta name="twitter:image" content="/home/logo.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={customFont.variable}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
