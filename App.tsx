
import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Modal } from './components/Modal';
import { AddItemForm } from './components/AddItemForm';
import { AddAnimalForm } from './components/AddAnimalForm';
import { AddShepherdForm } from './components/AddShepherdForm';
import { AssistantModal } from './components/AssistantModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import { ShepherdsPage } from './pages/ShepherdsPage';
import { STATS_DATA, KPI_DATA, TASKS_DATA, ALERTS_DATA, HERD_DATA, EVENTS_DATA, SHEPHERDS_DATA } from './constants';
import type { Page, Task, Animal, Shepherd } from './types';

function App() {
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [tasks, setTasks] = useState(TASKS_DATA);
    const [herd, setHerd] = useState(HERD_DATA);
    const [shepherds, setShepherds] = useState(SHEPHERDS_DATA);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
    const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);

    const handleToggleTask = (taskId: number) => {
        setTasks(currentTasks =>
            currentTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'priority' | 'completed'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now(),
            priority: 'normal', // Default priority
            completed: false
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setIsAddModalOpen(false);
    };

    const handleAddAnimal = (animal: Omit<Animal, 'id'>) => {
        const newAnimal: Animal = {
            ...animal,
            id: `${animal.type.charAt(0).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
        };
        setHerd(prevHerd => [newAnimal, ...prevHerd]);
        setIsAddModalOpen(false);
    };
    
    const handleAddShepherd = (shepherd: Omit<Shepherd, 'id'>) => {
        const newShepherd: Shepherd = {
            ...shepherd,
            id: Date.now(),
        };
        setShepherds(prev => [newShepherd, ...prev]);
        setIsAddModalOpen(false);
    };
    
    const openImageEditor = (animal: Animal) => {
        setAnimalToEdit(animal);
        setIsImageEditorModalOpen(true);
    };
    
    const handleUpdateAnimalImage = (animalId: string, newImageUrl: string) => {
        setHerd(currentHerd => 
            currentHerd.map(animal => 
                animal.id === animalId ? { ...animal, imageUrl: newImageUrl } : animal
            )
        );
        setIsImageEditorModalOpen(false);
    };

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardPage
                    stats={STATS_DATA}
                    kpiData={KPI_DATA}
                    tasks={tasks}
                    alerts={ALERTS_DATA}
                    onToggleTask={handleToggleTask}
                    onViewAllTasks={() => setActivePage('tasks')}
                    onViewAllAlerts={() => { /* No alerts page yet */ }}
                />;
            case 'herd':
                return <HerdPage herd={herd} events={EVENTS_DATA} onEditImage={openImageEditor} />;
            case 'tasks':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} />;
            case 'reports':
                return <ReportsPage tasks={tasks} herd={herd} />;
            case 'shepherds':
                return <ShepherdsPage shepherds={shepherds} />;
            default:
                return <div>Page not found</div>;
        }
    };
    
    const getAddForm = () => {
        switch (activePage) {
            case 'tasks':
                return <AddItemForm onAddTask={handleAddTask} />;
            case 'herd':
                return <AddAnimalForm onAddAnimal={handleAddAnimal} />;
            case 'shepherds':
                 return <AddShepherdForm onAddShepherd={handleAddShepherd} />;
            default:
                return <AddItemForm onAddTask={handleAddTask} />; // Default to adding a task
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
                return 'إضافة عنصر جديد';
        }
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light-primary dark:text-dark-primary font-sans">
            <TopAppBar onAssistantClick={() => setIsAssistantModalOpen(true)} />

            <main className="pt-16 pb-20">
                {renderPage()}
            </main>
            
            {(activePage === 'tasks' || activePage === 'herd' || activePage === 'shepherds') && (
                 <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
            )}

            <BottomNavBar activePage={activePage} onNavigate={setActivePage} />
            
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={getAddModalTitle()}>
                {getAddForm()}
            </Modal>
            
            <AssistantModal 
                isOpen={isAssistantModalOpen} 
                onClose={() => setIsAssistantModalOpen(false)}
                appData={{ tasks, alerts: ALERTS_DATA, herd }}
            />
            
            <ImageEditorModal 
                isOpen={isImageEditorModalOpen}
                onClose={() => setIsImageEditorModalOpen(false)}
                animal={animalToEdit}
                onUpdateAnimalImage={handleUpdateAnimalImage}
            />

        </div>
    );
}

export default App;
