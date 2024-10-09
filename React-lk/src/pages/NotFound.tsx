import {Button, Result} from 'antd';
import React, { FC } from 'react';
import {useActions} from "react-redux-actions-hook";
import {push} from "connected-react-router";
import classNames from "classnames";

interface Props {
	className?: string;
}

const NotFound: FC<Props> = ({className}) => {
	const actions = useActions({push});

	return (
		<Result
			className={classNames('result', className)}
			icon={null}
			subTitle="Страницы, на которую вы перешли, не существует"
			extra={<Button type="primary" onClick={() => actions.push('/')}>На Главную</Button>}
		/>
	);
};

export default NotFound;