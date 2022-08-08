interface Props {
	mark: string;
	disabled: boolean;
	onClick: () => void;
}

const Cell = ({ mark, onClick, disabled }: Props) => {
	return <div className={`cell ${mark} ${disabled && "disable"}`} onClick={onClick}></div>;
};

export default Cell;
