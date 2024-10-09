export type Review = {
	id: string;
	date: string;
	user: string;
	comment: string;
	rating: number;
}

export type ReviewShort = {
	filmId: string;
	comments: Review[]
}


export type Reviews = ReviewShort[];

