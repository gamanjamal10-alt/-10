// FIX: Replaced placeholder content with a full implementation for the main App component.
import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AssistantModal } from './components/AssistantModal';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('لوحة القيادة');
    const [isAssistantModalOpen, setAssistantModalOpen] = useState(false);

    const renderPage = () => {
        switch (activePage) {
            case 'لوحة القيادة':
                return <DashboardPage />;
            case 'القطيع':
                return <HerdPage />;
            case 'المهام':
                return <TasksPage />;
            case 'التقارير':
                return <ReportsPage />;
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans" dir="rtl">
            <TopAppBar title={activePage} onNotificationClick={() => console.log('Notifications clicked')} onSettingsClick={() => console.log('Settings clicked')} />
            <main className="pt-20 pb-24">
                {renderPage()}
            </main>
            <FloatingActionButton onClick={() => setAssistantModalOpen(true)} />
            <BottomNavBar activeItem={activePage} onNavigate={setActivePage} />
            <AssistantModal isOpen={isAssistantModalOpen} onClose={() => setAssistantModalOpen(false)} />
        </div>
    );
};

export default App;
