import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { FloatingActionButton } from './components/FloatingActionButton';
import { BottomNavBar } from './components/BottomNavBar';
import { Modal } from './components/Modal';
import { DashboardPage } from './pages/DashboardPage';
import { HerdPage } from './pages/HerdPage';
import { TasksPage } from './pages/TasksPage';
import { ReportsPage } from './pages/ReportsPage';
import type { Task, Alert } from './types';

const App: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);
  const [activePage, setActivePage] = useState('لوحة القيادة');

  const handleShowDetails = (item: Task | Alert) => {
    setModalContent({
        title: item.title,
        body: `سيتم عرض تفاصيل "${item.title}" هنا.`
    });
  };

  const handleViewAll = (type: 'Tasks' | 'Alerts') => {
      const title = type === 'Tasks' ? 'كل المهام' : 'كل التنبيهات';
      setModalContent({
          title: title,
          body: `سيتم عرض قائمة كاملة بـ ${title} هنا.`
      });
  };

  const handleFabClick = () => {
      setModalContent({
          title: 'إضافة عنصر جديد',
          body: 'سيتم عرض نموذج لإضافة حيوان أو مهمة أو تنبيه جديد هنا.'
      });
  };

  const handleNotificationsClick = () => {
      setModalContent({
          title: 'الإشعارات',
          body: 'ليس لديك أي إشعارات جديدة.'
      });
  }

  const closeModal = () => setModalContent(null);
  
  const renderPage = () => {
    switch (activePage) {
      case 'القطيع':
        return <HerdPage />;
      case 'المهام':
        return <TasksPage />;
      case 'التقارير':
        return <ReportsPage />;
      case 'لوحة القيادة':
      default:
        return <DashboardPage 
                  onTaskClick={handleShowDetails}
                  onAlertClick={handleShowDetails}
                  onViewAllTasks={() => handleViewAll('Tasks')}
                  onViewAllAlerts={() => handleViewAll('Alerts')}
                />;
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark">
      <TopAppBar onNotificationsClick={handleNotificationsClick} />
      
      <main className="flex-1 flex flex-col">
        {renderPage()}
      </main>

      {activePage === 'لوحة القيادة' && <FloatingActionButton onClick={handleFabClick} />}
      <BottomNavBar activeItem={activePage} onNavigate={setActivePage} />

      <Modal 
        isOpen={!!modalContent}
        onClose={closeModal}
        title={modalContent?.title || ''}
      >
        <p className="text-text-light-secondary dark:text-dark-secondary">{modalContent?.body}</p>
      </Modal>
    </div>
  );
};

export default App;
