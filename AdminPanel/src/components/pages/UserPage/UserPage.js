import React, { useEffect, useState } from "react";
import "./UserPage.css";
import { connect } from "react-redux";
import withApiService from "../../HOC";
import { compose, getFormattedDate, getUrlParam } from "../../helpers";
import { ReactComponent as EditIcon } from "../../../assets/images/editIcon.svg";
import EditUserForm from "./EditUserForm";
import {
  selectUsers,
  selectUsersCount,
  selectUsersIsLoading,
  selectUsersError,
  selectUsersFilters,
} from "../../../redux/reducers/users";
import {
  fetchUsersRequest,
  updateUsersRequest,
  changeUsersFilter,
} from "../../../redux/actions/users";
import { Table, Input, DatePicker, Modal, message } from "antd";
const { Search } = Input;

const UserPage = ({
  apiService,
  users,
  count,
  userFilters,
  isLoading,
  error,
  fetchUsersRequest,
  updateUsersRequest,
  changeUsersFilter,
}) => {
  useEffect(() => {
    if (error) {
      message.error(error);
    }

    fetchUsersRequest({
      ...userFilters,
      offset:
        (getUrlParam("page") ? getUrlParam("page") - 1 : 0) * userFilters.limit,
      apiService,
    });
  }, [apiService, fetchUsersRequest, userFilters, error]);

  const [showAddOrEditModal, setShowAddOrEditModal] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState({});

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Дата регистрации",
      dataIndex: "regDate",
      render: (rowData) => {
        return getFormattedDate(rowData);
      },
    },
    {
      title: "Имя",
      dataIndex: "firstName",
    },
    {
      title: "Фамилия",
      dataIndex: "lastName",
    },
    {
      title: "Возраст",
      dataIndex: "age",
      sorter: true,
    },
    {
      title: "Пол",
      dataIndex: "sex",
      filters: [
        { text: "Мужской", value: "male" },
        { text: "Женский", value: "female" },
      ],
      render: (rowData) => {
        return rowData === "male"
          ? "Мужской"
          : "female"
          ? "Женский"
          : "Не опредено";
      },
    },
    {
      title: "Страна",
      dataIndex: "country",
    },
    {
      title: "Число забегов",
      dataIndex: "numOfRaces",
    },
    {
      title: "",
      dataIndex: "",
      render: (rowData) => {
        return (
          <EditIcon
            style={{ fill: "#002534", cursor: "pointer" }}
            onClick={() => {
              setSelectedForEdit(rowData);
              setShowAddOrEditModal(true);
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="UserPage">
      <Modal
        title={`Id: ${selectedForEdit.id}`}
        centered
        visible={showAddOrEditModal}
        onOk={() =>
          updateUsersRequest({
            apiService,
            userId: selectedForEdit.id,
            cb: (text) => {
              message.success(text);
              setTimeout(() => setShowAddOrEditModal(false), 2500);
            },
            filters: userFilters,
          })
        }
        onCancel={() => setShowAddOrEditModal(false)}
        okText="Сохранить"
        cancelText="Отменить"
      >
        <EditUserForm
          key={"EditOrCreateHeroForm" + selectedForEdit}
          usersData={selectedForEdit}
        />
      </Modal>
      <div className="controllers">
        <div className="controllers__leftSide">
          <Search
            allowClear={true}
            placeholder="ID"
            onSearch={(value) => {
              changeUsersFilter({ ...userFilters, offset: 0, id: value });
            }}
            onPressEnter={(e) => {
              changeUsersFilter({
                ...userFilters,
                offset: 0,
                id: e.target.value,
              });
            }}
            style={{ width: 100 }}
          />
          <DatePicker
            className="ml-2"
            placeholder="Выберите дату"
            onChange={(value) => {
              changeUsersFilter({
                ...userFilters,
                offset: 0,
                regDate: value ? value._d.toLocaleDateString() : value,
              });
            }}
          />
        </div>
        <div className="controllers__rghtSide"></div>
      </div>
      <Table
        onChange={(pagination, filters, sorter) => {
          let changedFilters = {
            offset: (pagination.current - 1) * pagination.pageSize,
          };

          if (
            (filters.sex && filters.sex.length !== 0) ||
            filters.sex === null
          ) {
            changedFilters.sex = filters.sex;
          }

          if (sorter.order && sorter.field) {
            changedFilters.order = sorter.order === "descend" ? "desc" : "asc";
            changedFilters.orderBy = sorter.field;
            changedFilters.offset = 0;
          } else {
            changedFilters.order = null;
            changedFilters.orderBy = null;
          }
          changeUsersFilter({ ...userFilters, ...changedFilters });
        }}
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={users}
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
  users: selectUsers(state),
  count: selectUsersCount(state),
  isLoading: selectUsersIsLoading(state),
  error: selectUsersError(state),
  userFilters: selectUsersFilters(state),
});
const mapDispatchToProps = {
  fetchUsersRequest,
  changeUsersFilter,
  updateUsersRequest,
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(UserPage);
