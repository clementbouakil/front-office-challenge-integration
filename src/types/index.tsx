export type Event = {
	id: string;
	date: string;
	sportId: string;
	sportTitle: string;
	pictureUrl: string;
};

export type Medal = {
	key: string;
	country: string;
	medals: {
		gold: number;
		silver: number;
		bronze: number;
	};
};
