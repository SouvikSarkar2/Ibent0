import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { Providers } from "./providers";
import client from "@/utils/apolliClient";
import { ApolloProvider } from "@apollo/client";
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

const quigly = localfont({
  src: [
    {
      path: "../fonts/QUIGLEYW.ttf",
    },
  ],
  variable: "--font-quigly",
});

const urbanist = localfont({
  src: [
    {
      path: "../fonts/Urbanist-Bold.ttf",
    },
  ],
  variable: "--font-urbanist",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} ${quigly.variable} ${cerlions.variable} ${ageya.variable} ${canopee.variable} ${confillia.variable} ${dahlia.variable} ${inter.className}`}
      >
        <Providers>
          <SessionProvider session={session}>{children}</SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
