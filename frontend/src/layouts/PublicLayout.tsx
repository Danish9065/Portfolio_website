import { Outlet } from "react-router-dom";
import { ChatWidget } from "../components/ChatWidget";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
