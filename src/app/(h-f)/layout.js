import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function HeaderFooterLayout({ children }) {
  return (
    <>
      <div className="flex-grow">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}