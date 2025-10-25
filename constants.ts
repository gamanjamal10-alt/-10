
import type { Stat, Task, Alert, KpiData } from './types';

export const STATS_DATA: Stat[] = [
    { title: 'Total Animals', value: '1,240' },
    { title: 'Needs Attention', value: '15', color: 'warning' },
    { title: 'Overdue Tasks', value: '3', color: 'danger' },
];

export const UPCOMING_TASKS: Task[] = [
    { title: 'Vaccinate Group B', dueDate: 'Due: Tomorrow', priority: 'high' },
    { title: 'Move to Pasture 4', dueDate: 'Due: Oct 28, 2023', priority: 'medium' },
    { title: 'Breeding Appointment', dueDate: 'Due: Nov 02, 2023', priority: 'medium' },
];

export const RECENT_ALERTS: Alert[] = [
    { title: 'Cow #432: High Temperature', time: '2 hours ago', icon: 'local_fire_department', type: 'danger' },
    { title: 'Bull #88: Geofence Breach', time: 'Yesterday', icon: 'location_off', type: 'warning' },
    { title: 'Calf #719: Low Weight Gain', time: '3 days ago', icon: 'monitor_weight_loss', type: 'warning' },
];

export const KPI_DATA: KpiData = {
    'Milk Production': {
        title: 'Milk Production Trends',
        value: '30.5k L',
        trend: '+2.1%',
        trendDirection: 'up',
        data: [
            { name: 'A', value: 109 }, { name: 'B', value: 21 }, { name: 'C', value: 41 },
            { name: 'D', value: 93 }, { name: 'E', value: 33 }, { name: 'F', value: 101 },
            { name: 'G', value: 61 }, { name: 'H', value: 45 }, { name: 'I', value: 121 },
            { name: 'J', value: 149 }, { name: 'K', value: 1 }, { name: 'L', value: 81 },
            { name: 'M', value: 129 }, { name: 'N', value: 25 }
        ],
    },
    'Weight Gain': {
        title: 'Weight Gain Trends',
        value: '1.2 kg/day',
        trend: '+0.5%',
        trendDirection: 'up',
        data: [
            { name: 'A', value: 45 }, { name: 'B', value: 55 }, { name: 'C', value: 50 },
            { name: 'D', value: 65 }, { name: 'E', value: 70 }, { name: 'F', value: 68 },
            { name: 'G', value: 75 }, { name: 'H', value: 80 }, { name: 'I', value: 78 },
            { name: 'J', value: 85 }, { name: 'K', value: 90 }, { name: 'L', value: 88 },
            { name: 'M', value: 95 }, { name: 'N', value: 100 }
        ],
    },
    'Health Score': {
        title: 'Health Score Trends',
        value: '92.7',
        trend: '-0.3%',
        trendDirection: 'down',
        data: [
            { name: 'A', value: 98 }, { name: 'B', value: 97 }, { name: 'C', value: 96 },
            { name: 'D', value: 95 }, { name: 'E', value: 94 }, { name: 'F', value: 95 },
            { name: 'G', value: 93 }, { name: 'H', value: 92 }, { name: 'I', value: 91 },
            { name: 'J', value: 93 }, { name: 'K', value: 92 }, { name: 'L', value: 90 },
            { name: 'M', value: 91 }, { name: 'N', value: 92 }
        ],
    },
};
