export interface Stat {
    id?: string;
    title: string;
    value: string;
    color?: 'warning' | 'danger';
    icon: string;
}

export interface Kpi {
    title: string;
    value: string;
    trend: string;
    trendDirection: 'up' | 'down';
    data: { name: string; value: number }[];
}

export interface KpiData {
    [key: string]: Kpi;
}

export interface Task {
    id: number;
    title: string;
    dueDate: string;
    priority: 'high' | 'normal';
    completed: boolean;
    description?: string;
}

export interface Alert {
    title: string;
    time: string;
    icon: string;
    type: 'danger' | 'warning';
    description?: string;
}

export type AnimalType = 'cattle' | 'sheep';

export type HealthStatus = 'Healthy' | 'Sick' | 'Under Observation';

export interface Animal {
    id: string;
    name: string;
    type: AnimalType;
    subType?: string;
    breed: string;
    age: number;
    healthStatus: HealthStatus;
    imageUrl: string;
}

export interface FarmEvent {
    id: number;
    animalId: string;
    date: string;
    description: string;
}

export type ShepherdSpecialty = 'الأبقار' | 'الأغنام' | 'الكل';

export interface Shepherd {
    id: number;
    name: string;
    phone: string;
    specialty: ShepherdSpecialty;
    imageUrl: string;
}

export type Page = 'dashboard' | 'herd' | 'tasks' | 'reports' | 'shepherds';
