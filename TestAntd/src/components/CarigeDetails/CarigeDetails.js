import React from 'react';
import './CarigeDetails.css';
import {
  Modal,
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Select,
} from 'antd';
const { Option } = Select;

const CarigeDetails = ({ visible, onClose }) => {
  const formItemLayout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 11,
    },
  };

  const handleChange = () => {};

  return (
    <Modal
      className="CarigeDetails"
      title="Вагон, контейнер, авто"
      centered
      visible={visible}
      width={1104}
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
      <Row justify="space-between">
        <Col span={11}>
          <Form
            {...formItemLayout}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <h2>Водитель</h2>
            <Form.Item {...formItemLayout} label="Фамилия" name="lastName">
              <Input />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Имя" name="firstName">
              <Input />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Отчество" name="fatherName">
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Дата рождения"
              name="dateOfbirth"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Номер телефона" name="phone">
              <Input type="tel" />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Серия и номер паспорта"
              name="passportSeries"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Кем выдан"
              name="passportPlace"
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Дата выдачи"
              name="passportData"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Примечние" name="rest">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Col>
        <Col span={11}>
          <Form
            {...formItemLayout}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <h2>Транспортное средство</h2>
            <Form.Item {...formItemLayout} label="Транспорт" name="mashine">
              <Select defaultValue="1" onChange={handleChange}>
                <Option value="1">Автотранспорт</Option>
                <Option value="2">Транспорт 2</Option>
                <Option value="3">Транспорт 3</Option>
              </Select>
            </Form.Item>

            <Form.Item {...formItemLayout} label="Модель тягача" name="models">
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Гос. номер авто"
              name="numberMashine"
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Гос. номер прицепа"
              name="number"
            >
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default CarigeDetails;
