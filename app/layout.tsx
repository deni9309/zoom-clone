import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoom",
  description: "Create, schedule, share and join video calls.",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/yoom-logo.svg',
            socialButtonsVariant: 'iconButton'
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#0E78F9',
            colorBackground: '#1C1F2E',
            colorInputBackground: '#252A41',
            colorInputText: '#fff'
          }
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
