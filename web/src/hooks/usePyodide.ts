import { loadPyodide, type PyodideInterface } from "pyodide";
import { useCallback, useEffect, useRef, useState } from "react";

export type PyodideStatus = "idle" | "loading" | "ready" | "error";

export function usePyodide() {
	const pyodideRef = useRef<PyodideInterface | null>(null);
	const [status, setStatus] = useState<PyodideStatus>("idle");
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function init() {
			setStatus("loading");
			try {
				const pyodide = await loadPyodide({
					indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/",
				});

				await pyodide.loadPackage("micropip");
				const micropip = pyodide.pyimport("micropip");
				await micropip.install("chess");

				if (!cancelled) {
					pyodideRef.current = pyodide;
					setStatus("ready");
				}
			} catch (err) {
				if (!cancelled) {
					setError(err instanceof Error ? err : new Error(String(err)));
					setStatus("error");
				}
			}
		}

		init();

		return () => {
			cancelled = true;
		};
	}, []);

	const runPython = useCallback(async (code: string): Promise<any> => {
		const pyodide = pyodideRef.current;
		if (!pyodide) throw new Error("Pyodide is not loaded yet");
		return await pyodide.runPythonAsync(code);
	}, []);

	return { status, error, runPython, pyodide: pyodideRef.current };
}
