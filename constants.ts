
import type { Stat, KpiData, Task, Alert, Animal, FarmEvent, Shepherd } from './types';

export const STATS_DATA: Stat[] = [
    { title: 'إجمالي الحيوانات', value: '128', icon: 'pets' },
    { title: 'الولادات الجديدة', value: '4', icon: 'kid_star', color: 'warning' },
    { title: 'حالات مرضية', value: '1', icon: 'sick', color: 'danger' },
    { title: 'إنتاج الحليب (لتر)', value: '1,250', icon: 'water_drop' },
    { title: 'المهام المكتملة', value: '8/12', icon: 'task_alt' },
    { title: 'تنبيهات اليوم', value: '3', icon: 'notifications' },
];

export const KPI_DATA: KpiData = {
    'إنتاج الحليب': {
        title: 'متوسط إنتاج الحليب لكل بقرة حلوب',
        value: '25.4 لتر/يوم',
        trend: '+2.1%',
        trendDirection: 'up',
        data: [
            { name: 'Day 1', value: 24 }, { name: 'Day 7', value: 24.5 }, { name: 'Day 14', value: 25 }, 
            { name: 'Day 21', value: 25.2 }, { name: 'Day 30', value: 25.4 }
        ]
    },
    'الصحة': {
        title: 'نسبة القطيع السليم',
        value: '98.4%',
        trend: '-0.2%',
        trendDirection: 'down',
        data: [
            { name: 'Day 1', value: 99 }, { name: 'Day 7', value: 98.8 }, { name: 'Day 14', value: 98.5 }, 
            { name: 'Day 21', value: 98.6 }, { name: 'Day 30', value: 98.4 }
        ]
    },
    'التكاليف': {
        title: 'تكلفة العلف لكل حيوان',
        value: '15.7 ريال/يوم',
        trend: '+1.5%',
        trendDirection: 'up',
        data: [
            { name: 'Day 1', value: 15.2 }, { name: 'Day 7', value: 15.4 }, { name: 'Day 14', value: 15.5 }, 
            { name: 'Day 21', value: 15.6 }, { name: 'Day 30', value: 15.7 }
        ]
    }
};

export const TASKS_DATA: Task[] = [
    { id: 1, title: 'تطعيم الأبقار ضد الحمى القلاعية', dueDate: 'اليوم، 10:00 صباحًا', priority: 'high', completed: false, description: 'تطعيم مجموعة الأبقار (أ) باللقاح الجديد.' },
    { id: 2, title: 'فحص صحة العجول حديثي الولادة', dueDate: 'اليوم، 2:00 ظهرًا', priority: 'high', completed: false, description: 'فحص العجول التي ولدت هذا الأسبوع والتأكد من حصولها على السرسوب.' },
    { id: 3, title: 'صيانة آلات الحلب', dueDate: 'غدًا، 9:00 صباحًا', priority: 'normal', completed: false, description: 'التنظيف العميق والصيانة الدورية لآلات الحلب في الحظيرة الشمالية.' },
    { id: 4, title: 'طلب شحنة علف جديدة', dueDate: 'غدًا، 4:00 عصرًا', priority: 'normal', completed: true },
    { id: 5, title: 'تحديث سجلات التكاثر', dueDate: 'بعد غد', priority: 'normal', completed: false },
    { id: 6, title: 'تنظيف الحظيرة رقم 3', dueDate: 'اليوم، 11:00 صباحًا', priority: 'normal', completed: true },
];

export const ALERTS_DATA: Alert[] = [
    { title: 'درجة حرارة البقرة #112 مرتفعة', time: 'منذ 15 دقيقة', icon: 'thermostat', type: 'danger' },
    { title: 'انخفاض إنتاج الحليب للبقرة #88', time: 'منذ ساعة', icon: 'trending_down', type: 'warning' },
    { title: 'مستوى مخزون العلف منخفض', time: 'منذ 3 ساعات', icon: 'inventory_2', type: 'warning' },
    { title: 'تم تسجيل ولادة جديدة', time: 'أمس', icon: 'kid_star', type: 'warning' },
];

export const HERD_DATA: Animal[] = [
    { id: 'C-0112', name: 'نجمة', type: 'cattle', breed: 'هولشتاين', subType: 'بقرة حلوب', age: 4, healthStatus: 'Under Observation', imageUrl: 'https://images.unsplash.com/photo-1570042707186-61421a14874d?w=400' },
    { id: 'C-0088', name: 'برقة', type: 'cattle', breed: 'هولشتاين', subType: 'بقرة حلوب', age: 5, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1594183809673-e368a1f79f2d?w=400' },
    { id: 'C-0201', name: 'شمس', type: 'cattle', breed: 'سيمينتال', subType: 'عجل', age: 1, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1587321551065-97e2c90e0c11?w=400' },
    { id: 'S-0015', name: 'صوفيا', type: 'sheep', breed: 'نجدي', subType: 'سدسة', age: 3, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1588424490804-20a2b565a443?w=400' },
    { id: 'S-0042', name: 'لؤلؤة', type: 'sheep', breed: 'نعيمي', subType: 'رباعي', age: 2, healthStatus: 'Healthy', imageUrl: 'https://images.unsplash.com/photo-1524453009893-c156a5d1219b?w=400' },
];

export const EVENTS_DATA: FarmEvent[] = [
    { id: 1, animalId: 'C-0112', date: '2024-07-20', description: 'تلقيح صناعي' },
    { id: 2, animalId: 'C-0112', date: '2024-07-28', description: 'ارتفاع طفيف في درجة الحرارة، تم إعطاء خافض حرارة.' },
    { id: 3, animalId: 'C-0088', date: '2024-07-15', description: 'فحص دوري، الحالة ممتازة.' },
    { id: 4, animalId: 'S-0015', date: '2024-06-30', description: 'جز الصوف.' },
];

export const SHEPHERDS_DATA: Shepherd[] = [
    { id: 1, name: 'أحمد عبدالله', phone: '0501234567', specialty: 'خبير تغذية', imageUrl: `https://i.pravatar.cc/150?u=ahmed` },
    { id: 2, name: 'سالم محمد', phone: '0559876543', specialty: 'طبيب بيطري', imageUrl: `https://i.pravatar.cc/150?u=salem` },
    { id: 3, name: 'علي حسن', phone: '0533456789', specialty: 'مسؤول الحلب', imageUrl: `https://i.pravatar.cc/150?u=ali` },
];
