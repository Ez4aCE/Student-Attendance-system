import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded shadow">
          {children}
        </div>
      </body>
    </html>
  );
}
