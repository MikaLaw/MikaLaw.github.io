import 'react-redux';
import {RootState} from "../common";

declare module "react-redux" {
	export interface DefaultRootState extends RootState {}
}
