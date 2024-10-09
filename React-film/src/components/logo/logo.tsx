import { FC } from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';

const Logo:FC = () => (
	<div className="logo">
		<Link to={AppRoute.Root} className="logo__link">
			<span className="logo__letter logo__letter--1">W</span>
			<span className="logo__letter logo__letter--2">T</span>
			<span className="logo__letter logo__letter--3">W</span>
		</Link>
	</div>
);

export default Logo;
