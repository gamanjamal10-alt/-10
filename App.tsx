import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Modal } from './components/Modal';
import { AddItemForm } from './components/AddItemForm';
import { AddAnimalForm } from './components/AddAnimalForm';
import { AssistantModal } from './components/AssistantModal';
import { ImageEditorModal } from './components/ImageEditorModal';

import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';

import { TASKS_DATA, ALERTS_DATA, HERD_DATA, EVENTS_DATA } from './constants';
import type { Task, Animal } from './types';

const App: React.FC = () => {
    // State management
    const [activePage, setActivePage] = useState('لوحة القيادة');
    const [tasks, setTasks] = useState<Task[]>(TASKS_DATA);
    const [herd, setHerd] = useState<Animal[]>(HERD_DATA);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [addItemFormType, setAddItemFormType] = useState<'task' | 'animal'>('task');
    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
    const [selectedAnimalForEditing, setSelectedAnimalForEditing] = useState<Animal | null>(null);


    // Handlers
    const handleNavigation = (pageName: string) => {
        setActivePage(pageName);
    };

    const handleToggleTask = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleAddTask = (newTaskData: Omit<Task, 'id' | 'priority' | 'completed'>) => {
        const newTask: Task = {
            id: Date.now(),
            ...newTaskData,
            priority: 'normal',
            completed: false,
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setIsAddItemModalOpen(false);
    };

    const handleAddAnimal = (newAnimalData: Omit<Animal, 'id'>) => {
        const newAnimal: Animal = {
            id: `${newAnimalData.type.charAt(0).toUpperCase()}${Date.now().toString().slice(-4)}`,
            ...newAnimalData,
            imageUrl: newAnimalData.imageUrl || `https://source.unsplash.com/random/400x400/?${newAnimalData.type}`
        };
        setHerd(prevHerd => [newAnimal, ...prevHerd]);
        setIsAddItemModalOpen(false);
    };
    
    const openAddItemModal = () => {
        if (activePage === 'المهام') {
            setAddItemFormType('task');
        } else if (activePage === 'القطيع') {
            setAddItemFormType('animal');
        } else {
             setAddItemFormType('task');
        }
        setIsAddItemModalOpen(true);
    };

    const openImageEditor = (animal: Animal) => {
        setSelectedAnimalForEditing(animal);
        setIsImageEditorModalOpen(true);
    };
    
    const handleUpdateAnimalImage = (animalId: string, newImageUrl: string) => {
        setHerd(prevHerd => 
            prevHerd.map(animal =>
                animal.id === animalId ? { ...animal, imageUrl: newImageUrl } : animal
            )
        );
        setIsImageEditorModalOpen(false);
    };


    // Page rendering logic
    const renderPage = () => {
        switch (activePage) {
            case 'القطيع':
                return <HerdPage herd={herd} events={EVENTS_DATA} onEditImage={openImageEditor} />;
            case 'المهام':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} />;
            case 'التقارير':
                return <ReportsPage tasks={tasks} herd={herd} />;
            case 'لوحة القيادة':
            default:
                return <DashboardPage
                    tasks={tasks}
                    alerts={ALERTS_DATA}
                    herd={herd}
                    onViewAllTasks={() => setActivePage('المهام')}
                    onToggleTask={handleToggleTask}
                />;
        }
    };
    
    const showFab = activePage === 'المهام' || activePage === 'القطيع';

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light-primary dark:text-dark-primary font-sans">
            <TopAppBar onAssistantClick={() => setIsAssistantModalOpen(true)} />
            <main className="pt-16 pb-20">
                {renderPage()}
            </main>
            {showFab && <FloatingActionButton onClick={openAddItemModal} />}
            <BottomNavBar activeItem={activePage} onNavigate={handleNavigation} />

            <Modal isOpen={isAddItemModalOpen} onClose={() => setIsAddItemModalOpen(false)} title={addItemFormType === 'task' ? 'إضافة مهمة جديدة' : 'إضافة حيوان جديد'}>
                {addItemFormType === 'task' ? (
                    <AddItemForm onAddTask={handleAddTask} />
                ) : (
                    <AddAnimalForm onAddAnimal={handleAddAnimal} />
                )}
            </Modal>

            <AssistantModal 
                isOpen={isAssistantModalOpen} 
                onClose={() => setIsAssistantModalOpen(false)} 
                appData={{ tasks, alerts: ALERTS_DATA, herd }} 
            />
            
            <ImageEditorModal
                isOpen={isImageEditorModalOpen}
                onClose={() => setIsImageEditorModalOpen(false)}
                animal={selectedAnimalForEditing}
                onUpdateAnimalImage={handleUpdateAnimalImage}
            />
        </div>
    );
};

export default App;