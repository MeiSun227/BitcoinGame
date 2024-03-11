import axios from "axios";

interface UpdateScoreResponse {
	message: string;
	newScore: number;
}

interface CreatePlayerResponse {
	playerId: string;
}

interface Player {
	playerId: string;
	score: number;
}
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

export const updatePlayerScore = async (
	playerId: string,
	newScore: number
): Promise<UpdateScoreResponse> => {
	try {
		const response = await axios.put(`${baseUrl}/player/${playerId}`, {
			score: newScore,
		});
		return response.data as UpdateScoreResponse;
	} catch (error) {
		throw new Error("Error updating player score");
	}
};

export const createPlayer = async (): Promise<CreatePlayerResponse> => {
	try {
		const response = await axios.post(`${baseUrl}/player`);
		const newPlayerId = response.data.playerId;

		if (newPlayerId) {
			localStorage.setItem("playerId", newPlayerId);
			return { playerId: newPlayerId };
		} else {
			throw new Error("Failed to retrieve player ID from response data.");
		}
	} catch (error) {
		throw new Error("Error retrieving score: " + (error as Error).message);
	}
};

export const getScore = async (playerId: string): Promise<Player> => {
	try {
		const response = await axios.get(`${baseUrl}/player/${playerId}`);
		const score = parseInt(response.data.score, 10);
		return { ...response.data, score };
	} catch (error) {
		throw new Error("Error retrieving score: " + (error as Error).message);
	}
};
