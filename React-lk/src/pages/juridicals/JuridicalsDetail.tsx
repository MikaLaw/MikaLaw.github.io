import {FC, useEffect} from 'react';
import NotFound from "../NotFound";
import {useParams} from 'react-router-dom';
import {useAsyncCallback} from "react-async-hook";
import restApi from "../../restApi";
import {ResponseStatus} from "../../interfaces/common";
import {message} from "antd";
import BackBtn from '../../components/сommon/BackBtn';
import routes from '../../routes';
import {useCommonActions} from "../../redux/ducks/common";

const JuridicalsDetail: FC = () => {  
    const {id} = useParams<Record<string, string>>();
    const commonActions = useCommonActions();
    const {execute, result} = useAsyncCallback(restApi.juridicalsDetail.bind(restApi), {
        onSuccess: async (res) => {
            if (res.status === ResponseStatus.INTERNAL_SERVER_ERROR
                || res.status === ResponseStatus.BAD_REQUEST
                || res.status === ResponseStatus.FORBIDDEN) {
                message.error(res.data.message);
            }
            res.data && commonActions.setBreadcrumbDetails([{
                id,
                name: 'Детальная запись',
            }]);
        }
    });

    useEffect(() => {
        id && execute(id);
    }, [id, execute]);

    const juridical = result?.status === ResponseStatus.OK ? result.data.filter(item => +item.id === +id)[0] : null;
   
    if (!juridical) {
        return <NotFound />
    }

    const {entity, generalDebt, overdueDebt, limit} = juridical
    return (   
        <div className='typography'>
            <BackBtn text="Назад" to={routes.main.path}/>
            <h4 className="head-4">Дебиторская задолженность</h4>
            <p>Юрлицо {entity}</p>
            <p>Общий долг {generalDebt}</p>
            <p> Просроченый долг {overdueDebt}</p>
            <p>Лимит {limit}</p>

        </div>
    )
}

export default JuridicalsDetail;