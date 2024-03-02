import axios from "axios";

const baseUrl = "https://api.coinbase.com/v2/exchange-rates?currency=BTC";

export const getBitcoinPrice = async () => {
	try {
		const bitcoin = await axios.get(baseUrl).then((res) => res.data.data);
		return bitcoin;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Handle Axios errors
			console.error("Axios Error:", error.message);
		} else {
			// Handle other errors
			console.error("Error:", error);
		}
	}
};
