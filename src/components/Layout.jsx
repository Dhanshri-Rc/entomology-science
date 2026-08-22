import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
