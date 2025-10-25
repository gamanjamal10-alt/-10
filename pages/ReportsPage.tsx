import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { Task, Animal } from '../types';

interface ReportsPageProps {
    tasks: Task[];
    herd: Animal[];
}

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-4">
        <h3 className="text-lg font-bold text-text-light-primary dark:text-dark-primary mb-4">{title}</h3>
        {children}
    </div>
);

export const ReportsPage: React.FC<ReportsPageProps> = ({ tasks, herd }) => {

    // Task Analytics Data
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;
    const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    const taskPieData = [
        { name: 'مكتملة', value: completedTasks },
        { name: 'قيد التنفيذ', value: pendingTasks },
    ];
    const TASK_PIE_COLORS = ['#2E7D32', '#A5C2A5'];

    // Herd Health Analytics Data
    const healthStatusCounts = herd.reduce((acc, animal) => {
        acc[animal.healthStatus] = (acc[animal.healthStatus] || 0) + 1;
        return acc;
    }, {} as Record<Animal['healthStatus'], number>);

    const herdHealthData = [
        { name: 'بصحة جيدة', count: healthStatusCounts['Healthy'] || 0 },
        { name: 'تحت المراقبة', count: healthStatusCounts['Under Observation'] || 0 },
        { name: 'مريضة', count: healthStatusCounts['Sick'] || 0 },
    ];
    
    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-text-light-primary dark:text-dark-primary px-2">التقارير والتحليلات</h2>

            {/* Task Analytics */}
            <ChartCard title="تحليل المهام">
                <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={taskPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {taskPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={TASK_PIE_COLORS[index % TASK_PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 text-center md:text-right">
                        <p className="text-text-light-secondary dark:text-dark-secondary">إجمالي المهام: <span className="font-bold text-text-light-primary dark:text-dark-primary">{tasks.length}</span></p>
                        <p className="text-text-light-secondary dark:text-dark-secondary">المهام المكتملة: <span className="font-bold text-primary">{completedTasks}</span></p>
                        <p className="text-text-light-secondary dark:text-dark-secondary">المهام المعلقة: <span className="font-bold text-warning">{pendingTasks}</span></p>
                        <p className="text-text-light-secondary dark:text-dark-secondary">معدل الإنجاز: <span className="font-bold text-secondary">{taskCompletionRate}%</span></p>
                    </div>
                </div>
            </ChartCard>

            {/* Herd Health Analytics */}
            <ChartCard title="الحالة الصحية للقطيع">
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={herdHealthData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                             <XAxis type="number" hide />
                             <YAxis type="category" dataKey="name" width={80} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
                            <Legend />
                            <Bar dataKey="count" name="عدد الحيوانات" barSize={30}>
                                {herdHealthData.map((entry, index) => {
                                    const colorMap = { 'بصحة جيدة': '#2E7D32', 'تحت المراقبة': '#FFA000', 'مريضة': '#D32F2F' };
                                    return <Cell key={`cell-${index}`} fill={colorMap[entry.name as keyof typeof colorMap]} />;
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ChartCard>
        </div>
    );
};
