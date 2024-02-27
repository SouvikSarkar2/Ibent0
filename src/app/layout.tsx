import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I b E n T 0",
  description: "An event calender app",
};

const cerlions = localfont({
  src: [
    {
      path: "../fonts/Cerlions-Regular.otf",
    },
  ],
  variable: "--font-cerlions",
});

const ageya = localfont({
  src: [
    {
      path: "../fonts/Ageya.otf",
    },
  ],
  variable: "--font-ageya",
});

const canopee = localfont({
  src: [
    {
      path: "../fonts/Canopee Regular.otf",
    },
  ],
  variable: "--font-canopee",
});

const confillia = localfont({
  src: [
    {
      path: "../fonts/ConfilliaBold.otf",
    },
  ],
  variable: "--font-confillia",
});

const dahlia = localfont({
  src: [
    {
      path: "../fonts/dahlia-regular.otf",
    },
  ],
  variable: "--font-dahlia",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cerlions.variable} ${ageya.variable} ${canopee.variable} ${confillia.variable} ${dahlia.variable} ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
