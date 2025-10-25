import type { Stat, KpiData, Task, Alert, Animal, FarmEvent, Shepherd } from './types';

export const STATS_DATA: Stat[] = [
    { title: 'إجمالي القطيع', value: '152', icon: 'pets' },
    { title: 'إنتاج الحليب (لتر/يوم)', value: '2,450', icon: 'water_drop' },
    { title: 'الحالة الصحية', value: '98% جيد', icon: 'health_and_safety' },
    { title: 'الأعلاف المتاحة (طن)', value: '12.5', icon: 'grass' },
    { title: 'الأبقار الحلوب', value: '85', icon: 'female' },
    { title: 'تنبيهات نشطة', value: '3', icon: 'notifications_active', color: 'warning' },
];

export const KPI_DATA: KpiData = {
    'إنتاج الحليب': {
        title: 'متوسط إنتاج الحليب لكل بقرة حلوب',
        value: '28.8 لتر/يوم',
        trend: '+2.1%',
        trendDirection: 'up',
        data: [
            { name: 'Day 1', value: 28.5 },
            { name: 'Day 7', value: 28.6 },
            { name: 'Day 14', value: 28.7 },
            { name: 'Day 21', value: 28.9 },
            { name: 'Day 30', value: 28.8 },
        ],
    },
    'جودة الحليب': {
        title: 'عدد الخلايا الجسدية (SCC)',
        value: '180,000',
        trend: '-5.2%',
        trendDirection: 'down',
        data: [
            { name: 'Day 1', value: 195000 },
            { name: 'Day 7', value: 190000 },
            { name: 'Day 14', value: 185000 },
            { name: 'Day 21', value: 182000 },
            { name: 'Day 30', value: 180000 },
        ],
    },
     'الخصوبة': {
        title: 'معدل الحمل',
        value: '42%',
        trend: '+1.5%',
        trendDirection: 'up',
        data: [
            { name: 'Day 1', value: 40 },
            { name: 'Day 7', value: 40.5 },
            { name: 'Day 14', value: 41 },
            { name: 'Day 21', value: 41.8 },
            { name: 'Day 30', value: 42 },
        ],
    },
};

export const INITIAL_TASKS: Task[] = [
    { id: 1, title: 'تطعيم الأبقار ضد الحمى القلاعية', dueDate: 'اليوم، 10:00 صباحًا', priority: 'high', completed: false, description: 'تطعيم القطيع بالكامل. الجرعة 2 مل لكل بقرة.' },
    { id: 2, title: 'فحص جودة الأعلاف الجديدة', dueDate: 'غدًا، 9:00 صباحًا', priority: 'normal', completed: false, description: 'أخذ عينات من شحنة البرسيم الجديدة وإرسالها للمختبر.' },
    { id: 3, title: 'صيانة نظام الحلب الآلي', dueDate: 'بعد غد، 11:00 صباحًا', priority: 'normal', completed: false },
    { id: 4, title: 'نقل العجول إلى الحظيرة الجديدة', dueDate: '25 يوليو 2024', priority: 'normal', completed: true, description: 'تم نقل 15 عجلًا بنجاح.' },
    { id: 5, title: 'اجتماع مع الطبيب البيطري', dueDate: '28 يوليو 2024', priority: 'high', completed: false, description: 'مناقشة صحة القطيع وخطة الوقاية.' },
    { id: 6, title: 'شراء أدوية بيطرية', dueDate: '30 يوليو 2024', priority: 'normal', completed: false },
];

export const INITIAL_ALERTS: Alert[] = [
    { title: 'انخفاض إنتاج الحليب للبقرة #112', time: 'منذ 3 ساعات', icon: 'trending_down', type: 'warning', description: 'انخفض إنتاج البقرة "جميلة" #112 بنسبة 15% اليوم. يوصى بالفحص.' },
    { title: 'عاصفة رعدية متوقعة', time: 'اليوم، 8:00 مساءً', icon: 'thunderstorm', type: 'warning', description: 'يرجى التأكد من أن جميع الحيوانات في الحظائر المؤمنة.' },
    { title: 'حالة مرضية: البقرة #205', time: 'أمس', icon: 'sick', type: 'danger', description: 'تم تشخيص البقرة "وردة" #205 بالتهاب الضرع. تم عزلها وبدء العلاج.' },
    { title: 'مخزون الأعلاف منخفض', time: 'منذ يومين', icon: 'inventory_2', type: 'warning' },
];

export const INITIAL_HERD: Animal[] = [
    { id: '112', name: 'جميلة', type: 'cattle', subType: 'بقرة حلوب', breed: 'هولشتاين', age: 4, healthStatus: 'Under Observation', imageUrl: 'https://images.unsplash.com/photo-1570042707185-85b253b7d1e0?q=80&w=2070&auto=format&fit=crop' },
    { id: '205', name: 'وردة', type: 'cattle', subType: 'بقرة حلوب', breed: 'هولشTAين', age: 5, healthStatus: 'Sick', imageUrl: 'https://images.unsplash.com/photo-1590396115272-3f1981509893?q=80&w=1974&auto=format&fit=crop' },
    { id: '301', name: 'سريعة', type: 'cattle', subType: 'عجل', breed: 'جيرسي', age: 0.5, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1554439121-17229559345c?q=80&w=2070&auto=format&fit=crop' },
    { id: 'S01', name: 'فلفل', type: 'sheep', subType: 'خروف', breed: 'عواسي', age: 2, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1588466585717-22073d7bc146?q=80&w=1983&auto=format&fit=crop' },
    { id: 'S02', name: 'قطنة', type: 'sheep', subType: 'سدسة', breed: 'نجدي', age: 3, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1524027734442-996b1b69a3b2?q=80&w=2070&auto=format&fit=crop' },
];

export const FARM_EVENTS: FarmEvent[] = [
    { id: 1, animalId: '112', date: '2024-07-20', description: 'فحص دوري - الحالة جيدة' },
    { id: 2, animalId: '112', date: '2024-07-23', description: 'انخفاض طفيف في الشهية' },
    { id: 3, animalId: '205', date: '2024-07-22', description: 'تشخيص التهاب الضرع، بدء العلاج بالمضادات الحيوية.' },
    { id: 4, animalId: 'S01', date: '2024-06-15', description: 'تلقيح سنوي' },
];

export const INITIAL_SHEPHERDS: Shepherd[] = [];