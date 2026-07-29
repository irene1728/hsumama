import LogoutButton from "./LogoutButton";

export default function AdminHeader() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            徐媽媽冰鑽滷味
          </h1>
          <p className="text-sm text-gray-500">
            管理後台
          </p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}