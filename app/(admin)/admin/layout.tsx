import AdminHeader from "@/components/admin/AdminHeader";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <AdminNav />

      <main className="p-0">
        {children}
      </main>
    </div>
  );
}