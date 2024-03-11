import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
	const defaultProps = {
		buttonText: "Click Me",
		onClick: jest.fn(),
		colorClass: "bg-blue-500",
		disabled: false,
	};

	it("renders button correctly", () => {
		const { getByText } = render(<Button {...defaultProps} />);
		const buttonElement = getByText(defaultProps.buttonText);
		expect(buttonElement).toBeInTheDocument();
	});

	it("renders with disabled styles when disabled", () => {
		const disabledProps = {
			buttonText: "Click Me",
			onClick: jest.fn(),
			colorClass: "bg-blue-500",
			disabled: true,
		};
		const { getByText } = render(<Button {...disabledProps} />);
		const buttonElement = getByText(defaultProps.buttonText);
		expect(buttonElement).toHaveClass(
			"bg-gray-400 opacity-50 cursor-not-allowed"
		);
	});
});
