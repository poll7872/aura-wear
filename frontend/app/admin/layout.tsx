import { AdminNav } from "@/components/ui/AdminNav";
import { ToastNotification } from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNav />
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:min-h-screen lg:px-0">
        <div className="mx-auto my-10 w-full rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_18px_42px_hsl(var(--foreground)/0.12)] backdrop-blur-sm sm:p-8 lg:w-3/5 lg:p-10">
          {children}
        </div>
      </div>
      <ToastNotification />
    </>
  );
}
