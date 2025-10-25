import React, { useState, useEffect } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Modal } from './components/Modal';
import { AddItemForm } from './components/AddItemForm';
import { AddAnimalForm } from './components/AddAnimalForm';
import { AddShepherdForm } from './components/AddShepherdForm';
import { AssistantModal } from './components/AssistantModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { EditStatModal } from './components/EditStatModal';

import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import { ShepherdsPage } from './pages/ShepherdsPage';

import type { Page, Task, Alert, Animal, Shepherd, Stat } from './types';
import { 
    INITIAL_TASKS, 
    INITIAL_ALERTS, 
    INITIAL_HERD, 
    INITIAL_SHEPHERDS, 
    STATS_DATA, 
    KPI_DATA, 
    FARM_EVENTS 
} from './constants';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [page, setPage] = useState<Page>('dashboard');
    
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
    const [herd, setHerd] = useState<Animal[]>(INITIAL_HERD);
    const [shepherds, setShepherds] = useState<Shepherd[]>(INITIAL_SHEPHERDS);
    const [stats, setStats] = useState<Stat[]>(STATS_DATA);
    
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [addItemType, setAddItemType] = useState<'task' | 'animal' | 'shepherd' | null>(null);
    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [selectedAnimalForEdit, setSelectedAnimalForEdit] = useState<Animal | null>(null);
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    
    const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
    const [isEditStatModalOpen, setIsEditStatModalOpen] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleNavigate = (newPage: Page) => setPage(newPage);

    const handleToggleTask = (taskId: number) => {
        setTasks(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
        setSelectedTask(prev => prev && prev.id === taskId ? { ...prev, completed: !prev.completed } : prev);
    };

    const handleOpenAddItemModal = () => {
        switch (page) {
            case 'tasks': setAddItemType('task'); break;
            case 'herd': setAddItemType('animal'); break;
            case 'shepherds': setAddItemType('shepherd'); break;
            default: return;
        }
        setIsAddItemModalOpen(true);
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'priority' | 'completed'>) => {
        const newTask: Task = {
            id: Date.now(),
            ...task,
            priority: 'normal',
            completed: false,
        };
        setTasks(prev => [newTask, ...prev]);
        setIsAddItemModalOpen(false);
    };
    
    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setSelectedTask(null);
    };

    const handleAddAnimal = (animal: Omit<Animal, 'id'>) => {
        const newAnimal: Animal = {
            id: `${animal.type.charAt(0).toUpperCase()}${Date.now() % 1000}`,
            ...animal
        };
        setHerd(prev => [newAnimal, ...prev]);
        setIsAddItemModalOpen(false);
    };
    
    const handleDeleteAnimal = (animalId: string) => {
        setHerd(herd.filter(animal => animal.id !== animalId));
    };

    const handleAddShepherd = (shepherd: Omit<Shepherd, 'id'>) => {
        const newShepherd: Shepherd = {
            id: Date.now(),
            ...shepherd,
        };
        setShepherds(prev => [newShepherd, ...prev]);
        setIsAddItemModalOpen(false);
    };

    const handleDeleteShepherd = (id: number) => {
        setShepherds(shepherds.filter(shepherd => shepherd.id !== id));
    };
    
    const handleUpdateAnimalImage = (animalId: string, newImageUrl: string) => {
        setHerd(herd.map(animal => 
            animal.id === animalId ? { ...animal, imageUrl: newImageUrl } : animal
        ));
        setIsImageEditorOpen(false);
    };

    const handleOpenImageEditor = (animal: Animal) => {
        setSelectedAnimalForEdit(animal);
        setIsImageEditorOpen(true);
    };

    const handleStatClick = (stat: Stat) => {
        if (stat.title === 'إنتاج الحليب (لتر/يوم)' || stat.title === 'الأعلاف المتاحة (طن)') {
            const statWithId = { ...stat, id: stat.id || stat.title };
            setSelectedStat(statWithId);
            setIsEditStatModalOpen(true);
        } else if (stat.title === 'تنبيهات نشطة') {
             // Future navigation to alerts page can be handled here
        }
    };
    
    const handleUpdateStat = (statId: string, newValue: string) => {
        setStats(stats.map(stat =>
            (stat.id || stat.title) === statId ? { ...stat, value: newValue } : stat
        ));
        setIsEditStatModalOpen(false);
    };
    
    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <DashboardPage 
                    stats={stats}
                    kpiData={KPI_DATA}
                    tasks={tasks.filter(t => !t.completed).slice(0, 3)}
                    alerts={alerts.slice(0, 3)}
                    onTaskToggle={handleToggleTask}
                    onNavigate={handleNavigate}
                    onStatClick={handleStatClick}
                    onTaskClick={(task) => setSelectedTask(task)}
                    onAlertClick={(alert) => setSelectedAlert(alert)}
                />;
            case 'herd':
                return <HerdPage herd={herd} events={FARM_EVENTS} onEditImage={handleOpenImageEditor} onDeleteAnimal={handleDeleteAnimal}/>;
            case 'tasks':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />;
            case 'reports':
                return <ReportsPage tasks={tasks} herd={herd} />;
            case 'shepherds':
                return <ShepherdsPage shepherds={shepherds} onDeleteShepherd={handleDeleteShepherd} />;
            default:
                return <div className="p-4">Page not found</div>;
        }
    };

    const getAddItemModalTitle = () => {
        if (addItemType === 'task') return 'إضافة مهمة جديدة';
        if (addItemType === 'animal') return 'إضافة حيوان جديد';
        if (addItemType === 'shepherd') return 'إضافة راعي جديد';
        return 'إضافة عنصر';
    };

    const pageTitles: Record<Page, string> = {
        dashboard: 'الرئيسية',
        herd: 'القطيع',
        tasks: 'المهام',
        reports: 'التقارير',
        shepherds: 'الرعاة',
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light-primary dark:text-dark-primary font-sans">
            <TopAppBar 
                onAssistantClick={() => setIsAssistantModalOpen(true)}
                onThemeToggle={toggleTheme}
                isDarkMode={isDarkMode}
                pageTitle={pageTitles[page]}
            />
            
            <main className="pt-16 pb-20">
                {renderPage()}
            </main>
            
            {['tasks', 'herd', 'shepherds'].includes(page) && (
                <FloatingActionButton onClick={handleOpenAddItemModal} />
            )}

            <BottomNavBar activePage={page} onNavigate={handleNavigate} />

            {/* Modals */}
            <AssistantModal 
                isOpen={isAssistantModalOpen} 
                onClose={() => setIsAssistantModalOpen(false)} 
                appData={{ tasks, alerts, herd }}
            />
            
            <Modal
                isOpen={isAddItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                title={getAddItemModalTitle()}
            >
                {addItemType === 'task' && <AddItemForm onAddTask={handleAddTask} />}
                {addItemType === 'animal' && <AddAnimalForm onAddAnimal={handleAddAnimal} />}
                {addItemType === 'shepherd' && <AddShepherdForm onAddShepherd={handleAddShepherd} />}
            </Modal>
            
             <ImageEditorModal
                isOpen={isImageEditorOpen}
                onClose={() => setIsImageEditorOpen(false)}
                animal={selectedAnimalForEdit}
                onUpdateAnimalImage={handleUpdateAnimalImage}
            />
            
            <EditStatModal 
                isOpen={isEditStatModalOpen}
                onClose={() => setIsEditStatModalOpen(false)}
                stat={selectedStat}
                onUpdate={handleUpdateStat}
            />

            <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} title="تفاصيل المهمة">
                {selectedTask && (
                     <div className="space-y-4">
                        <div>
                            <p className="mb-2"><strong className="font-semibold">المهمة:</strong> {selectedTask.title}</p>
                            <p className="mb-2"><strong className="font-semibold">الموعد النهائي:</strong> {selectedTask.dueDate}</p>
                            <p className="mb-2"><strong className="font-semibold">الأولوية:</strong> {selectedTask.priority === 'high' ? 'عالية' : 'عادية'}</p>
                            <p className="mb-2"><strong className="font-semibold">الحالة:</strong> {selectedTask.completed ? 'مكتملة' : 'قيد التنفيذ'}</p>
                            {selectedTask.description && <p><strong className="font-semibold">الوصف:</strong> {selectedTask.description}</p>}
                        </div>
                        <div className="space-y-2 pt-2">
                            <button 
                                onClick={() => handleToggleTask(selectedTask.id)} 
                                className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                            >
                                {selectedTask.completed ? 'وضع علامة كغير مكتملة' : 'وضع علامة كمكتملة'}
                            </button>
                             <button 
                                onClick={() => handleDeleteTask(selectedTask.id)} 
                                className="w-full px-4 py-2 rounded-md border border-danger text-danger hover:bg-danger/10 transition-colors"
                            >
                                حذف المهمة
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={!!selectedAlert} onClose={() => setSelectedAlert(null)} title="تفاصيل التنبيه">
                {selectedAlert && (
                     <div className="space-y-2">
                        <p className="mb-2"><strong className="font-semibold">التنبيه:</strong> {selectedAlert.title}</p>
                        <p className="mb-2"><strong className="font-semibold">الوقت:</strong> {selectedAlert.time}</p>
                        {selectedAlert.description && <p><strong className="font-semibold">الوصف:</strong> {selectedAlert.description}</p>}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default App;
