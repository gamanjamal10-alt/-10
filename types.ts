import type { ReactNode } from 'react';

export interface Stat {
    title: string;
    value: string;
    color?: 'warning' | 'danger';
    icon: ReactNode;
}

export interface Kpi {
    title:string;
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
    completed?: boolean;
    description?: string;
}

export interface Alert {
    title: string;
    time: string;
    icon: string;
    type: 'warning' | 'danger';
}

export type AnimalType = 'cattle' | 'sheep';

export interface Animal {
    id: string;
    name: string;
    breed: string;
    age: number;
    healthStatus: 'Healthy' | 'Sick' | 'Under Observation';
    imageUrl: string;
    type: AnimalType;
}

export interface FarmEvent {
    id: number;
    animalId: string;
    date: string;
    type: 'birth' | 'vet_check' | 'note';
    description: string;
}
