import { useQuery } from "react-query";
import "./App.css";
import { getBitcoinPrice } from "./Services/coinBaseService";
import Button from "./Components/Button";
import { useEffect, useState } from "react";
import { Bitcoin } from "./types";
import {
	createPlayer,
	getScore,
	updatePlayerScore,
} from "./Services/playerService";

import bitcoinMan from "./assets/manPlaycoin.png";
import ResultDisplayCard from "./Components/ResultDisplayCard";

const App: React.FC = () => {
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [latestBTCPrice, setLatestBTCPrice] = useState<number | undefined>(
		undefined
	);
	const [guess, setGuess] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [resolved, setResolved] = useState(true);
	const [guessResult, setGuessResult] = useState<string>();
	const [priceAtGuess, setPriceAtGuess] = useState<number>();
	const [, setError] = useState<Error>();
	const [playerId, setPlayerId] = useState<string | null>("");
	const [showScoreResult, setScoreResult] = useState(false);

	const { isLoading, isError } = useQuery<Bitcoin>(
		"bitcoinPrice",
		getBitcoinPrice,
		{
			refetchInterval: 60000,
			onSuccess: (data) => {
				if (data?.rates && data?.rates["EUR"]) {
					setLatestBTCPrice(data?.rates["EUR"]);
				}
			},
			onError: (error) => {
				console.error("Error fetching BTC price:", error);
			},
		}
	);

	useEffect(() => {
		const storedPlayerId = localStorage.getItem("playerId");
		if (!storedPlayerId) {
			console.log("No stored player ID found. Creating new player...");
			createPlayer();
		} else {
			setPlayerId(storedPlayerId);
			getScore(storedPlayerId).then((resp) => {
				setScore(resp.score);
			});
		}
	}, []);

	const handleClick = (selectedButton: string) => {
		if (!resolved || playerId === null) return;
		setGuess(selectedButton);
		setButtonDisabled(true);
		setResolved(false);
		const currentPriceAtGuess = latestBTCPrice;
		setPriceAtGuess(currentPriceAtGuess);
		setScoreResult(true);
		setTimeout(async () => {
			try {
				const latestPriceData = await getBitcoinPrice();
				const latestPrice = latestPriceData?.rates["EUR"];

				if (latestBTCPrice !== undefined && currentPriceAtGuess !== undefined) {
					setLatestBTCPrice(latestPrice);

					let newScore = score;

					if (
						(selectedButton === "UP" && latestPrice > currentPriceAtGuess) ||
						(selectedButton === "DOWN" && latestPrice < currentPriceAtGuess)
					) {
						setGuessResult("Correct Guess!");
						setScore(score + 1);
						newScore += 1;
					} else if (latestPrice === currentPriceAtGuess) {
						setGuessResult("Price remains the same.");
					} else {
						setGuessResult("Incorrect Guess!");
						setScore(score - 1);
						newScore -= 1;
					}

					await updatePlayerScore(playerId, newScore);
					setScore(newScore);
				}
			} catch (error) {
				setError(error as Error);
				console.error("Error fetching Bitcoin price:", error);
			} finally {
				setResolved(true); // Marks guess as resolved
				setButtonDisabled(false); // Enables button for next guess
				setScoreResult(true);
			}
		}, 6000);

		setGuessResult("");
	};

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error fetching data</div>;

	return (
		<div className=" min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex justify-center items-center">
			<img
				src={bitcoinMan}
				alt="Bitcoin"
				className="w-32 lg:w-64 xl:w-80 2xl:w-6/12 absolute bottom-0 right-0 lg:px-1"
			/>
			<div className="p-8 bg-white shadow-lg rounded-lg">
				<h1 className="text-3xl font-bold mb-2 text-amber-500">
					Bitcoin Price Prediction Game{" "}
				</h1>
				<div>
					<h2 className="text-lg font-semibold p-1 mr-2">Latest Price</h2>
					<h3 className="text-green-600 text-xl">{latestBTCPrice} €</h3>
				</div>

				<div className="flex justify-center mt-4 mb-4">
					<div className="flex max-w-md ">
						<div className="p-1">
							<Button
								onClick={handleClick}
								buttonText="UP"
								colorClass="bg-green-500 hover:bg-green-600"
								disabled={buttonDisabled}
							/>
						</div>
						<div className="p-1">
							<Button
								onClick={handleClick}
								buttonText="DOWN"
								colorClass="bg-red-500 hover:bg-red-600"
								disabled={buttonDisabled}
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center h-full">
					{showScoreResult && (
						<ResultDisplayCard
							score={score}
							latestBTCPrice={latestBTCPrice}
							priceAtGuess={priceAtGuess}
							guessResult={guessResult}
							guess={guess}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
