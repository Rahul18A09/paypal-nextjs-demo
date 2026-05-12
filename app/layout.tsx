import Providers from "./providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-73px)] max-w-6xl px-4 py-8 sm:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}