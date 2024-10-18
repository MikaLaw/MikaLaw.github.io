import {FC} from 'react';
import Header from '../components/header/Header';
import CustomScroll from "../components/сommon/CustomScroll";

const EntryLayout: FC = ({children}) => {
	return (
		<>
			<Header isLoggedIn={false}/>
			<CustomScroll
				renderView={(props) => {
					return (
						<div
							style={{
								...props.style,
								overflow: "auto scroll",
								minHeight: 'auto',
								flex: 'auto',
								display: 'flex',
								flexDirection: "column",
							}}
						/>
					)
				}}
				autoHeightMax={"calc(100vh - 58px)"}
				style={{
					display: 'flex',
					flexDirection: "column",
					flex: "auto"
				}}
				zIndexVerticalThumb={2}
			>
				<div className='entry-layout'>
					<div className="entry-layout__wrap">
						{children}
						<span className="entry-layout__dot entry-layout__dot_1"/>
						<span className="entry-layout__dot entry-layout__dot_2"/>
						<span className="entry-layout__dot entry-layout__dot_3"/>
						<span className="entry-layout__dot entry-layout__dot_4 green"/>
						<span className="entry-layout__dot entry-layout__dot_5 blue"/>
						<span className="entry-layout__dot entry-layout__dot_6 blue"/>
						<span className="entry-layout__capsule entry-layout__capsule_1"/>
						<span className="entry-layout__capsule entry-layout__capsule_2"/>
						<span className="entry-layout__capsule entry-layout__capsule_3"/>
						<span className="entry-layout__tablet"/>
					</div>
				</div>
			</CustomScroll>
		</>
	);
};

export default EntryLayout;
