import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
 
const GmarketSans = localFont({
  src: [
    {
      path: '/fonts/GmarketSansTTFLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '/fonts/GmarketSansTTFMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/fonts/GmarketSansTTFBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gmarket-sans',
  display: 'swap',
})


import "./globals.css";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KEYKEEPER auto offer sheet",
  description: "KEYKEEPER auto offer sheet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GmarketSans.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
