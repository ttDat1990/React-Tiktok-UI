import { useState, useEffect } from 'react'; // tạo ra các hook custom bằng cách dùng hook nguyên bản

function useDebounce(value, delay) {
    const [debounceValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line
    }, [value]);

    return debounceValue;
}

export default useDebounce;
