export interface ButtonProps {
	buttonText: string;
	colorClass: string;
	disabled: boolean;
	onClick: (selectedButton: string) => void;
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
					className={`w-40 inline-block px-4 py-3 rounded-md transition duration-300 ease-in-out text-zinc-50 ${
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
