import React, {ComponentProps, FC} from 'react';
import Scrollbars from "react-custom-scrollbars-2";

interface Props {
	backgroundColor?: string;
	zIndexVerticalThumb?: number;
	isModal?: boolean;
}

export default React.forwardRef<Scrollbars, ComponentProps<typeof Scrollbars> & Props>((
	{
		children,
		backgroundColor,
		zIndexVerticalThumb,
		isModal,
		...rest
	},
	ref
) => {

	const brandColor = (() => {
		if(isModal)
			return "#D1E3DF";

		return "#D1E3DF";
	})();

	return (
		<Scrollbars
			className='scrollbar-container'
			ref={ref}
			renderThumbHorizontal={({style, ...rest}) => (
				<div
					style={{
						...style,
						cursor: 'pointer',
						borderRadius: 'inherit',
						backgroundColor: backgroundColor ?? brandColor
					}}
					{...rest}
				/>
			)}
			renderThumbVertical={({style, ...rest}) => (
				<div
					style={{
						...style,
						cursor: 'pointer',
						borderRadius: 'inherit',
						backgroundColor: backgroundColor ?? brandColor,
						zIndex: zIndexVerticalThumb
					}}
					{...rest}
				/>
			)}
			autoHide
			autoHeight
			autoHeightMin={0}
			{...rest}
		>
			{children}
		</Scrollbars>
	)
})
