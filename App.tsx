
import React, { useState, useMemo } from 'react';

// Components
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Modal } from './components/Modal';
import { AddItemForm } from './components/AddItemForm';
import { AddAnimalForm } from './components/AddAnimalForm';
import { AddShepherdForm } from './components/AddShepherdForm';
import { AssistantModal } from './components/AssistantModal';
import { ImageEditorModal } from './components/ImageEditorModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import { ShepherdsPage } from './pages/ShepherdsPage';

// Data and Types
import type { Page, Task, Animal, Alert, Shepherd } from './types';
import { STATS_DATA, KPI_DATA, INITIAL_TASKS, INITIAL_ALERTS, INITIAL_HERD, FARM_EVENTS, INITIAL_SHEPHERDS } from './constants';

const App = () => {
    // State
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [herd, setHerd] = useState<Animal[]>(INITIAL_HERD);
    const [shepherds, setShepherds] = useState<Shepherd[]>(INITIAL_SHEPHERDS);
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);

    // Memos for derived data
    const alerts = useMemo(() => INITIAL_ALERTS, []);
    const stats = useMemo(() => STATS_DATA, []);
    const kpiData = useMemo(() => KPI_DATA, []);
    const farmEvents = useMemo(() => FARM_EVENTS, []);
    
    // Handlers
    const handleNavigation = (page: Page) => {
        setActivePage(page);
    };

    const handleToggleTask = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleAddTask = (taskData: Omit<Task, 'id' | 'completed' | 'priority'>) => {
        const newTask: Task = {
            id: Date.now(),
            ...taskData,
            priority: 'normal',
            completed: false
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setIsAddModalOpen(false);
    };

    const handleAddAnimal = (animalData: Omit<Animal, 'id'>) => {
        const newAnimal: Animal = {
            id: `${animalData.type === 'cattle' ? 'C' : 'S'}${Date.now().toString().slice(-4)}`,
            ...animalData,
            imageUrl: animalData.imageUrl || `https://source.unsplash.com/400x400/?${animalData.type}`
        };
        setHerd(prevHerd => [newAnimal, ...prevHerd]);
        setIsAddModalOpen(false);
    };

    const handleAddShepherd = (shepherdData: Omit<Shepherd, 'id'>) => {
        const newShepherd: Shepherd = {
            id: Date.now(),
            ...shepherdData,
        };
        setShepherds(prevShepherds => [newShepherd, ...prevShepherds]);
        setIsAddModalOpen(false);
    };
    
    const handleOpenImageEditor = (animal: Animal) => {
        setAnimalToEdit(animal);
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

    // Render logic
    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardPage
                    stats={stats}
                    kpiData={kpiData}
                    tasks={tasks}
                    alerts={alerts}
                    onToggleTask={handleToggleTask}
                    onViewAllTasks={() => setActivePage('tasks')}
                    onViewAllAlerts={() => { /* Can be implemented later */ }}
                />;
            case 'herd':
                return <HerdPage herd={herd} events={farmEvents} onEditImage={handleOpenImageEditor} />;
            case 'tasks':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} />;
            case 'reports':
                return <ReportsPage tasks={tasks} herd={herd} />;
            case 'shepherds':
                return <ShepherdsPage shepherds={shepherds} />;
            default:
                return <DashboardPage
                    stats={stats}
                    kpiData={kpiData}
                    tasks={tasks}
                    alerts={alerts}
                    onToggleTask={handleToggleTask}
                    onViewAllTasks={() => setActivePage('tasks')}
                    onViewAllAlerts={() => { /* Can be implemented later */ }}
                />;
        }
    };
    
    const renderAddForm = () => {
        switch (activePage) {
            case 'tasks':
                return <AddItemForm onAddTask={handleAddTask} />;
            case 'herd':
                return <AddAnimalForm onAddAnimal={handleAddAnimal} />;
            case 'shepherds':
                 return <AddShepherdForm onAddShepherd={handleAddShepherd} />;
            default:
                return null;
        }
    };

    const getAddModalTitle = () => {
        switch (activePage) {
            case 'tasks':
                return 'إضافة مهمة جديدة';
            case 'herd':
                return 'إضافة حيوان جديد';
            case 'shepherds':
                 return 'إضافة راعي جديد';
            default:
                return 'إضافة عنصر';
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-text-light-primary dark:text-dark-primary">
            <TopAppBar onAssistantClick={() => setIsAssistantModalOpen(true)} />

            {/* Main content with padding for app bars */}
            <main className="pt-16 pb-16">
                {renderPage()}
            </main>

            {/* Show FAB for pages that support adding items */}
            {['tasks', 'herd', 'shepherds'].includes(activePage) && (
                <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
            )}

            <BottomNavBar activePage={activePage} onNavigate={handleNavigation} />
            
            {/* Add Item Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={getAddModalTitle()}>
                {renderAddForm()}
            </Modal>
            
            {/* AI Assistant Modal */}
            <AssistantModal
                isOpen={isAssistantModalOpen}
                onClose={() => setIsAssistantModalOpen(false)}
                appData={{ tasks, alerts, herd }}
            />
            
            {/* Image Editor Modal */}
            <ImageEditorModal
                isOpen={isImageEditorOpen}
                onClose={() => setIsImageEditorOpen(false)}
                animal={animalToEdit}
                onUpdateAnimalImage={handleUpdateAnimalImage}
            />
        </div>
    );
};

export default App;
