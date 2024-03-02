import { useQuery } from "react-query";
import "./App.css";
import { getBitcoinPrice } from "./Services/coinBaseService";
import Button from "./Components/Button";
import { useState } from "react";

const App: React.FC = () => {
	const { data, isLoading, isError } = useQuery({ queryFn: getBitcoinPrice });
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [option, setOption] = useState<string>("");

	/*useEffect(() => {
		getBitcoinPrice().then((priceResponse) => {
			setBitcoinPrice(priceResponse.data);
		});
	}, []);*/

	const bitCoinRate = data?.rates["EUR"];
	const coinName = data?.currency;

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error fetching data</div>;

	const handleClick = (selectedButton: string) => {
		console.log("button click");
		setOption(selectedButton);
		setButtonDisabled(true);
		setTimeout(() => {
			setButtonDisabled(false);
		}, 60000);
	};

	return (
		<div>
			<h1>Currency name</h1>
			<p>{coinName}</p>
			<p className="text-xl"> Current price: {bitCoinRate} €</p>
			<div className="flex justify-center px-2 py-2">
				<div className="p-3">
					<Button
						onClick={handleClick}
						buttonText="UP"
						colorClass="bg-green-500"
						disabled={buttonDisabled}
					/>
				</div>
				<div className="p-3">
					<Button
						onClick={handleClick}
						buttonText="DOWN"
						colorClass="bg-red-500"
						disabled={buttonDisabled}
					/>
				</div>
				{option && <p>You selected: {option}</p>}
			</div>
		</div>
	);
};

export default App;
