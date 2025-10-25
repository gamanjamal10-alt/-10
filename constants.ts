import type { Stat, KpiData, Task, Alert, Animal } from './types';

export const STATS_DATA: Stat[] = [
    { title: 'إجمالي القطيع', value: '150 رأس', icon: 'pets' },
    { title: 'حالات مرضية', value: '3 حالات', color: 'warning', icon: 'sick' },
    { title: 'تنبيهات حرجة', value: '1 حالة', color: 'danger', icon: 'warning' },
    { title: 'إنتاج الحليب اليومي', value: '2,500 لتر', icon: 'science' },
];

export const KPI_DATA: KpiData = {
    'إنتاج الحليب': {
        title: 'متوسط إنتاج الحليب (لتر/يوم)',
        value: '2,500',
        trend: '+5.2%',
        trendDirection: 'up',
        data: [
            { name: 'Day 1', value: 2400 },
            { name: 'Day 5', value: 2350 },
            { name: 'Day 10', value: 2600 },
            { name: 'Day 15', value: 2550 },
            { name: 'Day 20', value: 2700 },
            { name: 'Day 25', value: 2650 },
            { name: 'Day 30', value: 2500 },
        ],
    },
    'صحة القطيع': {
        title: 'مؤشر صحة القطيع',
        value: '98%',
        trend: '-0.5%',
        trendDirection: 'down',
        data: [
            { name: 'Day 1', value: 99 },
            { name: 'Day 5', value: 98.8 },
            { name: 'Day 10', value: 98.5 },
            { name: 'Day 15', value: 98.6 },
            { name: 'Day 20', value: 98.2 },
            { name: 'Day 25', value: 98.1 },
            { name: 'Day 30', value: 98 },
        ],
    },
};

export const TASKS_DATA: Task[] = [
    { id: 1, title: 'تطعيم الأبقار دفعة #3', dueDate: 'اليوم، 10:00 صباحًا', priority: 'high', description: 'تطعيم 25 بقرة من الدفعة الثالثة باللقاح الرباعي.' },
    { id: 2, title: 'فحص دوري للمواليد الجدد', dueDate: 'غدًا، 9:00 صباحًا', priority: 'normal', description: 'فحص العلامات الحيوية ووزن المواليد الجدد في الحظيرة رقم 5.' },
    { id: 3, title: 'صيانة نظام الري المحوري', dueDate: '25 يوليو، 2:00 ظهرًا', priority: 'normal' },
];

export const ALERTS_DATA: Alert[] = [
    { title: 'درجة حرارة الحظيرة #2 مرتفعة', time: 'منذ 5 دقائق', icon: 'thermostat', type: 'danger' },
    { title: 'مستوى الماء في الخزان منخفض', time: 'منذ 30 دقيقة', icon: 'water_drop', type: 'warning' },
    { title: 'البقرة #112 لم تأكل كعادتها', time: 'منذ ساعتين', icon: 'pets', type: 'warning' },
];

export const HERD_DATA: Animal[] = [
    { id: '112', name: 'لؤلؤة', breed: 'هولشتاين', age: 4, healthStatus: 'Under Observation', imageUrl: 'https://images.unsplash.com/photo-1570042707108-667677599142?q=80&w=2070&auto=format&fit=crop' },
    { id: '115', name: 'نجمة', breed: 'هولشتاين', age: 5, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1549470947-3a6a11a8a2a3?q=80&w=1974&auto=format&fit=crop' },
    { id: '118', name: 'سحابة', breed: 'جيرسي', age: 3, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1596733431227-882a1f1d9313?q=80&w=1964&auto=format&fit=crop' },
    { id: '120', name: 'زمردة', breed: 'هولشتاين', age: 6, healthStatus: 'Sick', imageUrl: 'https://images.unsplash.com/photo-1527482797592-a63e0204618e?q=80&w=2070&auto=format&fit=crop' },
];