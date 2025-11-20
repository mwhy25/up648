export type KanbanStage =
    | 'backlog'
    | 'backlog-verification'
    | 'procurement'
    | 'procurement-verification'
    | 'construction'
    | 'construction-verification'
    | 'handover'
    | 'done';

export interface Task {
    id: string;
    title: string;
    project: string;
    province: string;
    creator: string;
    stage: KanbanStage;
    sprint: string;
    createdAt: Date;
    updatedAt: Date;
    budgetTotal: number;
    budgetAbsorbed: number;
    budgetLogs?: Array<{
        at: Date;
        field: 'budgetTotal' | 'budgetAbsorbed';
        from: number;
        to: number;
        note?: string;
    }>;
}

export interface Province {
    id: string;
    name: string;
    code: string;
    coordinates: [number, number]; // [latitude, longitude]
    indicators: {
        // Growth & Economy
        gdp: number;
        unemployment: number;
        povertyRate: number;

        // Infrastructure & Development
        infrastructureIndex: number;
        urbanizationRate: number;
        internetAccess: number;

        // Education
        literacyRate: number;
        schoolEnrollment: number;
        teacherRatio: number;

        [key: string]: number; // Allow additional indicators
    };
}