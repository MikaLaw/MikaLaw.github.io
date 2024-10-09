import EntryForm, {EntryFormProps as InjectedProps} from "./EntryForm";
import {PropsWithChildren, ReactNode} from "react";

interface Props {
	blockClass: string,
	title: string;
	subtitle?: ReactNode;
	text?: ReactNode;
}

const EntryBlock = <Values extends object, >(
	{
		blockClass,
		title,
		subtitle,
		text,
		...rest
	}: PropsWithChildren<Props & InjectedProps<Values>>
) => {
	return (
		<div className={`entry-block ${blockClass}`}>
			<div className="entry-block__top">
				<h2 className="entry-block__title head-2">{title}</h2>
                {subtitle && <div className="entry-block__subtitle text-2">{subtitle}</div>}
                {text && <div className="entry-block__text text-3">{text}</div>}
			</div>
			<div className="entry-block__form">
				<EntryForm {...rest}/>
			</div>
		</div>
	)
}

export default EntryBlock;
