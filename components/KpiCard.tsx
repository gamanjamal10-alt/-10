
import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import type { KpiData } from '../types';

interface KpiCardProps {
    kpiData: KpiData;
}

const KpiSegmentedButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <label
        className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all duration-200 
        ${isActive ? 'bg-primary shadow-md text-white' : 'text-text-light-secondary dark:text-dark-secondary'}`}
        onClick={onClick}
    >
        <span className="truncate">{label}</span>
        <input
            checked={isActive}
            className="invisible w-0"
            name="kpi-selector"
            type="radio"
            value={label}
            readOnly
        />
    </label>
);

export const KpiCard: React.FC<KpiCardProps> = ({ kpiData }) => {
    const kpiKeys = Object.keys(kpiData);
    const [selectedKpi, setSelectedKpi] = useState(kpiKeys[0]);
    const activeKpi = kpiData[selectedKpi];

    const trendColor = activeKpi.trendDirection === 'up' ? 'text-secondary' : 'text-danger';

    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
            <h3 className="text-text-light-primary dark:text-dark-primary text-lg font-bold leading-tight tracking-[-0.015em]">Key Performance Indicators</h3>

            {/* Segmented Buttons */}
            <div className="flex">
                <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark p-1">
                    {kpiKeys.map((key) => (
                        <KpiSegmentedButton
                            key={key}
                            label={key}
                            isActive={selectedKpi === key}
                            onClick={() => setSelectedKpi(key)}
                        />
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="flex flex-wrap">
                <div className="flex min-w-72 flex-1 flex-col gap-1">
                    <p className="text-text-light-secondary dark:text-dark-secondary text-base font-medium leading-normal">{activeKpi.title}</p>
                    <p className="text-text-light-primary dark:text-dark-primary tracking-tight text-[32px] font-bold leading-tight truncate">{activeKpi.value}</p>
                    <div className="flex gap-2 items-center">
                        <p className="text-text-light-secondary dark:text-dark-secondary text-sm font-normal leading-normal">Last 30 Days</p>
                        <div className={`flex items-center gap-1 ${trendColor}`}>
                            <span className="material-symbols-outlined text-base">
                                {activeKpi.trendDirection === 'up' ? 'trending_up' : 'trending_down'}
                            </span>
                            <p className="text-sm font-medium leading-normal">{activeKpi.trend}</p>
                        </div>
                    </div>
                </div>

                <div className="flex min-h-[180px] w-full flex-1 flex-col gap-8 py-4">
                   <ResponsiveContainer width="100%" height={148}>
                        <AreaChart data={activeKpi.data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#005A9C" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#005A9C" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                                    borderColor: '#424242',
                                    borderRadius: '0.5rem',
                                    color: '#E0E0E0'
                                }}
                                itemStyle={{ color: '#E0E0E0' }}
                                labelStyle={{ display: 'none' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#005A9C" fill="url(#chartGradient)" strokeWidth={3} dot={false} />
                        </AreaChart>
                   </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
