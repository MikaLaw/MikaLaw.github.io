import {useActions} from "react-redux-actions-hook";
import {goBack, push, replace} from "connected-react-router";

const useRouterActions = () => {
	return useActions({push, replace, goBack});
}

export default useRouterActions;
