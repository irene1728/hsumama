import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <AnnouncementMarquee />
      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}