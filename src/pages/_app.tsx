import "@/styles/globals.css";
import type { AppProps } from "next/app";


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
    <div className={customFont.variable}>
      <Component {...pageProps} />
    </div>
  );
}
