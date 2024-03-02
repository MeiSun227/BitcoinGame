import { useQuery } from "react-query";
import "./App.css";
import { getBitcoinPrice } from "./Services/coinBaseService";
import Button from "./Components/Button";

const App: React.FC = () => {
	const { data, isLoading, isError } = useQuery({ queryFn: getBitcoinPrice });

	/*useEffect(() => {
		getBitcoinPrice().then((priceResponse) => {
			setBitcoinPrice(priceResponse.data);
		});
	}, []);*/

	const bitCoinRate = data?.rates["EUR"];
	const coinName = data?.currency;

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error fetching data</div>;

	const handleClick = () => {
		console.log("meow");
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
					/>
				</div>
				<div className="p-3">
					<Button
						onClick={handleClick}
						buttonText="DOWN"
						colorClass="bg-red-500"
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
