import { useState, useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { User } from "../types/types";

const defaultUser = {
	id: "",
	name: ""
};

const getUser = (initial: User = defaultUser): User => {
	const u = localStorage.getItem("user");
	if (!u) return initial;
	return JSON.parse(u);
};

export default (): [User, Dispatch<SetStateAction<User>>] => {
	const [user, setUser] = useState<User>(() => getUser());

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	const currentUser = useMemo<User>(
		() => ({
			id: user.id,
			name: user.name
		}),
		[user.id, user.name]
	);

	return [currentUser, setUser];
};
