import axios from "axios";
import MockAdapter from "axios-mock-adapter";

async function getScore(playerId: string) {
	try {
		const response = await axios.get(
			`http://localhost:3001/player/${playerId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching player score:", error);
		throw error;
	}
}

describe("getScore", () => {
	let mockResponse: MockAdapter;
	beforeEach(() => {
		// Initialize mockResponse before each test
		mockResponse = new MockAdapter(axios);
	});

	afterEach(() => {
		// Reset the axios mock after each test
		mockResponse.reset();
	});

	it("fetches player score successfully", async () => {
		const baseUrl = "http://localhost:3001";
		const playerId = "1234";
		const mockedResponse = {
			playerId: "1234",
			score: 20,
		};
		mockResponse
			.onGet(`${baseUrl}/player/${playerId}`)
			.reply(200, mockedResponse);

		const result = await getScore(playerId);

		expect(result).toEqual({ playerId: "1234", score: 20 });
	});
});
