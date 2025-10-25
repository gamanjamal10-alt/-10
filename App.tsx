
import React from 'react';
import { TopAppBar } from './components/TopAppBar';
import { StatCard } from './components/StatCard';
import { KpiCard } from './components/KpiCard';
import { TaskList } from './components/TaskList';
import { AlertList } from './components/AlertList';
import { FloatingActionButton } from './components/FloatingActionButton';
import { BottomNavBar } from './components/BottomNavBar';
import { STATS_DATA, UPCOMING_TASKS, RECENT_ALERTS, KPI_DATA } from './constants';
import type { Stat } from './types';

const App: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden pb-24">
      {/* Dark mode is enabled by default for demonstration */}
      <div className="dark">
        <div className="bg-background-light dark:bg-background-dark">
          <TopAppBar />

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
            <TaskList tasks={UPCOMING_TASKS} />
            <AlertList alerts={RECENT_ALERTS} />
          </div>

          <FloatingActionButton />
          <BottomNavBar />
        </div>
      </div>
    </div>
  );
};

export default App;
