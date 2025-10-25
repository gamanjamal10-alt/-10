
export interface Stat {
    title: string;
    value: string;
    color?: 'warning' | 'danger';
}

export interface Task {
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
}

export interface Alert {
    title: string;
    time: string;
    icon: string;
    type: 'danger' | 'warning';
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
