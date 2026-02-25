import { MainNav } from "@/components/ui/MainNav";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { CartManager } from "@/components/cart/CartManager";
import { Footer } from "@/components/ui/Footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <MainNav />
      <main className="flex-grow overflow-y-auto">
        <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </div>
        <Footer />
      </main>
      <CartManager />
      <ToastNotification />
    </div>
  );
}
