import {load, getJuridicalsData} from "../../redux/ducks/juridicals";
import {useDispatch, useSelector} from "react-redux";
import {FC, useEffect, useRef} from 'react';
import {Pagination, Row, Table} from "antd";
import CustomScroll from '../../components/сommon/CustomScroll';
import Scrollbars from "react-custom-scrollbars-2";
import NotFound from "../NotFound";
import routes from "../../routes";
import useRouterActions from "../../hooks/useRouterActions";


const JuridicalsPagination = () => {
    return (
        <Row justify="space-between" align='middle'>
            <div className="pagination-container mt-0">
                <Pagination
                    className="pagination"
                    size="small"
                    showSizeChanger
                    showQuickJumper
                    total={50}
                />
            </div>
        </Row>
    )
}

const JuridicalsTable: FC = () => {
    const dispatch = useDispatch();
    const juridicals = useSelector(getJuridicalsData);
    const scrollRef = useRef<Scrollbars | null>(null);
    const routerActions = useRouterActions();

    const demoColumns = [
        {
            key: 1,
            width: 160,
            dataIndex: 'entity',
            title: 'Юрлицо',
        },
        {
            key: 2,
            width: 160,
            dataIndex: 'generalDebt',
            title: 'Общий долг',
            render: (number: number) => (
                <div className="table__content table__content_end">
                    <div className="table__debt general">
                        <p>{number.toLocaleString(undefined, {minimumFractionDigits: 2})} ₽</p>
                    </div>
                </div>
            )
        },
        {
            key: 3,
            width: 160,
            dataIndex: 'overdueDebt',
            title: 'Просроченый долг',
            render: (number: number) => (
                <div className="table__content table__content_end">
                    <div className="table__debt overdue">
                        <p>{number.toLocaleString(undefined, {minimumFractionDigits: 2})} ₽</p>
                    </div>
                </div>
            )
        },
        {
            key: 4,
            width: 160,
            dataIndex: 'limit',
            title: 'Лимит',
            render: (number: number) => (
                <div className="table__content table__content_end">
                    <div className="table__debt">
                        <p>{number.toLocaleString(undefined, {minimumFractionDigits: 2})} ₽</p>
                    </div>
                </div>
            )
        },
    ];
    
	useEffect(() => {
		dispatch(load());
	}, [dispatch])

    if (!juridicals) {
        return <NotFound />
    }
    

    return (
        <>
            <h4 className="head-4">Дебиторская задолженность</h4>
            <CustomScroll
				ref={scrollRef}
                autoHeightMax="auto"
			>
                <Table
                    rowKey={(record) => record.id}
                    className="juridicals-table"
                    columns={demoColumns}
                    dataSource={juridicals}
                    pagination={false}
                    footer={JuridicalsPagination}
                    onRow={(record) => {
                        return {
                          onClick: () => {
                            routerActions.push(routes.juridicalsDetail.createUrl(`${record.id}`));
                          },
                        };
                    }}
                />
			</CustomScroll>
        </>
    )
}

export default JuridicalsTable;