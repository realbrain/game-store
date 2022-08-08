import { useEffect } from "react";

interface TimeoutFuncType {
	(): void;
}

export default (cb: TimeoutFuncType, timeout: number, dependency: any): void => {
	useEffect(() => {
		if (!dependency) {
			return;
		}
		const time = setTimeout(cb, timeout);

		return () => {
			clearInterval(time);
		};
	}, [cb, timeout, dependency]);
};
