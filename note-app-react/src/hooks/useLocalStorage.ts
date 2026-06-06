import { stat } from "fs";
import { useEffect, useState } from "react";

/**
 * Custom React hook that syncs state with localStorage.
 *
 * @param key - The localStorage key to store the value under.
 * @param fallBackValue - The default value if nothing is found in localStorage.
 * @returns A tuple of [storedValue, setter], similar to useState but persisted.
 *
 * @example
 * const [count, setCount] = useLocalStorage<number>("count", 0);
 */
export function useLocalStorage<T>(key: string, fallBackValue: T) {
	// Retrieve value from localStorage
	// Use lazy initialization to avoid expensive computations
	const [state, setState] = useState(() => {
		try {
			const value = localStorage.getItem(key);
			return value !== null ? JSON.parse(value) : fallBackValue;
		} catch (error) {
			console.log("Retrieving from localStorage has an error: ", error);
			return fallBackValue;
		}
	});

	// Set value to localStorage
	useEffect(()=>{
		try {
			localStorage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.log("Saving to localStorage has an error: ", error)
		}
	}, [key, state]);

	// Return these 2 as tuple instead of mutable array
	return [state, setState] as const;
}