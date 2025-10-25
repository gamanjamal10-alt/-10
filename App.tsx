import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Modal } from './components/Modal';
import { AddItemForm } from './components/AddItemForm';

import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';

import type { Task, Alert, Animal } from './types';

function App() {
    const [activePage, setActivePage] = useState('لوحة القيادة');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const handleTaskClick = (task: Task) => {
        setModalTitle(`تفاصيل المهمة: ${task.title}`);
        setModalContent(<p>{task.description || 'لا يوجد وصف لهذه المهمة.'}</p>);
        setIsModalOpen(true);
    };

    const handleAlertClick = (alert: Alert) => {
        setModalTitle('تفاصيل التنبيه');
        setModalContent(<p>{alert.title}</p>);
        setIsModalOpen(true);
    };

    const handleAnimalClick = (animal: Animal) => {
        setModalTitle(`ملف: ${animal.name} #${animal.id}`);
        setModalContent(
            <div>
                <p><strong>السلالة:</strong> {animal.breed}</p>
                <p><strong>العمر:</strong> {animal.age} سنوات</p>
                <p><strong>الحالة الصحية:</strong> {animal.healthStatus}</p>
            </div>
        );
        setIsModalOpen(true);
    };

    const handleFabClick = () => {
        setModalTitle('إضافة مهمة جديدة');
        setModalContent(<AddItemForm onAddItem={(item) => console.log('New item:', item)} onClose={() => setIsModalOpen(false)} />);
        setIsModalOpen(true);
    }
    
    const renderPage = () => {
        switch (activePage) {
            case 'لوحة القيادة':
                return <DashboardPage onTaskClick={handleTaskClick} onAlertClick={handleAlertClick} />;
            case 'القطيع':
                return <HerdPage onAnimalClick={handleAnimalClick} />;
            case 'المهام':
                return <TasksPage onTaskClick={handleTaskClick} />;
            case 'التقارير':
                return <ReportsPage />;
            default:
                return <DashboardPage onTaskClick={handleTaskClick} onAlertClick={handleAlertClick} />;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-20">
            <TopAppBar onNotificationsClick={() => console.log('Notifications clicked')} />
            
            <main>
                {renderPage()}
            </main>
            
            <FloatingActionButton onClick={handleFabClick} />
            <BottomNavBar activeItem={activePage} onNavigate={setActivePage} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default App;
