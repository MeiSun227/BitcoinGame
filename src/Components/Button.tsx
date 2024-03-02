interface ButtonProps {
	buttonText: string;
	colorClass: string;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick, colorClass }) => {
	return (
		<>
			<div className="text-center">
				<button
					className={`px-4 py-3 rounded-md transition-colors ${colorClass}`}
					onClick={onClick}>
					{buttonText}
				</button>
			</div>
		</>
	);
};

export default Button;
