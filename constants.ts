import type { Stat, Task, Alert, KpiData } from './types';

export const STATS_DATA: Stat[] = [
    { title: 'إجمالي الحيوانات', value: '1,240' },
    { title: 'يحتاج لعناية', value: '15', color: 'warning' },
    { title: 'مهام متأخرة', value: '3', color: 'danger' },
];

export const UPCOMING_TASKS: Task[] = [
    { title: 'تلقيح المجموعة ب', dueDate: 'الموعد: غداً', priority: 'high' },
    { title: 'الانتقال إلى المرعى ٤', dueDate: 'الموعد: ٢٨ أكتوبر ٢٠٢٣', priority: 'medium' },
    { title: 'موعد التزاوج', dueDate: 'الموعد: ٢ نوفمبر ٢٠٢٣', priority: 'medium' },
];

export const RECENT_ALERTS: Alert[] = [
    { title: 'البقرة #٤٣٢: حرارة مرتفعة', time: 'قبل ساعتين', icon: 'local_fire_department', type: 'danger' },
    { title: 'الثور #٨٨: خرق السياج الجغرافي', time: 'أمس', icon: 'location_off', type: 'warning' },
    { title: 'العجل #٧١٩: زيادة وزن منخفضة', time: 'قبل ٣ أيام', icon: 'monitor_weight_loss', type: 'warning' },
];

export const KPI_DATA: KpiData = {
    'إنتاج الحليب': {
        title: 'اتجاهات إنتاج الحليب',
        value: '30.5ألف لتر',
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
    'زيادة الوزن': {
        title: 'اتجاهات زيادة الوزن',
        value: '1.2 كجم/يوم',
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
    'مؤشر الصحة': {
        title: 'اتجاهات مؤشر الصحة',
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