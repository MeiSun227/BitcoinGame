import bitcoin from "../assets/bitcoinIcon.png";

interface ResultProps {
	score: number;
	latestBTCPrice: number | undefined;
	priceAtGuess: number | undefined;
	guess: string;
	guessResult: string | undefined;
}

const ResultDisplayCard: React.FC<ResultProps> = ({
	score,
	latestBTCPrice,
	priceAtGuess,
	guess,
	guessResult,
}) => {
	return (
		<div className="bg-gradient-to-br from-blue-200 to-white-300 p-10 rounded-lg shadow-lg">
			<img
				src={bitcoin}
				alt="Bitcoin"
				className="w-16 mt-5 mr-4 pr-5 lg:w-24 md:w-19 absolute"
			/>

			<h2 className="text-2xl font-bold mb-4">Game Result</h2>

			<div className="mt-6 mb-6">
				<p className="text-lg font-semibold">Score</p>
				<p className="text-xl text-blue-500 p-1">{score}</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<p className="text-lg font-semibold p-1 mr-2">Latest Price</p>
					<p className="text-green-600 text-lg">{latestBTCPrice} €</p>
				</div>
				<div>
					<p className="text-lg font-semibold p-1">Price at Guess Time</p>
					<p className="text-red-500 text-lg">{priceAtGuess} €</p>
				</div>
			</div>
			<div>
				<p className="text-lg font-semibold pt-3">Your Guess</p>
				<p className="text-semibold p-1">{guess}</p>
			</div>
			<div className="mt-2">
				<p className="text-lg font-semibold pt-3">Result</p>
				<p className="text-semibold p-1">{guessResult}</p>
			</div>
		</div>
	);
};

export default ResultDisplayCard;
