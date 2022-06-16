import React, { useState } from 'react';
import './App.css';
import { Button, Table, Row, Col, Select } from 'antd';
import CreateModal from '../CreateModal';

const { Option } = Select;

const data = [
  {
    id: 1,
    number: 1,
    status: 'Изготовление/согласование ж/д схемы',
    packages: 'fuel tank',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 2,
    number: 1.2,
    status: 'В пути (перегрузка на  другой транспорт)',
    packages: 'handrails',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 3,
    number: 2,
    status: 'В пути (перегрузка на другой транспорт)',
    packages: 'intake/fuel',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 4,
    number: 3,
    status: 'В пути',
    packages: 'air cleaner',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 5,
    number: 4,
    status: 'Доставлено',
    packages: 'fuel tank',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 6,
    number: 5,
    status: 'Доставлено',
    packages: 'fuel tank',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 7,
    number: 6,
    status: 'Доставлено',
    packages: 'fuel tank',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 8,
    number: 7,
    status: 'Доставлено',
    packages: 'fuel tank',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
  {
    id: 9,
    number: 8,
    status: 'Доставлено',
    packages: 'fuel tank',
    carriage: 'а111ке54',
    dateOfAcceptance: '12.03.20',
    shipmentDate: '12.03.20',
    departureDate: '12.03.20',
    location: 'Владивосток',
    kilometers: '50',
    rest: '5000',
  },
];

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number - b.number,
      width: 35,
      textWrap: 'word-break',
    },
    {
      title: '',
      dataIndex: '',
      key: 'id',
      render: () => {
        return (
          <div>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6822 8.41539C13.9894 4.84932 11.4305 3.05467 8.0001 3.05467C4.56796 3.05467 2.01082 4.84932 0.31796 8.41717C0.250059 8.56095 0.214844 8.71799 0.214844 8.87699C0.214844 9.036 0.250059 9.19304 0.31796 9.33682C2.01082 12.9029 4.56975 14.6975 8.0001 14.6975C11.4322 14.6975 13.9894 12.9029 15.6822 9.33503C15.8197 9.04574 15.8197 8.71003 15.6822 8.41539V8.41539ZM8.0001 13.4118C5.11975 13.4118 3.01082 11.9511 1.52332 8.8761C3.01082 5.8011 5.11975 4.34039 8.0001 4.34039C10.8805 4.34039 12.9894 5.8011 14.4769 8.8761C12.9912 11.9511 10.8822 13.4118 8.0001 13.4118ZM7.92867 5.73324C6.19296 5.73324 4.78582 7.14039 4.78582 8.8761C4.78582 10.6118 6.19296 12.019 7.92867 12.019C9.66439 12.019 11.0715 10.6118 11.0715 8.8761C11.0715 7.14039 9.66439 5.73324 7.92867 5.73324ZM7.92867 10.8761C6.82332 10.8761 5.92867 9.98146 5.92867 8.8761C5.92867 7.77074 6.82332 6.8761 7.92867 6.8761C9.03403 6.8761 9.92868 7.77074 9.92868 8.8761C9.92868 9.98146 9.03403 10.8761 7.92867 10.8761Z"
                fill="#8C8C8C"
              />
            </svg>
          </div>
        );
      },
      width: 36,
      textWrap: 'word-break',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 199,
      textWrap: 'word-break',
      filters: [
        {
          text: 'Изготовление/согласование ж/д схемы',
          value: 'Изготовление/согласование ж/д схемы',
        },
        {
          text: 'В пути (перегрузка на другой транспорт)',
          value: 'В пути (перегрузка на другой транспорт)',
        },
        {
          text: 'В пути',
          value: 'В пути',
        },
        {
          text: 'Доставлено',
          value: 'Доставлено',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Наименование грузовых мест',
      dataIndex: 'packages',
      key: 'packages',
      width: 151,
      textWrap: 'word-break',
      filters: [
        {
          text: 'fuel tank',
          value: 'fuel tank',
        },
        {
          text: 'handrails',
          value: 'handrails',
        },
        {
          text: 'intake/fuel',
          value: 'intake/fuel',
        },
        {
          text: 'air cleaner',
          value: 'air cleaner',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: '№ вагона, контейнера, авто',
      dataIndex: 'carriage',
      key: 'carriage',
      width: 104,
      textWrap: 'word-break',
      sorter: (a, b) => a.carriage - b.carriage,
    },
    {
      title: 'Дата приема груза к перевозке',
      dataIndex: 'dateOfAcceptance',
      key: 'dateOfAcceptance',
      width: 120,
      textWrap: 'word-break',
      sorter: (a, b) => a.dateOfAcceptance - b.dateOfAcceptance,
    },
    {
      title: 'Дата погрузки',
      dataIndex: 'shipmentDate',
      key: 'shipmentDate',
      width: 89,
      textWrap: 'word-break',
      sorter: (a, b) => a.shipmentDate - b.shipmentDate,
    },
    {
      title: 'Дата отправки',
      dataIndex: 'departureDate',
      key: 'departureDate',
      width: 87,
      textWrap: 'word-break',
      sorter: (a, b) => a.departureDate - b.departureDate,
    },
    {
      title: 'Текущее местоположение',
      dataIndex: 'location',
      key: 'location',
      width: 126,
      textWrap: 'word-break',
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Километраж за последние сутки',
      dataIndex: 'kilometers',
      key: 'kilometers',
      width: 120,
      textWrap: 'word-break',
      sorter: (a, b) => a.kilometers - b.kilometers,
    },
    {
      title: 'Остаток, км',
      dataIndex: 'rest',
      key: 'rest',
      width: 103,
      textWrap: 'word-break',
      sorter: (a, b) => a.rest - b.rest,
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="App">
      <CreateModal visible={visible} onClose={() => setVisible(false)} />
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1157 }}
        pagination={false}
      />
      <div className="App-controls">
        <Row justify="space-between">
          <Col>
            <Select
              className="App-select"
              placeholder="Действия"
              onChange={handleChange}
            >
              <Option value="1">Действие 1</Option>
              <Option value="2">Действие 2</Option>
              <Option value="3">Действие 3</Option>
            </Select>
            <Button className="App-button App-button_gray">Сохранить</Button>
          </Col>
          <Col>
            <Button className="App-button" onClick={() => setVisible(true)}>
              + Добавить ТС
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
