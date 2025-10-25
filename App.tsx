import React, { useState, useEffect } from 'react';
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

// Custom hook to use localStorage
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};


const App: React.FC = () => {
    const [activePage, setActivePage] = useState('لوحة القيادة');
    const [isAssistantModalOpen, setAssistantModalOpen] = useState(false);
    const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);

    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', TASKS_DATA);
    const [alerts, setAlerts] = useLocalStorage<Alert[]>('alerts', ALERTS_DATA);
    const [herd, setHerd] = useLocalStorage<Animal[]>('herd', HERD_DATA);

    const handleAddTask = (newTask: Omit<Task, 'id' | 'priority' | 'completed'>) => {
        setTasks(prevTasks => [
            ...prevTasks,
            { ...newTask, id: Date.now(), priority: 'normal', completed: false }
        ]);
        setAddItemModalOpen(false);
    };

    const handleToggleTask = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };
    
    const allData = { tasks, alerts, herd };

    const renderPage = () => {
        switch (activePage) {
            case 'لوحة القيادة':
                return <DashboardPage 
                    tasks={tasks} 
                    alerts={alerts} 
                    onViewAllTasks={() => setActivePage('المهام')} 
                    onViewAllAlerts={() => alert('سيتم عرض جميع التنبيهات هنا قريبًا.')}
                    onToggleTask={handleToggleTask}
                />;
            case 'القطيع':
                return <HerdPage herd={herd} />;
            case 'المهام':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} />;
            case 'التقارير':
                return <ReportsPage />;
            default:
                return <DashboardPage tasks={tasks} alerts={alerts} onViewAllTasks={() => setActivePage('المهام')} onToggleTask={handleToggleTask} />;
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
             <Modal isOpen={isAddItemModalOpen} onClose={() => setAddItemModalOpen(false)} title="إضافة مهمة جديدة">
                <AddItemForm onAddTask={handleAddTask} />
             </Modal>
        </div>
    );
};

export default App;