import {Button} from "antd";
import React, {FC} from "react";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";

const ErrorBoundaryFallback: FC<FallbackProps> = ({error}) => {
	if(!(/#130/.test(error?.message))) return (
		<div className="new-version-page">
			<h3 className="head-3 new-version-page__title">Что-то пошло не так.</h3>
			<p className="text-2 new-version-page__subtitle" style={{width: 600}}>{error?.message}</p>
			<div className="new-version-page__img"/>
		</div>
	);

	return (
		<div className="new-version-page">
			<h3 className="head-3 new-version-page__title">Вышла новая версия</h3>
			<p className="text-2 new-version-page__subtitle">Для правильной работы необходимо обновить сервис</p>
			<Button
				type="primary"
				className="new-version-page__btn"
				onClick={() => {
					window.location.reload();
				}}
			>
				Обновить
			</Button>
			<div className="new-version-page__img"/>
		</div>
	);
};

const ErrorBoundaryRoot = (props: any) => (
	<ErrorBoundary
		fallbackRender={props => <ErrorBoundaryFallback {...props} />}
	>
		{props?.children}
	</ErrorBoundary>
);

export default ErrorBoundaryRoot;
