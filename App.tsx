import React, { useState, useEffect } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AssistantModal } from './components/AssistantModal';
import { AddAnimalForm } from './components/AddAnimalForm';
import { Modal } from './components/Modal';
import type { Task, Alert, Animal, FarmEvent } from './types';
import { TASKS_DATA, ALERTS_DATA, HERD_DATA, EVENTS_DATA } from './constants';

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
    const [isAddAnimalModalOpen, setAddAnimalModalOpen] = useState(false);

    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', TASKS_DATA);
    const [alerts, setAlerts] = useLocalStorage<Alert[]>('alerts', ALERTS_DATA);
    const [herd, setHerd] = useLocalStorage<Animal[]>('herd', HERD_DATA);
    const [events, setEvents] = useLocalStorage<FarmEvent[]>('events', EVENTS_DATA);

    const handleAddAnimal = (newAnimal: Omit<Animal, 'id'>) => {
        setHerd(prevHerd => [
            ...prevHerd,
            { ...newAnimal, id: `${newAnimal.type.charAt(0).toUpperCase()}${Date.now()}` }
        ]);
        setAddAnimalModalOpen(false);
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
                    herd={herd} 
                    onViewAllTasks={() => setActivePage('المهام')} 
                    onViewAllAlerts={() => alert('سيتم عرض جميع التنبيهات هنا قريبًا.')}
                    onToggleTask={handleToggleTask}
                />;
            case 'القطيع':
                return <HerdPage herd={herd} events={events} />;
            case 'المهام':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} />;
            case 'التقارير':
                return <ReportsPage tasks={tasks} herd={herd} />;
            default:
                return <DashboardPage tasks={tasks} alerts={alerts} herd={herd} onViewAllTasks={() => setActivePage('المهام')} onToggleTask={handleToggleTask} />;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans" dir="rtl">
            <TopAppBar onAssistantClick={() => setAssistantModalOpen(true)} />
            <main className="pt-20 pb-24">
                {renderPage()}
            </main>
            <FloatingActionButton onClick={() => setAddAnimalModalOpen(true)} />
            <BottomNavBar activeItem={activePage} onNavigate={setActivePage} />
            <AssistantModal 
                isOpen={isAssistantModalOpen} 
                onClose={() => setAssistantModalOpen(false)}
                appData={allData}
             />
             <Modal isOpen={isAddAnimalModalOpen} onClose={() => setAddAnimalModalOpen(false)} title="إضافة حيوان جديد">
                <AddAnimalForm onAddAnimal={handleAddAnimal} />
             </Modal>
        </div>
    );
};

export default App;
