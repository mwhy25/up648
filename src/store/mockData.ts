import type { Province, Task } from '../types';

export const mockProvinces: Province[] = [
    {
        id: 'aceh',
        name: 'Aceh',
        code: 'AC',
        coordinates: [4.695135, 96.749397],
        indicators: {
            gdp: 4.2,
            unemployment: 6.5,
            povertyRate: 15.2,
            infrastructureIndex: 68.5,
            urbanizationRate: 45.2,
            internetAccess: 72.3,
            literacyRate: 98.2,
            schoolEnrollment: 92.5,
            teacherRatio: 16.8
        }
    },
    {
        id: 'sumut',
        name: 'Sumatera Utara',
        code: 'SU',
        coordinates: [2.1154, 99.5451],
        indicators: {
            gdp: 5.1,
            unemployment: 5.8,
            povertyRate: 12.5,
            infrastructureIndex: 72.3,
            urbanizationRate: 52.8,
            internetAccess: 75.6,
            literacyRate: 97.8,
            schoolEnrollment: 93.2,
            teacherRatio: 15.9
        }
    },
    {
        id: 'sumbar',
        name: 'Sumatera Barat',
        code: 'SB',
        coordinates: [-0.7399, 100.8000],
        indicators: {
            gdp: 4.8,
            unemployment: 5.5,
            povertyRate: 11.8,
            infrastructureIndex: 70.5,
            urbanizationRate: 48.9,
            internetAccess: 74.2,
            literacyRate: 98.5,
            schoolEnrollment: 94.1,
            teacherRatio: 15.5
        }
    },
    {
        id: 'riau',
        name: 'Riau',
        code: 'RI',
        coordinates: [0.2933, 101.7068],
        indicators: {
            gdp: 6.2,
            unemployment: 4.9,
            povertyRate: 10.2,
            infrastructureIndex: 75.8,
            urbanizationRate: 55.4,
            internetAccess: 78.9,
            literacyRate: 98.1,
            schoolEnrollment: 93.8,
            teacherRatio: 15.2
        }
    },
    {
        id: 'jambi',
        name: 'Jambi',
        code: 'JA',
        coordinates: [-1.4852, 103.7381],
        indicators: {
            gdp: 4.9,
            unemployment: 5.2,
            povertyRate: 11.1,
            infrastructureIndex: 69.8,
            urbanizationRate: 47.2,
            internetAccess: 73.5,
            literacyRate: 97.9,
            schoolEnrollment: 92.9,
            teacherRatio: 15.7
        }
    },
    {
        id: 'sumsel',
        name: 'Sumatera Selatan',
        code: 'SS',
        coordinates: [-3.3194, 104.9144],
        indicators: {
            gdp: 5.1,
            unemployment: 5.8,
            povertyRate: 12.5,
            infrastructureIndex: 72.3,
            urbanizationRate: 52.8,
            internetAccess: 75.6,
            literacyRate: 97.8,
            schoolEnrollment: 93.2,
            teacherRatio: 15.9
        }
    },
    {
        id: 'bengkulu',
        name: 'Bengkulu',
        code: 'BE',
        coordinates: [-3.7928, 102.2608],
        indicators: {
            gdp: 4.5,
            unemployment: 5.9,
            povertyRate: 13.5,
            infrastructureIndex: 67.9,
            urbanizationRate: 44.8,
            internetAccess: 71.6,
            literacyRate: 97.4,
            schoolEnrollment: 92.3,
            teacherRatio: 16.3
        }
    },
    {
        id: 'lampung',
        name: 'Lampung',
        code: 'LA',
        coordinates: [-4.5586, 105.4068],
        indicators: {
            gdp: 4.7,
            unemployment: 5.7,
            povertyRate: 12.9,
            infrastructureIndex: 69.1,
            urbanizationRate: 46.5,
            internetAccess: 72.8,
            literacyRate: 97.5,
            schoolEnrollment: 92.6,
            teacherRatio: 16.0
        }
    },
    {
        id: 'babel',
        name: 'Bangka Belitung',
        code: 'BB',
        coordinates: [-2.7411, 106.4406],
        indicators: {
            gdp: 4.8,
            unemployment: 5.1,
            povertyRate: 11.3,
            infrastructureIndex: 70.2,
            urbanizationRate: 47.8,
            internetAccess: 73.9,
            literacyRate: 97.8,
            schoolEnrollment: 92.8,
            teacherRatio: 15.8
        }
    },
    {
        id: 'jakarta',
        name: 'DKI Jakarta',
        code: 'JK',
        coordinates: [-6.200000, 106.816666],
        indicators: {
            gdp: 8.5,
            unemployment: 4.2,
            povertyRate: 3.8,
            infrastructureIndex: 92.5,
            urbanizationRate: 98.7,
            internetAccess: 95.6,
            literacyRate: 99.8,
            schoolEnrollment: 98.2,
            teacherRatio: 14.2
        }
    },
    {
        id: 'jabar',
        name: 'Jawa Barat',
        code: 'JB',
        coordinates: [-6.9147, 107.6098],
        indicators: {
            gdp: 7.2,
            unemployment: 4.8,
            povertyRate: 7.5,
            infrastructureIndex: 85.6,
            urbanizationRate: 75.4,
            internetAccess: 88.2,
            literacyRate: 98.9,
            schoolEnrollment: 95.8,
            teacherRatio: 14.8
        }
    },
    {
        id: 'jateng',
        name: 'Jawa Tengah',
        code: 'JT',
        coordinates: [-7.1510, 110.1403],
        indicators: {
            gdp: 6.8,
            unemployment: 4.9,
            povertyRate: 8.2,
            infrastructureIndex: 82.3,
            urbanizationRate: 70.2,
            internetAccess: 85.9,
            literacyRate: 98.5,
            schoolEnrollment: 94.9,
            teacherRatio: 15.1
        }
    },
    {
        id: 'jogja',
        name: 'DI Yogyakarta',
        code: 'YO',
        coordinates: [-7.7956, 110.3695],
        indicators: {
            gdp: 6.5,
            unemployment: 4.5,
            povertyRate: 7.8,
            infrastructureIndex: 84.7,
            urbanizationRate: 72.8,
            internetAccess: 87.4,
            literacyRate: 99.1,
            schoolEnrollment: 96.2,
            teacherRatio: 14.5
        }
    },
    {
        id: 'jatim',
        name: 'Jawa Timur',
        code: 'JI',
        coordinates: [-7.5360, 112.2384],
        indicators: {
            gdp: 7.0,
            unemployment: 4.7,
            povertyRate: 8.0,
            infrastructureIndex: 83.9,
            urbanizationRate: 71.5,
            internetAccess: 86.8,
            literacyRate: 98.7,
            schoolEnrollment: 95.3,
            teacherRatio: 14.9
        }
    },
    {
        id: 'banten',
        name: 'Banten',
        code: 'BT',
        coordinates: [-6.4058, 106.0640],
        indicators: {
            gdp: 6.9,
            unemployment: 5.0,
            povertyRate: 8.5,
            infrastructureIndex: 81.5,
            urbanizationRate: 68.9,
            internetAccess: 84.7,
            literacyRate: 98.3,
            schoolEnrollment: 94.5,
            teacherRatio: 15.3
        }
    }
];

export const mockSprints = [
    { id: 'sprint-1', name: 'Sprint 1 - October 2025' },
    { id: 'sprint-2', name: 'Sprint 2 - November 2025' },
    { id: 'sprint-3', name: 'Sprint 3 - December 2025' },
];

const baseMockTasks: Omit<Task, 'budgetTotal' | 'budgetAbsorbed'>[] = [
    {
        id: 'task-1',
        title: 'Elementary School Renovation in Banda Aceh',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'John Doe',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-10-15')
    },
    {
        id: 'task-2',
        title: 'High School Laboratory Construction in Medan',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Jane Smith',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-10'),
        updatedAt: new Date('2025-10-20')
    },
    {
        id: 'task-3',
        title: 'University Library Expansion in Padang',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Ahmad Ibrahim',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-12'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-4',
        title: 'Vocational School Workshop in Pekanbaru',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Sarah Johnson',
        stage: 'construction-verification',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-18'),
        updatedAt: new Date('2025-10-23')
    },
    {
        id: 'task-5',
        title: 'Primary School Sports Complex in Jambi',
        project: 'Education Facilities',
        province: 'jambi',
        creator: 'Michael Chen',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-05'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-6',
        title: 'School IT Infrastructure in Palembang',
        project: 'Education Facilities',
        province: 'sumsel',
        creator: 'Linda Wilson',
        stage: 'backlog',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-10-20')
    },
    {
        id: 'task-7',
        title: 'Special Education Center in Bengkulu',
        project: 'Education Facilities',
        province: 'bengkulu',
        creator: 'David Lee',
        stage: 'procurement',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-19'),
        updatedAt: new Date('2025-10-24')
    },
    {
        id: 'task-8',
        title: 'School Cafeteria Renovation in Bandar Lampung',
        project: 'Education Facilities',
        province: 'lampung',
        creator: 'Emily Brown',
        stage: 'construction',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-21'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-9',
        title: 'Elementary School Expansion in Pangkal Pinang',
        project: 'Education Facilities',
        province: 'babel',
        creator: 'Robert Taylor',
        stage: 'handover',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-17'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-10',
        title: 'Smart Classroom Initiative in Jakarta',
        project: 'Education Facilities',
        province: 'jakarta',
        creator: 'Sofia Putri',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-08'),
        updatedAt: new Date('2025-10-24')
    },
    {
        id: 'task-11',
        title: 'School Auditorium Construction in Bandung',
        project: 'Education Facilities',
        province: 'jabar',
        creator: 'Kevin Wong',
        stage: 'backlog',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-22'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-12',
        title: 'Technical School Equipment Upgrade in Semarang',
        project: 'Education Facilities',
        province: 'jateng',
        creator: 'Maria Garcia',
        stage: 'procurement',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-13',
        title: 'University Research Center in Yogyakarta',
        project: 'Education Facilities',
        province: 'jogja',
        creator: 'James Wilson',
        stage: 'construction',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-16'),
        updatedAt: new Date('2025-10-21')
    },
    {
        id: 'task-14',
        title: 'School Science Laboratory in Surabaya',
        project: 'Education Facilities',
        province: 'jatim',
        creator: 'Anna Lee',
        stage: 'construction-verification',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-24'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-15',
        title: 'School Library Modernization in Serang',
        project: 'Education Facilities',
        province: 'banten',
        creator: 'Thomas Anderson',
        stage: 'backlog',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-25'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-16',
        title: 'Early Childhood Center Upgrade in Lhokseumawe',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'Nur Aisyah',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-01')
    },
    {
        id: 'task-17',
        title: 'High School Dormitory Renovation in Medan',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Rahmat Hadi',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-02'),
        updatedAt: new Date('2025-10-05')
    },
    {
        id: 'task-18',
        title: 'STEM Lab Installation in Bukittinggi',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Clara Santoso',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-03'),
        updatedAt: new Date('2025-10-07')
    },
    {
        id: 'task-19',
        title: 'Digital Classroom Setup in Dumai',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Ferry Saputra',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-04'),
        updatedAt: new Date('2025-10-08')
    },
    {
        id: 'task-20',
        title: 'Library Automation System in Jambi City',
        project: 'Education Facilities',
        province: 'jambi',
        creator: 'Siti Marlina',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-05'),
        updatedAt: new Date('2025-10-09')
    },
    {
        id: 'task-21',
        title: 'Teacher Training Center Refurbishment in Palembang',
        project: 'Education Facilities',
        province: 'sumsel',
        creator: 'Andi Pratama',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-06'),
        updatedAt: new Date('2025-10-10')
    },
    {
        id: 'task-22',
        title: 'Inclusive Education Facility in Bengkulu City',
        project: 'Education Facilities',
        province: 'bengkulu',
        creator: 'Yunita Sari',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-07'),
        updatedAt: new Date('2025-10-07')
    },
    {
        id: 'task-23',
        title: 'School Sports Field Upgrade in Metro',
        project: 'Education Facilities',
        province: 'lampung',
        creator: 'Budi Setiawan',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-08'),
        updatedAt: new Date('2025-10-12')
    },
    {
        id: 'task-24',
        title: 'Primary School ICT Expansion in Pangkalpinang',
        project: 'Education Facilities',
        province: 'babel',
        creator: 'Mei Lin',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-09'),
        updatedAt: new Date('2025-10-13')
    },
    {
        id: 'task-25',
        title: 'Junior High Laboratory Refitting in Central Jakarta',
        project: 'Education Facilities',
        province: 'jakarta',
        creator: 'Dimas Arif',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-10'),
        updatedAt: new Date('2025-10-14')
    },
    {
        id: 'task-26',
        title: 'Robotics Club Room in Cimahi',
        project: 'Education Facilities',
        province: 'jabar',
        creator: 'Gilang Mahesa',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-11'),
        updatedAt: new Date('2025-10-15')
    },
    {
        id: 'task-27',
        title: 'Vocational Training Labs in Surakarta',
        project: 'Education Facilities',
        province: 'jateng',
        creator: 'Agnes Dewi',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-12'),
        updatedAt: new Date('2025-10-16')
    },
    {
        id: 'task-28',
        title: 'Student Innovation Hub in Sleman',
        project: 'Education Facilities',
        province: 'jogja',
        creator: 'Rama Putra',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-13'),
        updatedAt: new Date('2025-10-13')
    },
    {
        id: 'task-29',
        title: 'STEM Workshop in Sidoarjo',
        project: 'Education Facilities',
        province: 'jatim',
        creator: 'Nadia Fitri',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-14'),
        updatedAt: new Date('2025-10-17')
    },
    {
        id: 'task-30',
        title: 'School Health Unit Renovation in Cilegon',
        project: 'Education Facilities',
        province: 'banten',
        creator: 'Rizky Kurnia',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-10-18')
    },
    {
        id: 'task-31',
        title: 'Teacher Housing Maintenance in Sabang',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'Cut Intan',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-16'),
        updatedAt: new Date('2025-10-19')
    },
    {
        id: 'task-32',
        title: 'Campus Wi-Fi Expansion in Binjai',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Irfan Maulana',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-17'),
        updatedAt: new Date('2025-10-20')
    },
    {
        id: 'task-33',
        title: 'Reading Garden Creation in Payakumbuh',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Yohana Sihombing',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-18'),
        updatedAt: new Date('2025-10-21')
    },
    {
        id: 'task-34',
        title: 'Smart Library Kiosk in Siak',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Fajar Nugroho',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-19'),
        updatedAt: new Date('2025-10-19')
    },
    {
        id: 'task-35',
        title: 'Classroom Acoustic Treatment in Sungai Penuh',
        project: 'Education Facilities',
        province: 'jambi',
        creator: 'Salsa Nur',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-36',
        title: 'STEM Teacher Lab in Prabumulih',
        project: 'Education Facilities',
        province: 'sumsel',
        creator: 'Wenny Kusuma',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-21'),
        updatedAt: new Date('2025-10-23')
    },
    {
        id: 'task-37',
        title: 'Special Needs Access Ramps in Manna',
        project: 'Education Facilities',
        province: 'bengkulu',
        creator: 'Haryo Wahyu',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-22'),
        updatedAt: new Date('2025-10-24')
    },
    {
        id: 'task-38',
        title: 'Solar Lighting for Schools in Pringsewu',
        project: 'Education Facilities',
        province: 'lampung',
        creator: 'Kenny Hartono',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-39',
        title: 'Digital Attendance Pilot in Belitung',
        project: 'Education Facilities',
        province: 'babel',
        creator: 'Vina Kartika',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-24'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-40',
        title: 'STEM Outreach Van for North Jakarta',
        project: 'Education Facilities',
        province: 'jakarta',
        creator: 'William Tan',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-01')
    },
    {
        id: 'task-41',
        title: 'Coding Lab Setup in Depok',
        project: 'Education Facilities',
        province: 'jabar',
        creator: 'Syifa Aulia',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-02'),
        updatedAt: new Date('2025-10-04')
    },
    {
        id: 'task-42',
        title: 'Green School Initiative in Tegal',
        project: 'Education Facilities',
        province: 'jateng',
        creator: 'Hendra Purnama',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-03'),
        updatedAt: new Date('2025-10-06')
    },
    {
        id: 'task-43',
        title: 'Art and Music Room in Bantul',
        project: 'Education Facilities',
        province: 'jogja',
        creator: 'Taufik Rahman',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-04'),
        updatedAt: new Date('2025-10-07')
    },
    {
        id: 'task-44',
        title: 'Makerspace in Malang',
        project: 'Education Facilities',
        province: 'jatim',
        creator: 'Dea Kurniasih',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-05'),
        updatedAt: new Date('2025-10-08')
    },
    {
        id: 'task-45',
        title: 'School Safety Audit in Pandeglang',
        project: 'Education Facilities',
        province: 'banten',
        creator: 'Ratri Puspita',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-06'),
        updatedAt: new Date('2025-10-09')
    },
    {
        id: 'task-46',
        title: 'Seismic Retrofit Study for Schools in Meulaboh',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'Ilham Saputra',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-07'),
        updatedAt: new Date('2025-10-07')
    },
    {
        id: 'task-47',
        title: 'Career Counseling Center in Pematangsiantar',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Natasya Lestari',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-08'),
        updatedAt: new Date('2025-10-11')
    },
    {
        id: 'task-48',
        title: 'School Canteen Hygiene Upgrade in Pariaman',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Rudi Hartono',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-09'),
        updatedAt: new Date('2025-10-12')
    },
    {
        id: 'task-49',
        title: 'STEM Outreach Program Center in Tembilahan',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Sabrina Halim',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-10'),
        updatedAt: new Date('2025-10-13')
    },
    {
        id: 'task-50',
        title: 'Classroom Ventilation Upgrade in Muara Bungo',
        project: 'Education Facilities',
        province: 'jambi',
        creator: 'Putra Daniel',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-11'),
        updatedAt: new Date('2025-10-14')
    },
    {
        id: 'task-51',
        title: 'Science Park for Schools in Lubuklinggau',
        project: 'Education Facilities',
        province: 'sumsel',
        creator: 'Kurnia Cahya',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-12'),
        updatedAt: new Date('2025-10-15')
    },
    {
        id: 'task-52',
        title: 'Digital Whiteboard Rollout in Curup',
        project: 'Education Facilities',
        province: 'bengkulu',
        creator: 'Seno Adi',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-13'),
        updatedAt: new Date('2025-10-13')
    },
    {
        id: 'task-53',
        title: 'Science Equipment Procurement in Kalianda',
        project: 'Education Facilities',
        province: 'lampung',
        creator: 'Made Sujana',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-14'),
        updatedAt: new Date('2025-10-16')
    },
    {
        id: 'task-54',
        title: 'E-Learning Studio in Tanjung Pandan',
        project: 'Education Facilities',
        province: 'babel',
        creator: 'Niko Prasetyo',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-10-17')
    },
    {
        id: 'task-55',
        title: 'After-School Center in South Jakarta',
        project: 'Education Facilities',
        province: 'jakarta',
        creator: 'Larasati P',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-16'),
        updatedAt: new Date('2025-10-18')
    },
    {
        id: 'task-56',
        title: 'School Garden Program in Garut',
        project: 'Education Facilities',
        province: 'jabar',
        creator: 'Bayu Firmansyah',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-17'),
        updatedAt: new Date('2025-10-19')
    },
    {
        id: 'task-57',
        title: 'Digital Literacy Corner in Pekalongan',
        project: 'Education Facilities',
        province: 'jateng',
        creator: 'Sari Melati',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-18'),
        updatedAt: new Date('2025-10-20')
    },
    {
        id: 'task-58',
        title: 'Language Lab in Gunungkidul',
        project: 'Education Facilities',
        province: 'jogja',
        creator: 'Miko Anggara',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-19'),
        updatedAt: new Date('2025-10-19')
    },
    {
        id: 'task-59',
        title: 'Inclusive Playground in Kediri',
        project: 'Education Facilities',
        province: 'jatim',
        creator: 'Naufal Reza',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-60',
        title: 'School Drainage Improvement in Rangkasbitung',
        project: 'Education Facilities',
        province: 'banten',
        creator: 'Putri Ayu',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-21'),
        updatedAt: new Date('2025-10-23')
    },
    {
        id: 'task-61',
        title: 'STEM Kit Distribution in Bireuen',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'Surya Aditya',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-22'),
        updatedAt: new Date('2025-10-24')
    },
    {
        id: 'task-62',
        title: 'Teacher Resource Center in Tebing Tinggi',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Anita Kumala',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-63',
        title: 'Open Library Space in Solok',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Rafiq Noor',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-24'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-64',
        title: 'School Safety Signage in Rengat',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Maya Paramitha',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-01')
    },
    {
        id: 'task-65',
        title: 'STEM Mentoring Space in Sarolangun',
        project: 'Education Facilities',
        province: 'jambi',
        creator: 'Rio Fadhil',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-02'),
        updatedAt: new Date('2025-10-03')
    },
    {
        id: 'task-66',
        title: 'Smart Attendance Devices in Pagar Alam',
        project: 'Education Facilities',
        province: 'sumsel',
        creator: 'Shinta W',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-03'),
        updatedAt: new Date('2025-10-05')
    },
    {
        id: 'task-67',
        title: 'Reading Corner Rollout in Arga Makmur',
        project: 'Education Facilities',
        province: 'bengkulu',
        creator: 'Dodi Alamsyah',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-04'),
        updatedAt: new Date('2025-10-06')
    },
    {
        id: 'task-68',
        title: 'School Fencing Upgrade in Kotabumi',
        project: 'Education Facilities',
        province: 'lampung',
        creator: 'Anwar H',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-05'),
        updatedAt: new Date('2025-10-07')
    },
    {
        id: 'task-69',
        title: 'Digital Signage in Manggar',
        project: 'Education Facilities',
        province: 'babel',
        creator: 'Selvi A',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-06'),
        updatedAt: new Date('2025-10-08')
    },
    {
        id: 'task-70',
        title: 'STEM Scholarship Outreach in East Jakarta',
        project: 'Education Facilities',
        province: 'jakarta',
        creator: 'Jono Prabowo',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-07'),
        updatedAt: new Date('2025-10-07')
    },
    {
        id: 'task-71',
        title: 'School Parking Safety in Subang',
        project: 'Education Facilities',
        province: 'jabar',
        creator: 'Rahmi Handayani',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-08'),
        updatedAt: new Date('2025-10-09')
    },
    {
        id: 'task-72',
        title: 'Science Demo Kits in Kudus',
        project: 'Education Facilities',
        province: 'jateng',
        creator: 'Yoga Aditya',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-09'),
        updatedAt: new Date('2025-10-11')
    },
    {
        id: 'task-73',
        title: 'Student Counseling Booths in Wates',
        project: 'Education Facilities',
        province: 'jogja',
        creator: 'Prita Anggraini',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-10'),
        updatedAt: new Date('2025-10-12')
    },
    {
        id: 'task-74',
        title: 'Campus Security Cameras in Pasuruan',
        project: 'Education Facilities',
        province: 'jatim',
        creator: 'Suryo Wicaksono',
        stage: 'handover',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-11'),
        updatedAt: new Date('2025-10-13')
    },
    {
        id: 'task-75',
        title: 'STEM Fair Support in Serang City',
        project: 'Education Facilities',
        province: 'banten',
        creator: 'Monica S',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-12'),
        updatedAt: new Date('2025-10-14')
    },
    {
        id: 'task-76',
        title: 'Community Learning Center in Sigli',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'Suci Ramadhani',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-13'),
        updatedAt: new Date('2025-10-13')
    },
    {
        id: 'task-77',
        title: 'STEM Library Corner in Tanjungbalai',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Alvin Prakoso',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-14'),
        updatedAt: new Date('2025-10-16')
    },
    {
        id: 'task-78',
        title: 'School Roof Maintenance in Sawahlunto',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Mega Putri',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-10-17')
    },
    {
        id: 'task-79',
        title: 'STEM Curriculum Pilot in Pelalawan',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Joshua L',
        stage: 'construction-verification',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-16'),
        updatedAt: new Date('2025-10-18')
    }
];

export const mockTasks: Task[] = baseMockTasks.map((t) => {
    const base: Task = {
        ...t,
        budgetTotal: 100_000_000,
        budgetAbsorbed:
            t.stage === 'done' ? 100_000_000 :
            t.stage === 'handover' ? 90_000_000 :
            t.stage === 'construction-verification' ? 80_000_000 :
            t.stage === 'construction' ? 50_000_000 :
            (t.stage === 'procurement' || t.stage === 'procurement-verification') ? 15_000_000 :
            0,
    };

    // Force some tasks into over-limit state for demo
    const overIds = new Set(['task-10', 'task-21', 'task-39', 'task-57', 'task-63']);
    if (overIds.has(base.id)) {
        base.budgetAbsorbed = base.budgetTotal + 20_000_000; // 120%
    }

    // Seed budget change logs
    const day = 24 * 60 * 60 * 1000;
    const d1 = new Date(base.createdAt.getTime() + 1 * day);
    const d2 = new Date(base.createdAt.getTime() + 3 * day);
    const d3 = new Date(base.createdAt.getTime() + 5 * day);

    const logs: NonNullable<Task['budgetLogs']> = [];

    // Initial total set (simulate approval/adjustment)
    logs.push({ at: d1, field: 'budgetTotal', from: 100_000_000, to: 100_000_000 });

    // Absorption progresses depending on stage
    const stageAbsorbed = base.budgetAbsorbed;
    const midAbsorbed = Math.max(0, Math.min(100_000_000, Math.floor(stageAbsorbed * 0.6)));
    const startAbsorbed = Math.min(5_000_000, midAbsorbed);

    if (startAbsorbed > 0) logs.push({ at: d2, field: 'budgetAbsorbed', from: 0, to: startAbsorbed, note: 'Initial disbursement' });
    if (midAbsorbed > startAbsorbed) logs.push({ at: d3, field: 'budgetAbsorbed', from: startAbsorbed, to: midAbsorbed, note: 'Progress payment' });

    // If over limit, add a recent overrun log
    if (overIds.has(base.id)) {
        const d4 = new Date(base.createdAt.getTime() + 7 * day);
        logs.push({ at: d4, field: 'budgetAbsorbed', from: 100_000_000, to: base.budgetAbsorbed, note: 'Overrun adjustment' });
    } else if (stageAbsorbed > midAbsorbed) {
        const d4 = new Date(base.createdAt.getTime() + 7 * day);
        logs.push({ at: d4, field: 'budgetAbsorbed', from: midAbsorbed, to: stageAbsorbed, note: 'Milestone payment' });
    }

    (base as Task).budgetLogs = logs;

    return base;
});

export const mockProjects = [
    'Infrastructure Development',
    'Education Facilities',
    'Healthcare Centers',
    'Public Transportation',
    'Urban Planning',
];