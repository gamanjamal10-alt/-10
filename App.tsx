import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AssistantModal } from './components/AssistantModal';
import { AddItemForm } from './components/AddItemForm';
import { Modal } from './components/Modal';
import type { Task, Alert, Animal } from './types';
import { TASKS_DATA, ALERTS_DATA, HERD_DATA } from './constants';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('لوحة القيادة');
    const [isAssistantModalOpen, setAssistantModalOpen] = useState(false);
    const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);

    const [tasks, setTasks] = useState<Task[]>(TASKS_DATA);
    const [alerts, setAlerts] = useState<Alert[]>(ALERTS_DATA);
    const [herd, setHerd] = useState<Animal[]>(HERD_DATA);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'priority'>) => {
        setTasks(prevTasks => [
            ...prevTasks,
            { ...newTask, id: Date.now(), priority: 'normal' }
        ]);
        setAddItemModalOpen(false);
    };
    
    const allData = { tasks, alerts, herd };

    const renderPage = () => {
        switch (activePage) {
            case 'لوحة القيادة':
                return <DashboardPage 
                    tasks={tasks.slice(0, 3)} 
                    alerts={alerts} 
                    onViewAllTasks={() => setActivePage('المهام')} 
                    onViewAllAlerts={() => alert('سيتم عرض جميع التنبيهات هنا قريبًا.')}
                />;
            case 'القطيع':
                return <HerdPage herd={herd} />;
            case 'المهام':
                return <TasksPage tasks={tasks} />;
            case 'التقارير':
                return <ReportsPage />;
            default:
                return <DashboardPage tasks={tasks.slice(0, 3)} alerts={alerts} onViewAllTasks={() => setActivePage('المهام')} />;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans" dir="rtl">
            <TopAppBar onAssistantClick={() => setAssistantModalOpen(true)} />
            <main className="pt-20 pb-24">
                {renderPage()}
            </main>
            <FloatingActionButton onClick={() => setAddItemModalOpen(true)} />
            <BottomNavBar activeItem={activePage} onNavigate={setActivePage} />
            <AssistantModal 
                isOpen={isAssistantModalOpen} 
                onClose={() => setAssistantModalOpen(false)}
                appData={allData}
             />
             <Modal isOpen={isAddItemModalOpen} onClose={() => setAddItemModalOpen(false)} title="إضافة عنصر جديد">
                <AddItemForm onAddTask={handleAddTask} />
             </Modal>
        </div>
    );
};

export default App;