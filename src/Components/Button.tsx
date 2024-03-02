interface ButtonProps {
	buttonText: string;
	colorClass: string;
	onClick: (text: string) => void;
	disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
	buttonText,
	onClick,
	colorClass,
	disabled,
}) => {
	const handleButtonClick = () => {
		onClick(buttonText);
	};

	return (
		<>
			<div className="text-center">
				<button
					className={`px-4 py-3 rounded-md transition-colors ${
						disabled ? "bg-gray-400" : colorClass
					} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
					onClick={handleButtonClick}
					disabled={disabled}>
					{buttonText}
				</button>
			</div>
		</>
	);
};

export default Button;
