import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';

const navigation = [
    { name: 'Board', href: '/board' },
    { name: 'Backlog', href: '/backlog' },
    { name: 'Map', href: '/map' },
    { name: 'Overview', href: '/overview' },
    { name: 'Data', href: '/data' },
];

export function Navigation() {
    return (
        <nav className="flex space-x-1">
            {navigation.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                        cn(
                            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                            isActive
                                ? 'bg-sekolah-100 text-sekolah-900'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        )
                    }
                >
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );
}