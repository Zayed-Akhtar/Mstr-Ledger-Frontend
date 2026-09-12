export const parseDateValue = (value) => {
    if (!value) return null;

    if (typeof value === 'string') {
        const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
        if (isoDateOnly.test(value)) {
            const [year, month, day] = value.split('-').map(Number);
            return new Date(year, month - 1, day);
        }
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDateForDisplay = (value, fallback = '-') => {
    const date = parseDateValue(value);
    if (!date) return fallback;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
};