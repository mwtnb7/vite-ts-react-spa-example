import { useState, useEffect } from "react";

function useSessionStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(() => {
		const saved = sessionStorage.getItem(key);
		return saved !== null ? JSON.parse(saved) : defaultValue;
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
}

export default useSessionStorageState;
