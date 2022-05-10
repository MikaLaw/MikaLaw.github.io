import React, { useState } from "react";
import "./EditUserForm.css";
import Placeholder from "../../../../assets/images/user.svg";
import { getFormattedDate } from "../../../helpers";
import { Row, Col, Select } from "antd";
const { Option } = Select;
const EditUserForm = ({ usersData = {} }) => {
  const {
    age,
    country,
    city,
    state,
    timezone,
    firstName,
    sex,
    numOfRaces,
    availableRaces,
    regDate,
    lastName,
    avatar,
    freeRacers,
  } = usersData;
  const [count, setCount] = useState(freeRacers);

  return (
    <div className="EditUserForm">
      <Row>
        <Col span={12}>
          <div className="info-avatar">
            <img src={avatar ? avatar.url : Placeholder} alt="" />
          </div>
        </Col>
        <Col span={12}>
          <div className="info-cell">
            Имя:<span>{firstName + " " + lastName}</span>
          </div>
          <div className="info-cell">
            Местонахождение:
            <span style={{ lineHeight: "24px" }}>
              {country ? country + ", " : ""}
              {state ? state + ", " : ""}
              {city}
            </span>
          </div>
          <div className="info-cell">
            Дата регистрации:<span>{getFormattedDate(regDate)}</span>
          </div>
          <div className="info-cell">
            Возраст:<span>{age}</span>
          </div>
          <div className="info-cell">
            Пол:<span>{sex}</span>
          </div>
          <div className="info-cell">
            Часовой пояс:<span>{timezone}</span>
          </div>
          <div className="info-cell">
            Число забегов:<span>{numOfRaces}</span>
          </div>
          <div className="info-cell">
            Оплаченные забеги:<span>{availableRaces}</span>
          </div>
          <div className="info-cell">
            <div className="form-block">
              <label className="inputGroup-label">Бесплатные забеги: </label>
              <Select
                className="Select-input"
                style={{ width: "100%", marginTop: "10px" }}
                placeholder={"Free race"}
                value={count}
                onSelect={(value) => {
                  setCount(value);
                }}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
              </Select>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EditUserForm;
