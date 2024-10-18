import {FC, ReactNode} from 'react';
import {SliderArrowIcon} from "../../../components/Icons";
import {Button} from "antd";
import classNames from "classnames";

interface Props {
	name: ReactNode;
	nameClassName?: string;
	iconClassName?: string;
}

const GoodCardTransition: FC<Props> = (
	{
		name,
		nameClassName = '',
		iconClassName = '',
	}) => {
	return (
		<div className="good-card__transition">
			<p className={classNames("good-card__name", {
				[nameClassName]: !!nameClassName,
			})}>
				{name}
			</p>

			<Button
				className={classNames("btn-v2 good-card__go-forward", {
					[iconClassName]: !!iconClassName,
				})}
				icon={<SliderArrowIcon/>}
			/>
		</div>
	);
};

export default GoodCardTransition;
