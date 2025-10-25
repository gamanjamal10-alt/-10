import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { StatCard } from './components/StatCard';
import { KpiCard } from './components/KpiCard';
import { TaskList } from './components/TaskList';
import { AlertList } from './components/AlertList';
import { FloatingActionButton } from './components/FloatingActionButton';
import { BottomNavBar } from './components/BottomNavBar';
import { Modal } from './components/Modal';
import { STATS_DATA, UPCOMING_TASKS, RECENT_ALERTS, KPI_DATA } from './constants';
import type { Stat, Task, Alert } from './types';

const App: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

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

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark">
      <TopAppBar onNotificationsClick={handleNotificationsClick} />

      {/* Stats */}
      <div className="flex flex-wrap gap-4 p-4">
        {STATS_DATA.map((stat: Stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} color={stat.color} />
        ))}
      </div>

      {/* Data Visualization Card (KPIs) */}
      <div className="px-4">
        <KpiCard kpiData={KPI_DATA} />
      </div>

      {/* List Cards: Upcoming Tasks & Recent Alerts */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList tasks={UPCOMING_TASKS} onTaskClick={handleShowDetails} onViewAllClick={() => handleViewAll('Tasks')} />
        <AlertList alerts={RECENT_ALERTS} onAlertClick={handleShowDetails} onViewAllClick={() => handleViewAll('Alerts')} />
      </div>

      <FloatingActionButton onClick={handleFabClick} />
      <BottomNavBar />

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