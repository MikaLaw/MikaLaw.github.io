import {appName} from "../config";

export const toModuleAsyncTypes = <ModuleName extends string, Name extends string>(moduleName: ModuleName, name: Name) => {
	const fReq = <const>`${name}_REQUEST`;
	const fErr = <const>`${name}_ERROR`;
	const fSuccess = <const>`${name}_SUCCESS`;

	return ({
		[fReq]: `${appName}/${moduleName}/${name}_REQUEST`,
		[fErr]: `${appName}/${moduleName}/${name}_ERROR`,
		[fSuccess]: `${appName}/${moduleName}/${name}_SUCCESS`,
	}) as Record<typeof fReq | typeof fErr | typeof fSuccess, string>
}