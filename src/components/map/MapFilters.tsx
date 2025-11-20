import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useTaskFilters } from '../../store/hooks';
import { cn } from '../../utils/cn';

export const overlayOptions = [
    { id: 'icor2024', name: 'ICOR 2024' },
    { id: 'icor2025', name: 'ICOR 2025' },
    { id: 'gdp', name: 'GDP Growth' },
    { id: 'unemployment', name: 'Unemployment Rate' },
    { id: 'poverty', name: 'Poverty Rate' },
    { id: 'infrastructure', name: 'Infrastructure Index' },
    { id: 'urbanization', name: 'Urbanization Rate' },
    { id: 'internet', name: 'Internet Access' },
    { id: 'literacy', name: 'Literacy Rate' },
    { id: 'enrollment', name: 'School Enrollment' },
    { id: 'teacherRatio', name: 'Teacher Ratio' },
];

export function MapFilters() {
    const { filters, setFilter, resetFilters, projects, provinces } = useTaskFilters();

    return (
        <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Map Filters</h3>

            <div className="space-y-4">
                {/* Project Filter */}
                <div>
                    <Listbox value={filters.project} onChange={(v) => setFilter('project', v)}>
                        <div className="relative">
                            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Project
                            </Listbox.Label>
                            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border hover:border-orange-300 focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                    {filters.project || 'All Projects'}
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                    <Listbox.Option
                                        value={null}
                                        className={({ active }) =>
                                            cn(
                                                'relative cursor-default select-none py-2 pl-10 pr-4',
                                                active ? 'bg-orange-50 text-orange-900' : 'text-gray-900'
                                            )
                                        }
                                    >
                                        All Projects
                                    </Listbox.Option>
                                    {projects.map((project) => (
                                        <Listbox.Option
                                            key={project}
                                            value={project}
                                            className={({ active }) =>
                                                cn(
                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    active ? 'bg-orange-50 text-orange-900' : 'text-gray-900'
                                                )
                                            }
                                        >
                                            {project}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Indicators Filter */}
                <div>
                    <Listbox value={filters.overlays} onChange={(v) => setFilter('overlays', v)} multiple>
                        <div className="relative">
                            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Select Indicators
                            </Listbox.Label>
                            <Listbox.Button className="relative w-full min-h-[2.5rem] cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border hover:border-orange-300 focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                {filters.overlays.length === 0 ? (
                                    <span className="block text-gray-500">Select indicators...</span>
                                ) : (
                                    <span className="block truncate space-x-1">
                                        {filters.overlays.map(id => (
                                            <span key={id} className="inline-flex items-center bg-orange-100 text-orange-800 rounded px-2 py-0.5 text-xs mr-1 mb-1">
                                                {overlayOptions.find(o => o.id === id)?.name}
                                            </span>
                                        ))}
                                    </span>
                                )}
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                    {overlayOptions.map((option) => (
                                        <Listbox.Option
                                            key={option.id}
                                            value={option.id}
                                            className={({ active, selected }) =>
                                                cn(
                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    active ? 'bg-orange-50' : '',
                                                    selected ? 'text-orange-900 font-medium' : 'text-gray-900',
                                                    'flex items-center'
                                                )
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    {selected && (
                                                        <span className="absolute left-3 text-orange-600">
                                                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                    {option.name}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Province Filter */}
                <div>
                    <Listbox value={filters.province} onChange={(v) => setFilter('province', v)}>
                        <div className="relative">
                            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Province
                            </Listbox.Label>
                            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border hover:border-orange-300 focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                    {filters.province ?
                                        provinces.find(p => p.id === filters.province)?.name || filters.province
                                        : 'All Provinces'}
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                    <Listbox.Option
                                        value={null}
                                        className={({ active }) =>
                                            cn(
                                                'relative cursor-default select-none py-2 pl-10 pr-4',
                                                active ? 'bg-orange-50 text-orange-900' : 'text-gray-900'
                                            )
                                        }
                                    >
                                        All Provinces
                                    </Listbox.Option>
                                    {provinces.map((province) => (
                                        <Listbox.Option
                                            key={province.id}
                                            value={province.id}
                                            className={({ active }) =>
                                                cn(
                                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                                    active ? 'bg-orange-50 text-orange-900' : 'text-gray-900'
                                                )
                                            }
                                        >
                                            {province.name}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>


                {/* Reset Button */}
                <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
}