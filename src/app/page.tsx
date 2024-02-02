import Footer from "@/components/home/Footer";
import Login from "@/components/home/Login/Login";
import Título from "@/components/home/Título";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-neutral-700 gap-10 xs:p-12">
      {/* título */}
      <Título />
      <Login />
      <Footer />
    </main>
  );
}
