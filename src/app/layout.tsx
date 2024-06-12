import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './components/ThemeProvider'; // Adjust the path if necessary

const APP_NAME = "EduConnect App";
const APP_DEFAULT_TITLE = "EduConnect PWA App";
const APP_TITLE_TEMPLATE = "%s - EduConnect App";
const APP_DESCRIPTION = "Best app for self-studying!";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/EduConnectAppIcon3.png',
        href: '/images/EduConnectAppIcon3.png',
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}; 

export const viewport: Viewport = {
  themeColor: "#41127C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter`}>
        <ThemeProvider>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
