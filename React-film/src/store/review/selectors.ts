import {State} from '../../types/state.ts';
import {ReviewShort} from '../../types/review.ts';
import {Namespace} from '../../consts.ts';

export const getReviews = (state: State): ReviewShort => state[Namespace.Review].reviews;
