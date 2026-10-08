export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-full flex flex-col">
        <h2 className="text-3xl font-bold pl-20 mt-10 mb-5">Admin Panel</h2>
        {children}
    </div>
  );
}
