import type { Stat, KpiData, Task, Alert, Animal, FarmEvent } from './types';

export const STATS_DATA: Omit<Stat, 'value'>[] = [
    { title: 'حالات مرضية', color: 'warning', icon: 'sick' },
    { title: 'تنبيهات حرجة', color: 'danger', icon: 'warning' },
    { title: 'إنتاج الحليب اليومي', icon: 'science' },
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
    { id: 3, title: 'جز صوف الأغنام', dueDate: '28 يوليو، 8:00 صباحًا', priority: 'normal', completed: true },
    { id: 4, title: 'صيانة نظام الري المحوري', dueDate: '25 يوليو، 2:00 ظهرًا', priority: 'normal' },
];

export const ALERTS_DATA: Alert[] = [
    { title: 'درجة حرارة الحظيرة #2 مرتفعة', time: 'منذ 5 دقائق', icon: 'thermostat', type: 'danger' },
    { title: 'مستوى الماء في الخزان منخفض', time: 'منذ 30 دقيقة', icon: 'water_drop', type: 'warning' },
    { title: 'البقرة #112 لم تأكل كعادتها', time: 'منذ ساعتين', icon: 'pets', type: 'warning' },
];

const CATTLE_DATA: Animal[] = [
    { id: '112', name: 'لؤلؤة', breed: 'هولشتاين', age: 4, healthStatus: 'Under Observation', imageUrl: 'https://images.unsplash.com/photo-1570042707108-667677599142?q=80&w=2070&auto=format&fit=crop', type: 'cattle' },
    { id: '115', name: 'نجمة', breed: 'هولشتاين', age: 5, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1549470947-3a6a11a8a2a3?q=80&w=1974&auto=format&fit=crop', type: 'cattle' },
    { id: '118', name: 'سحابة', breed: 'جيرسي', age: 3, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1596733431227-882a1f1d9313?q=80&w=1964&auto=format&fit=crop', type: 'cattle' },
    { id: '120', name: 'زمردة', breed: 'هولشتاين', age: 6, healthStatus: 'Sick', imageUrl: 'https://images.unsplash.com/photo-1527482797592-a63e0204618e?q=80&w=2070&auto=format&fit=crop', type: 'cattle' },
];

const SHEEP_DATA: Animal[] = [
    { id: 'S01', name: 'صوفي', breed: 'عسافي', age: 2, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1593463527599-a0364de015c9?q=80&w=1964&auto=format&fit=crop', type: 'sheep' },
    { id: 'S02', name: 'بدر', breed: 'نجدي', age: 3, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1589928383350-1e51b11a985a?q=80&w=2070&auto=format&fit=crop', type: 'sheep' },
];

export const HERD_DATA: Animal[] = [...CATTLE_DATA, ...SHEEP_DATA];


export const EVENTS_DATA: FarmEvent[] = [
    { id: 1, animalId: '115', date: '15 يونيو 2024', type: 'birth', description: 'ولادة عجل ذكر بصحة جيدة.' },
    { id: 2, animalId: '120', date: '20 يوليو 2024', type: 'vet_check', description: 'فحص بيطري، تم تشخيص حمى الحليب.' },
    { id: 3, animalId: '120', date: '22 يوليو 2024', type: 'note', description: 'الحالة الصحية تتحسن بعد العلاج.' },
    { id: 4, animalId: 'S01', date: '10 مايو 2024', type: 'birth', description: 'ولادة توأم من الحملان.' },
];
