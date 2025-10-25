import React, { useState, useCallback, useMemo } from 'react';
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

import type { Page, Stat, Task, Alert, Animal, Shepherd, FarmEvent } from './types';
import { STATS_DATA, INITIAL_TASKS, INITIAL_ALERTS, INITIAL_HERD, INITIAL_SHEPHERDS, KPI_DATA, FARM_EVENTS } from './constants';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('dashboard');
    const [stats, setStats] = useState<Stat[]>(STATS_DATA.map((s, i) => ({ ...s, id: `stat-${i}` })));
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
    const [herd, setHerd] = useState<Animal[]>(INITIAL_HERD);
    const [shepherds, setShepherds] = useState<Shepherd[]>(INITIAL_SHEPHERDS);
    const [farmEvents, setFarmEvents] = useState<FarmEvent[]>(FARM_EVENTS);

    const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [addItemFormType, setAddItemFormType] = useState<'task' | 'animal' | 'shepherd' | null>(null);
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [editingAnimalImage, setEditingAnimalImage] = useState<Animal | null>(null);
    const [isEditStatModalOpen, setIsEditStatModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState<Stat | null>(null);
    const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isAlertDetailModalOpen, setIsAlertDetailModalOpen] = useState(false);
    const [isAllAlertsModalOpen, setIsAllAlertsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);


    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
    };

    const handleToggleTask = useCallback((taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
        // Also update in modal if it's open
        if (selectedTask && selectedTask.id === taskId) {
            setSelectedTask(prev => prev ? { ...prev, completed: !prev.completed } : null);
        }
    }, [selectedTask]);

    const handleDeleteTask = useCallback((taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, []);

    const handleAddTask = useCallback((taskData: Omit<Task, 'id' | 'priority' | 'completed'>) => {
        const newTask: Task = {
            id: Date.now(),
            ...taskData,
            priority: 'normal',
            completed: false,
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setIsAddItemModalOpen(false);
    }, []);

    const handleDeleteAnimal = useCallback((animalId: string) => {
        setHerd(prevHerd => prevHerd.filter(animal => animal.id !== animalId));
    }, []);


    const handleAddAnimal = useCallback((animalData: Omit<Animal, 'id'>) => {
        const newAnimal: Animal = {
            id: `${animalData.type.charAt(0).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
            ...animalData,
        };
        setHerd(prevHerd => [newAnimal, ...prevHerd]);
        setIsAddItemModalOpen(false);
    }, []);
    
    const handleUpdateAnimalImage = useCallback((animalId: string, newImageUrl: string) => {
        setHerd(prevHerd => prevHerd.map(animal => 
            animal.id === animalId ? { ...animal, imageUrl: newImageUrl } : animal
        ));
        setIsImageEditorOpen(false);
    }, []);

    const handleEditImage = (animal: Animal) => {
        setEditingAnimalImage(animal);
        setIsImageEditorOpen(true);
    };

    const handleDeleteShepherd = useCallback((shepherdId: number) => {
        setShepherds(prevShepherds => prevShepherds.filter(s => s.id !== shepherdId));
    }, []);

    const handleAddShepherd = useCallback((shepherdData: Omit<Shepherd, 'id'>) => {
        const newShepherd: Shepherd = {
            id: Date.now(),
            ...shepherdData,
        };
        setShepherds(prevShepherds => [newShepherd, ...prevShepherds]);
        setIsAddItemModalOpen(false);
    }, []);

    const handleFabClick = () => {
        switch (page) {
            case 'tasks':
                setAddItemFormType('task');
                break;
            case 'herd':
                setAddItemFormType('animal');
                break;
            case 'shepherds':
                setAddItemFormType('shepherd');
                break;
            default:
                return;
        }
        setIsAddItemModalOpen(true);
    };

    const handleUpdateStat = useCallback((statId: string, newValue: string) => {
        setStats(prevStats => prevStats.map(stat => 
            stat.id === statId ? { ...stat, value: new Intl.NumberFormat().format(Number(newValue)) } : stat
        ));
        setIsEditStatModalOpen(false);
    }, []);

    const handleStatClick = (stat: Stat) => {
        if (stat.title === 'إجمالي القطيع') {
            handleNavigate('herd');
        } else if (stat.title === 'تنبيهات نشطة') {
            setIsAllAlertsModalOpen(true);
        } else if (stat.title === 'إنتاج الحليب (لتر/يوم)' || stat.title === 'الأعلاف المتاحة (طن)') {
            setEditingStat(stat);
            setIsEditStatModalOpen(true);
        }
    };
    
    const openTaskDetails = (task: Task) => {
        setSelectedTask(task);
        setIsTaskDetailModalOpen(true);
    };
    
    const openAlertDetails = (alert: Alert) => {
        setSelectedAlert(alert);
        setIsAlertDetailModalOpen(true);
    };

    const dynamicStats = useMemo(() => {
        return stats.map(stat => {
            if (stat.title === 'إجمالي القطيع') {
                return { ...stat, value: herd.length.toString() };
            }
            if (stat.title === 'تنبيهات نشطة') {
                return { ...stat, value: alerts.length.toString() };
            }
            return stat;
        });
    }, [stats, herd, alerts]);


    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <DashboardPage
                    stats={dynamicStats}
                    kpiData={KPI_DATA}
                    tasks={tasks.filter(t => !t.completed).slice(0, 3)}
                    alerts={alerts.slice(0, 3)}
                    onTaskToggle={handleToggleTask}
                    onNavigate={handleNavigate}
                    onStatClick={handleStatClick}
                    onTaskClick={openTaskDetails}
                    onAlertClick={openAlertDetails}
                />;
            case 'herd':
                return <HerdPage herd={herd} events={farmEvents} onEditImage={handleEditImage} onDeleteAnimal={handleDeleteAnimal}/>;
            case 'tasks':
                return <TasksPage tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />;
            case 'reports':
                return <ReportsPage tasks={tasks} herd={herd} />;
            case 'shepherds':
                return <ShepherdsPage shepherds={shepherds} onDeleteShepherd={handleDeleteShepherd} />;
            default:
                return <DashboardPage 
                    stats={dynamicStats} 
                    kpiData={KPI_DATA} 
                    tasks={tasks.filter(t => !t.completed).slice(0, 3)} 
                    alerts={alerts.slice(0, 3)}
                    onTaskToggle={handleToggleTask}
                    onNavigate={handleNavigate}
                    onStatClick={handleStatClick}
                    onTaskClick={openTaskDetails}
                    onAlertClick={openAlertDetails}
                />;
        }
    };

    const getAddItemModalTitle = () => {
        switch (addItemFormType) {
            case 'task': return 'إضافة مهمة جديدة';
            case 'animal': return 'إضافة حيوان جديد';
            case 'shepherd': return 'إضافة راعي جديد';
            default: return 'إضافة';
        }
    };

    const renderAddItemForm = () => {
        switch (addItemFormType) {
            case 'task': return <AddItemForm onAddTask={handleAddTask} />;
            case 'animal': return <AddAnimalForm onAddAnimal={handleAddAnimal} />;
            case 'shepherd': return <AddShepherdForm onAddShepherd={handleAddShepherd} />;
            default: return null;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-20 pt-16">
            <TopAppBar onAssistantClick={() => setIsAssistantModalOpen(true)} />
            
            <main className="mb-16">
                {renderPage()}
            </main>

            {(page === 'tasks' || page === 'herd' || page === 'shepherds') && (
                <FloatingActionButton onClick={handleFabClick} />
            )}
            
            <BottomNavBar activePage={page} onNavigate={handleNavigate} />

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
                {renderAddItemForm()}
            </Modal>
            
            <ImageEditorModal
                isOpen={isImageEditorOpen}
                onClose={() => setIsImageEditorOpen(false)}
                animal={editingAnimalImage}
                onUpdateAnimalImage={handleUpdateAnimalImage}
            />
            
            <EditStatModal
                isOpen={isEditStatModalOpen}
                onClose={() => setIsEditStatModalOpen(false)}
                stat={editingStat}
                onUpdate={handleUpdateStat}
            />

            <Modal isOpen={isTaskDetailModalOpen} onClose={() => setIsTaskDetailModalOpen(false)} title="تفاصيل المهمة">
                {selectedTask && (
                     <div className="space-y-4">
                        <p><strong className="font-semibold">المهمة:</strong> {selectedTask.title}</p>
                        <p><strong className="font-semibold">الموعد النهائي:</strong> {selectedTask.dueDate}</p>
                        <p><strong className="font-semibold">الأولوية:</strong> {selectedTask.priority === 'high' ? 'عالية' : 'عادية'}</p>
                         <p><strong className="font-semibold">الحالة:</strong> {selectedTask.completed ? 'مكتملة' : 'قيد التنفيذ'}</p>
                        {selectedTask.description && <p className="pt-2 border-t border-border-light dark:border-border-dark"><strong className="font-semibold">الوصف:</strong> {selectedTask.description}</p>}
                    </div>
                )}
            </Modal>
            <Modal isOpen={isAlertDetailModalOpen} onClose={() => setIsAlertDetailModalOpen(false)} title="تفاصيل التنبيه">
                {selectedAlert && (
                     <div className="space-y-4">
                        <p><strong className="font-semibold">التنبيه:</strong> {selectedAlert.title}</p>
                        <p><strong className="font-semibold">الوقت:</strong> {selectedAlert.time}</p>
                        {selectedAlert.description && <p className="pt-2 border-t border-border-light dark:border-border-dark"><strong className="font-semibold">الوصف:</strong> {selectedAlert.description}</p>}
                    </div>
                )}
            </Modal>
             <Modal isOpen={isAllAlertsModalOpen} onClose={() => setIsAllAlertsModalOpen(false)} title="جميع التنبيهات النشطة">
                <div className="max-h-[60vh] overflow-y-auto -mr-2 pr-2 space-y-3">
                    {alerts.map((alert, index) => {
                        const iconColor = alert.type === 'danger' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning';
                        return (
                            <div key={index} onClick={() => openAlertDetails(alert)} className="flex items-center gap-4 p-3 rounded-lg bg-background-light dark:bg-background-dark cursor-pointer">
                                <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${iconColor}`}>
                                    <span className="material-symbols-outlined">{alert.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-text-light-primary dark:text-dark-primary">{alert.title}</p>
                                    <p className="text-sm text-text-light-secondary dark:text-dark-secondary">{alert.time}</p>
                                </div>
                                <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">chevron_left</span>
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </div>
    );
};

export default App;