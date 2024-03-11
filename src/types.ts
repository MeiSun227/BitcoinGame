export interface Bitcoin {
	currency: string;
	rates: Rates;
}

export interface Rates {
	[key: string]: number | undefined;
}
