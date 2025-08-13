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
          #FreedomFromHunger | India Gate Basmati Rice – 1 Share = 1 Meal for a Child
          in Need
        </title>
        <meta
          name="description"
          content="Join India Gate Basmati Rice's #FreedomFromHunger campaign. Every share helps put a full plate of food in front of a child who needs it. 1 Share = 1 Meal."
        />
        <meta
          name="keywords"
          content="GrainsOfHope, India Gate, Basmati Rice, charity, child nutrition, food donation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph - with full URLs and dimensions */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="#FreedomFromHunger | India Gate Basmati Rice – 1 Share = 1 Meal for a Child in Need"
        />
        <meta
          property="og:description"
          content="Join India Gate Basmati Rice's #FreedomFromHunger campaign. Every share helps put a full plate of food in front of a child who needs it. 1 Share = 1 Meal."
        />
        <meta
          property="og:image"
          content={"https://indiagategrainsofhope.com/home/logo.png"}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="GrainsOfHope Campaign - India Gate Basmati Rice"
        />
        <meta
          property="og:url"
          content={"https://indiagategrainsofhope.com"}
        />
        <meta property="og:site_name" content="India Gate Basmati Rice" />

        {/* Twitter Card - with full URLs */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="#FreedomFromHunger | India Gate Basmati Rice – 1 Share = 1 Meal for a Child in Need"
        />
        <meta
          name="twitter:description"
          content="Join India Gate Basmati Rice's #FreedomFromHunger campaign. Every share helps put a full plate of food in front of a child who needs it. 1 Share = 1 Meal."
        />
        <meta
          name="twitter:image"
          content={"https://indiagategrainsofhope.com/home/logo.png"}
        />
        <meta
          name="twitter:image:alt"
          content="GrainsOfHope Campaign - India Gate Basmati Rice"
        />

        {/* Additional meta for mobile */}
        <meta property="og:locale" content="en_US" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={customFont.variable}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
