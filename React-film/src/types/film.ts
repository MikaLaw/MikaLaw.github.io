export type FilmShortInfo = {
	id: string;
	name: string;
	posterImage: string;
	genre: string;
	isFavorite: boolean;
}

export type FilmPromo = {
	id: string;
	name: string;
	posterImage: string;
	backgroundImage: string;
	genre: string;
	released: number;
	isFavorite: boolean;
}

export type Film = {
	id: string;
	name: string;
	posterImage: string;
	backgroundImage: string;
	backgroundColor: string;
	description: string;
	rating: number;
	scoresCount: number;
	director: string;
	starring: string[];
	runTime: number;
	genre: string;
	released: number;
	isFavorite: boolean;
}

export type Films = FilmShortInfo[];

export type FilmsToSingle = Film[];