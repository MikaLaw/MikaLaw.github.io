import React, { useEffect } from "react";
import "./TrafficPage.css";
import { connect } from "react-redux";
import withApiService from "../../HOC";
import { compose, getUrlParam } from "../../helpers";
import { Link } from "react-router-dom";
import mapLocation from "../../../assets/images/mapLocation.png";
import {
  selectTraffics,
  selectTrafficsCount,
  selectTrafficsIsLoading,
  selectTrafficsError,
  selectTrafficsFilters,
} from "../../../redux/reducers/traffics";
import {
  fetchTrafficsRequest,
  changeTrafficsFilter,
} from "../../../redux/actions/traffics";
import { Table, Input, message } from "antd";
const { Search } = Input;

const TrafficPage = ({
  apiService,
  traffics,
  count,
  trafficsFilters,
  isLoading,
  error,
  fetchTrafficsRequest,
  changeTrafficsFilter,
  match,
}) => {
  useEffect(() => {
    if (error) {
      message.error(error);
    }

    fetchTrafficsRequest({
      ...trafficsFilters,
      offset:
        (getUrlParam("page") ? getUrlParam("page") - 1 : 0) *
        trafficsFilters.limit,
      apiService,
    });
  }, [apiService, fetchTrafficsRequest, trafficsFilters, error]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Изображение маршрута",
      dataIndex: "",
      render: (rowData) => {
        return (
          <Link to={`${match.url}/${rowData.id}`}>
            <div className="TrafficPage__img">
              <img src={mapLocation} alt="pic" />
            </div>
          </Link>
        );
      },
    },
    {
      title: "Дистанция, м",
      dataIndex: "distance",
      render: (text) => {
        return Math.ceil(text);
      },
    },
    {
      title: "Подьем, м",
      dataIndex: "elevation",
      render: (text) => {
        return Math.ceil(text);
      },
    },
    {
      title: "Тип",
      dataIndex: "type",
      render: (text) => {
        if (text === 0) {
          return <span className="text__type">Спринт</span>;
        }
        return <span className="text__type">Круг</span>;
      },
    },
    {
      title: "Владелец маршрута",
      dataIndex: "creator",
    },
    {
      title: "Количество жалоб на маршрут",
      dataIndex: "reportsCount",
    },
    {
      title: "Статус",
      dataIndex: "isBlocked",
      render: (text) => {
        if (text === true) {
          return <span className="text__status">Заблокирован</span>;
        }
        return (
          <span className="text__status text__status--active">Активен</span>
        );
      },
      filters: [
        { text: "Заблокирован", value: "true" },
        { text: "Активен", value: "false" },
      ],
    },
  ];
  return (
    <div className="TrafficPage">
      <div className="controllers">
        <div className="controllers__leftSide">
          <Search
            allowClear={true}
            placeholder="ID"
            onSearch={(value) => {
              changeTrafficsFilter({
                ...trafficsFilters,
                offset: 0,
                id: value,
              });
            }}
            onPressEnter={(e) => {
              changeTrafficsFilter({
                ...trafficsFilters,
                offset: 0,
                id: e.target.value,
              });
            }}
            style={{ width: 100 }}
          />
        </div>
        <div className="controllers__rghtSide"></div>
      </div>
      <Table
        onChange={(pagination, filters) => {
          let changedFilters = {
            offset: (pagination.current - 1) * pagination.pageSize,
          };

          if (
            (filters.isBlocked && filters.isBlocked.length !== 0) ||
            filters.isBlocked === null
          ) {
            changedFilters.isBlocked = filters.isBlocked;
          }

          changeTrafficsFilter({ ...trafficsFilters, ...changedFilters });
        }}
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={traffics}
        scroll={{ x: "100vw" }}
        pagination={{
          showSizeChanger: false,
          defaultCurrent: 1,
          total: count,
          pageSize: 10,
          current: getUrlParam("page") ? getUrlParam("page") : 1,
          onChange: (page) => {
            window.history.pushState(null, null, `?page=${page}`);
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  traffics: selectTraffics(state),
  count: selectTrafficsCount(state),
  isLoading: selectTrafficsIsLoading(state),
  error: selectTrafficsError(state),
  trafficsFilters: selectTrafficsFilters(state),
});
const mapDispatchToProps = {
  fetchTrafficsRequest,
  changeTrafficsFilter,
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TrafficPage);
