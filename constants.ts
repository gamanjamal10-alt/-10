import type { Stat, KpiData, Task, Alert, Animal, FarmEvent } from './types';

export const TASKS_DATA: Task[] = [
    { id: 1, title: 'فحص صحة الأبقار الحلوب', dueDate: 'اليوم، 9:00 صباحًا', priority: 'high', completed: false, description: 'فحص درجة الحرارة والشهية والسلوك العام.' },
    { id: 2, title: 'تطعيم قطيع الأغنام', dueDate: 'غدًا، 11:00 صباحًا', priority: 'high', completed: false, description: 'تطعيم ضد الأمراض الموسمية.' },
    { id: 3, title: 'تنظيف حظيرة الأبقار', dueDate: 'اليوم، 4:00 مساءً', priority: 'normal', completed: true },
    { id: 4, title: 'طلب علف جديد', dueDate: '25 يوليو 2024', priority: 'normal', completed: false, description: 'طلب 50 كيس من العلف المركز.' },
    { id: 5, title: 'صيانة آلة الحلب', dueDate: '28 يوليو 2024', priority: 'normal', completed: false },
];

export const HERD_DATA: Animal[] = [
    { id: 'C1021', name: 'نجمة', breed: 'هولشتاين', age: 4, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1570042707185-85b3a58576f4?q=80&w=2070&auto=format&fit=crop', type: 'cattle', subType: 'بقرة حلوب' },
    { id: 'C1022', name: 'برق', breed: 'سيمينتال', age: 5, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1590432194628-526b75394a12?q=80&w=1974&auto=format&fit=crop', type: 'cattle', subType: 'ثور' },
    { id: 'S2011', name: 'صوفيا', breed: 'عواسي', age: 2, healthStatus: 'Under Observation', imageUrl: 'https://images.unsplash.com/photo-1588466585717-2272e1716518?q=80&w=2070&auto=format&fit=crop', type: 'sheep', subType: 'سدسة' },
    { id: 'C1023', name: 'شمس', breed: 'هولشتاين', age: 3, healthStatus: 'Sick', imageUrl: 'https://images.unsplash.com/photo-1549498263-138374c4e78b?q=80&w=2070&auto=format&fit=crop', type: 'cattle', subType: 'بقرة حلوب' },
    { id: 'S2012', name: 'فهد', breed: 'نجدي', age: 1, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1533737219313-05b1c5722421?q=80&w=2070&auto=format&fit=crop', type: 'sheep', subType: 'خروف' },
];

export const EVENTS_DATA: FarmEvent[] = [
    { id: 1, animalId: 'C1021', date: '2024-07-01', type: 'vet_check', description: 'فحص دوري، الحالة ممتازة.' },
    { id: 2, animalId: 'S2011', date: '2024-07-15', type: 'vet_check', description: 'تعاني من خمول طفيف، تم إعطاء فيتامينات.' },
    { id: 3, animalId: 'C1023', date: '2024-07-18', type: 'vet_check', description: 'تشخيص التهاب الضرع، بدأت العلاج.' },
    { id: 4, animalId: 'C1021', date: '2024-05-10', type: 'birth', description: 'ولادة عجل بصحة جيدة.' },
];

export const ALERTS_DATA: Alert[] = [
    { title: 'حرارة البقرة "شمس" مرتفعة', time: 'منذ 15 دقيقة', icon: 'thermostat', type: 'danger' },
    { title: 'انخفاض إنتاج الحليب للبقرة "نجمة"', time: 'اليوم، 6:00 صباحًا', icon: 'water_drop', type: 'warning' },
    { title: 'مخزون العلف على وشك النفاد', time: 'أمس', icon: 'inventory_2', type: 'warning' },
];

// Note: The 'value' for these stats is dynamically calculated in App.tsx.
// These are base definitions with placeholders.
export const STATS_DATA: Stat[] = [
    { title: 'حالات مرضية', value: '0', color: 'danger', icon: 'sick' },
    { title: 'تنبيهات حرجة', value: '0', color: 'warning', icon: 'crisis_alert' },
    { title: 'إنتاج الحليب اليومي', value: '0 لتر', icon: 'water_drop' },
];

export const KPI_DATA: KpiData = {
    'إنتاج الحليب': {
        title: 'متوسط إنتاج الحليب (آخر 30 يوم)',
        value: '2,350 لتر/يوم',
        trend: '+2.5%',
        trendDirection: 'up',
        data: [
            { name: 'W1', value: 2200 }, { name: 'W2', value: 2300 },
            { name: 'W3', value: 2250 }, { name: 'W4', value: 2400 },
            { name: 'W5', value: 2350 }, { name: 'W6', value: 2500 },
        ],
    },
    'الصحة': {
        title: 'متوسط مؤشر صحة القطيع',
        value: '92%',
        trend: '-1.2%',
        trendDirection: 'down',
        data: [
            { name: 'W1', value: 95 }, { name: 'W2', value: 94 },
            { name: 'W3', value: 93 }, { name: 'W4', value: 93.5 },
            { name: 'W5', value: 92.5 }, { name: 'W6', value: 92 },
        ],
    },
    'التكاثر': {
        title: 'معدل الحمل الناجح',
        value: '85%',
        trend: '+0.5%',
        trendDirection: 'up',
        data: [
            { name: 'W1', value: 82 }, { name: 'W2', value: 83 },
            { name: 'W3', value: 82.5 }, { name: 'W4', value: 84 },
            { name: 'W5', value: 84.5 }, { name: 'W6', value: 85 },
        ],
    },
};
