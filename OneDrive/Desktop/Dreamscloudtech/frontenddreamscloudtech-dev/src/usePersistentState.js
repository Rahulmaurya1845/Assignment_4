import { useEffect, useState } from "react";

const usePersistentState = (key, initialState) => {
    const [state, setState] = useState(() => {
        const savedState = window.sessionStorage.getItem(key);
        return savedState ? JSON.parse(savedState) : initialState;
    });

    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
};

export default usePersistentState;
