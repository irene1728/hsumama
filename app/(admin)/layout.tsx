export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>後台管理系統</h1>
      {children}
    </div>
  );
}