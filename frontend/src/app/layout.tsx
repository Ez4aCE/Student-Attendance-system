import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#dbffeb] min-h-screen text-gray-800 font-sans pb-10">
        
        <Navbar />
        
        {/* Responsive Container */}
        <div className="max-w-5xl mx-4 md:mx-auto mt-6 md:mt-10 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-[#8dce27]/20">
          {children}
        </div>
        
      </body>
    </html>
  );
}