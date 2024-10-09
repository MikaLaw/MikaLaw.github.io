import JuridicalsTable from "../juridicals/JuridicalsTable";
import {Helmet} from "react-helmet";
import Banners from "./components/Banners";

const Main = () => {
	return (
		<>
			<Helmet
				meta={[
					{name: 'description', content: 'Единый кабинет'}
				]}
			/>
			<div className="main">
				<div className="main__header">
					<Banners />
				</div>
				<div className="table-container juridical-table">
					<div>
						<JuridicalsTable/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Main;
