import {createBrowserHistory} from 'history';
import 'setimmediate';

const history = createBrowserHistory();

if(typeof window !== 'undefined')
{
	history.listen((location, action) => {
		// Для стрелочек вперед назад отключаем эту функцию, чтобы сохранить позицию скролла

		if(!['REPLACE', 'POP'].includes(action))
		{
			setImmediate(() => window.scrollTo(0, 0));
		}
	});
}

export default history;
