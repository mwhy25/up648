import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useTaskFilters } from '../../store/hooks';
import { cn } from '../../utils/cn';

export function BoardFilters() {
    const { filters, setFilter, resetFilters, projects, provinces } = useTaskFilters();

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Title Search */}
            <div className="min-w-[240px]">
                <input
                    type="text"
                    placeholder="Search by title..."
                    defaultValue={filters.title ?? ''}
                    onChange={(e) => setFilter('title', e.target.value || null)}
                    className="w-full rounded-lg bg-white py-2 px-3 text-sm border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
                />
            </div>

            {/* Project Filter */}
            <div className="min-w-[200px]">
                <Listbox value={filters.project} onChange={(v) => setFilter('project', v)}>
                    <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                                            active ? 'bg-sekolah-100 text-sekolah-900' : 'text-gray-900'
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
                                                active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
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

            {/* Province Filter */}
            <div className="min-w-[200px]">
                <Listbox value={filters.province} onChange={(v) => setFilter('province', v)}>
                    <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                                            active ? 'bg-sekolah-100 text-sekolah-900' : 'text-gray-900'
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
                                                active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
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

            {/* Sprint Filter */}
            <div className="min-w-[200px]">
                <Listbox value={filters.sprint} onChange={(v) => setFilter('sprint', v)}>
                    <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                                {filters.sprint ?
                                    filters.sprint === 'sprint-1' ? 'Sprint 1 - October 2025' :
                                        filters.sprint === 'sprint-2' ? 'Sprint 2 - November 2025' :
                                            'Sprint 3 - December 2025'
                                    : 'All Sprints'}
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
                                            active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                                        )
                                    }
                                >
                                    All Sprints
                                </Listbox.Option>
                                <Listbox.Option
                                    value="sprint-1"
                                    className={({ active }) =>
                                        cn(
                                            'relative cursor-default select-none py-2 pl-10 pr-4',
                                            active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                                        )
                                    }
                                >
                                    Sprint 1 - October 2025
                                </Listbox.Option>
                                <Listbox.Option
                                    value="sprint-2"
                                    className={({ active }) =>
                                        cn(
                                            'relative cursor-default select-none py-2 pl-10 pr-4',
                                            active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                                        )
                                    }
                                >
                                    Sprint 2 - November 2025
                                </Listbox.Option>
                                <Listbox.Option
                                    value="sprint-3"
                                    className={({ active }) =>
                                        cn(
                                            'relative cursor-default select-none py-2 pl-10 pr-4',
                                            active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                                        )
                                    }
                                >
                                    Sprint 3 - December 2025
                                </Listbox.Option>
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>

            {/* Reset Button */}
            <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
            >
                Reset Filters
            </button>
        </div>
    );
}