// Usar el tipo de usuario de Clerk
type User = {
    id: string;
    firstName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
    publicMetadata?: { role?: string };
};
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeSection: string;
    onSectionChange: (section: string) => void;
    user: User;
}

const DashboardLayout = ({
    children,
    activeSection,
    onSectionChange,
    user
}: DashboardLayoutProps) => {
    return (
        <div className="h-screen w-full bg-theme-secondary">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    activeSection={activeSection}
                    onSectionChange={onSectionChange}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                    {/* Header */}
                    <Header user={user} />

                    {/* Content */}
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
