import React, { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import './CreateModal.css';
import CarigeDetails from '../CarigeDetails';
import { Modal, Button, Form, Input } from 'antd';

const CreateModal = ({ visible, onClose }) => {
  const [showCarigeDetails, setShowCarigeDetails] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 11,
      offset: 1,
    },
  };

  return (
    <>
      <CarigeDetails
        visible={showCarigeDetails}
        onClose={() => setShowCarigeDetails(false)}
      />
      <Modal
        className="CreateModal"
        title="2. fuel tank"
        centered
        visible={visible}
        width={627}
        onOk={() => onClose()}
        onCancel={() => onClose()}
        bodyStyle={{ overflow: 'auto' }}
        footer={[
          <Button className="App-button" key="back" onClick={() => onClose()}>
            Закрыть
          </Button>,
          <Button className="App-button" key="submit" onClick={() => onClose()}>
            Сохранить
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            {...formItemLayout}
            label="Статус"
            name="status"
            rules={[{ message: 'Введите статус!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Наименование грузовых мест"
            name="packages"
            rules={[{ message: 'Введите наименование грузовых мест!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Тип ТС"
            name="type"
            rules={[{ message: 'Введите тип ТС!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="№ вагона, контейнера, авто"
            name="carriage"
            rules={[{ message: 'Выберете № вагона, контейнера, авто!' }]}
          >
            <Input
              addonAfter={
                <RightOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowCarigeDetails(true)}
                />
              }
            />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Дата приема груза к перевозке"
            name="dateOfAcceptance"
            rules={[{ message: 'Введите дату приема груза к перевозке!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Дата погрузки"
            name="shipmentDate"
            rules={[{ message: 'Введите дату погрузки!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Дата отправки"
            name="departureDate"
            rules={[{ message: 'Введите дату отправки!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Текущее местоположение"
            name="location"
            rules={[{ message: 'Введите текущее местоположение!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Километраж за последние сутки"
            name="kilometers"
            rules={[{ message: 'Введите километраж за последние сутки!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Остаток до следующего пункта, км"
            name="rest"
            rules={[{ message: 'Введите oстаток до следующего пункта!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Дата прибытия до следующего пункта"
            name="kilometers"
            rules={[{ message: 'Введите дату прибытия до следующего пункта!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Остаток общий, км"
            name="rest"
            rules={[{ message: 'Введите остаток общий!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Дата прибытия в конечный пункт"
            name="rest"
            rules={[{ message: 'Введите дату прибытия в конечный пункт!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
