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
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,_hsl(var(--primary)/0.09),_transparent_40%)]" />
      <MainNav />
      <main className="relative z-10 flex-grow overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          {children}
        </div>
        <Footer />
      </main>
      <CartManager />
      <ToastNotification />
    </div>
  );
}
