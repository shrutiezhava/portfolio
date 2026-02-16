
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-background h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-alt-section/50 p-8 h-full">
                <div className="max-w-7xl mx-auto py-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
