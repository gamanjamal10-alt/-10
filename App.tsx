import React, { useState, useMemo } from 'react';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';

// Components
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Modal } from './components/Modal';
import { AssistantModal } from './components/AssistantModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { AddItemForm } from './components/AddItemForm';
import { AddAnimalForm } from './components/AddAnimalForm';
import { AlertList } from './components/AlertList';


// Data and Types
import { STATS_DATA, KPI_DATA, TASKS_DATA, ALERTS_DATA, HERD_DATA, EVENTS_DATA } from './constants';
import type { Task, Animal, Alert, FarmEvent, Stat } from './types';

function App() {
    const [activePage, setActivePage] = useState('لوحة القيادة');
    const [tasks, setTasks] = useState<Task[]>(TASKS_DATA);
    const [herd, setHerd] = useState<Animal[]>(HERD_DATA);
    const [events, setEvents] = useState<FarmEvent[]>(EVENTS_DATA);
    const [alerts] = useState<Alert[]>(ALERTS_DATA);

    // Modal States
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [addMode, setAddMode] = useState<'task' | 'animal'>('task');
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [selectedAnimalForEdit, setSelectedAnimalForEdit] = useState<Animal | null>(null);
    const [isAllAlertsModalOpen, setIsAllAlertsModalOpen] = useState(false);

    // Dynamic Stats Calculation
    const stats: Stat[] = useMemo(() => {
        const sickCount = herd.filter(a => a.healthStatus === 'Sick').length;
        const criticalAlertsCount = alerts.filter(a => a.type === 'danger').length;
        const dairyCows = herd.filter(animal => animal.type === 'cattle' && animal.subType === 'بقرة حلوب').length;
        const milkProduction = dairyCows * 25;
        
        const cattleCount = herd.filter(animal => animal.type === 'cattle').length;
        const sheepCount = herd.filter(animal => animal.type === 'sheep').length;


        const baseStats = [
             { title: 'عدد الأبقار', value: cattleCount.toString(), icon: 'pets' },
             { title: 'عدد الأغنام', value: sheepCount.toString(), icon: 'pets' },
        ];

        return [
            ...baseStats,
            ...STATS_DATA.map(stat => {
                if (stat.title === 'حالات مرضية') {
                    return { ...stat, value: sickCount.toString() };
                }
                if (stat.title === 'تنبيهات حرجة') {
                    return { ...stat, value: criticalAlertsCount.toString() };
                }
                if (stat.title === 'إنتاج الحليب اليومي') {
                    return { ...stat, value: `${milkProduction.toLocaleString()} لتر` };
                }
                return { ...stat, value: 'N/A' };
            })
        ];
    }, [herd, alerts]);

    const handleToggleTask = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleAddTask = (newTask: Omit<Task, 'id' | 'priority' | 'completed'>) => {
        const taskToAdd: Task = {
            id: Date.now(),
            priority: 'normal',
            completed: false,
            ...newTask,
        };
        setTasks(prevTasks => [taskToAdd, ...prevTasks]);
        setIsAddItemModalOpen(false);
    };
    
    const handleAddAnimal = (newAnimal: Omit<Animal, 'id'>) => {
        const animalToAdd: Animal = {
            id: `${newAnimal.type.charAt(0).toUpperCase()}${Date.now().toString().slice(-4)}`,
            ...newAnimal,
        };
        setHerd(prevHerd => [animalToAdd, ...prevHerd]);
        setIsAddItemModalOpen(false);
    };

    const handleOpenImageEditor = (animal: Animal) => {
        setSelectedAnimalForEdit(animal);
        setIsImageEditorOpen(true);
    };

    const handleUpdateAnimalImage = (animalId: string, newImageUrl: string) => {
        setHerd(prevHerd =>
            prevHerd.map(animal =>
                animal.id === animalId ? { ...animal, imageUrl: newImageUrl } : animal
            )
        );
        setIsImageEditorOpen(false);
    };

    const handleViewAllTasks = () => {
        setActivePage('المهام');
    };

    const handleViewAllAlerts = () => {
        setIsAllAlertsModalOpen(true);
    };


    const renderPage = () => {
        switch (activePage) {
            case 'القطيع':
                return <HerdPage herd={herd} events={events} onEditImage={handleOpenImageEditor} />;
            case 'المهام':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} />;
            case 'التقارير':
                return <ReportsPage tasks={tasks} herd={herd} />;
            case 'لوحة القيادة':
            default:
                return (
                    <DashboardPage
                        stats={stats}
                        kpiData={KPI_DATA}
                        tasks={tasks}
                        alerts={alerts}
                        onToggleTask={handleToggleTask}
                        onViewAllTasks={handleViewAllTasks}
                        onViewAllAlerts={handleViewAllAlerts}
                    />
                );
        }
    };
    
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-text-light-primary dark:text-dark-primary">
            <TopAppBar onAssistantClick={() => setIsAssistantOpen(true)} />
            
            <main className="pt-20 pb-24">
                {renderPage()}
            </main>

            <FloatingActionButton onClick={() => setIsAddItemModalOpen(true)} />

            <BottomNavBar activeItem={activePage} onNavigate={setActivePage} />

            <AssistantModal
                isOpen={isAssistantOpen}
                onClose={() => setIsAssistantOpen(false)}
                appData={{ tasks, alerts, herd }}
            />
            
            <ImageEditorModal
                isOpen={isImageEditorOpen}
                onClose={() => setIsImageEditorOpen(false)}
                animal={selectedAnimalForEdit}
                onUpdateAnimalImage={handleUpdateAnimalImage}
            />

            <Modal isOpen={isAddItemModalOpen} onClose={() => setIsAddItemModalOpen(false)} title="إضافة عنصر جديد">
                <div className="flex justify-center mb-4 border-b border-border-light dark:border-border-dark">
                    <button onClick={() => setAddMode('task')} className={`px-4 py-2 font-medium ${addMode === 'task' ? 'border-b-2 border-primary text-primary' : 'text-text-light-secondary dark:text-dark-secondary'}`}>
                        مهمة جديدة
                    </button>
                    <button onClick={() => setAddMode('animal')} className={`px-4 py-2 font-medium ${addMode === 'animal' ? 'border-b-2 border-primary text-primary' : 'text-text-light-secondary dark:text-dark-secondary'}`}>
                        حيوان جديد
                    </button>
                </div>
                {addMode === 'task' ? (
                    <AddItemForm onAddTask={handleAddTask} />
                ) : (
                    <AddAnimalForm onAddAnimal={handleAddAnimal} />
                )}
            </Modal>
            
            <Modal isOpen={isAllAlertsModalOpen} onClose={() => setIsAllAlertsModalOpen(false)} title="جميع التنبيهات">
                <div className="max-h-[60vh] overflow-y-auto">
                    <AlertList
                        title=""
                        alerts={alerts}
                        onAlertClick={() => {}} // Clicks do nothing in this overview list
                    />
                </div>
            </Modal>
        </div>
    );
}

export default App;