export function formatDuration(fromDate: Date): string {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - fromDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        if (diffInHours === 0) {
            const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            return `${diffInMinutes}m`;
        }
        return `${diffInHours}h`;
    } else if (diffInDays < 30) {
        return `${diffInDays}d`;
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months}mo`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `${years}y`;
    }
}

export function getDurationColor(days: number): string {
    if (days < 7) {
        return 'bg-green-100 text-green-800'; // Less than a week
    } else if (days < 30) {
        return 'bg-yellow-100 text-yellow-800'; // Less than a month
    } else if (days < 90) {
        return 'bg-orange-100 text-orange-800'; // Less than 3 months
    } else {
        return 'bg-red-100 text-red-800'; // More than 3 months
    }
}