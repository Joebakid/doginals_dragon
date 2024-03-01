import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Dragon Cartel",
  description: "Doginals Dragon Rarity Checker",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <main className="min-h-screen pt-12 pb-20 ">{children}</main>
      </body>
    </html>
  );
}
