import {FC, FormEvent, useState} from 'react';
import {fetchAddReviewAction} from '../../store/api-action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm} from '../../store/films/selectors';
import {toast} from 'react-toastify';
import { getUser} from '../../store/user/selectors';

const AddReview:FC = () => {
	const [text, setText] = useState<string>('');
	const [rating, setRating] = useState<number>(0);
	const [disable, setDisable] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const film = useAppSelector(getFilm);
	const user = useAppSelector(getUser);
	const userName = user?.name ?? 'Anon';

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		if (text.length < 50 || text.length > 400) {
			toast.warn('Длина сообщения должна быть больше 50 и меньше 400 символов');
			return;
		}
		if (rating === 0) {
			toast.warn('Выберите рейтинг');
			return;
		}
		const date = new Date();
		setDisable(true);
		dispatch(fetchAddReviewAction({comment: text, filmId: film?.id, rating: rating, user: userName, date: date}));
		setDisable(false);
	};

	return (
		<div className="add-review">
			<form action="" className="add-review__form" onSubmit={handleSubmit}>
				<div className="rating">
					<div className="rating__stars">
						{Array.from({length: 10}).map((_, index) => (
							<>
								<input disabled={disable} className="rating__input" id={`star-${10 - index}`} type="radio" name="rating" value={10 - rating} checked={rating === (10 - index)} onChange={() => setRating(10 - index)} />
								<label className="rating__label" htmlFor={`star-${10 - index}`}>Rating {10 - index}</label>
							</>
						))}
					</div>
				</div>
				<div className="add-review__text">
					<textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Отзыв" disabled={disable} value={text} onChange={(evt) => setText(evt.target.value)}>
					</textarea>
					<div className="add-review__submit">
						<button className="add-review__btn" type="submit" disabled={disable}>Запостить</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddReview;

{/* <div className="rating__star" key={Math.random()}>
<input disabled={disable} className="rating__input" id={`star-${10 - index}`} type="radio" name="rating" value={10 - rating} checked={rating === (10 - index)} onChange={() => setRating(10 - index)} />
<label className="rating__label" htmlFor={`star-${10 - index}`}>Rating {10 - index}</label>
</div> */}
