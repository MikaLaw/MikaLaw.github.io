import {Form, Input, Tabs} from "antd";
import {useSelector} from "react-redux";
import { getProfile} from "../../redux/ducks/profile";
import {useEffect, useState} from "react";
import {useAsync} from "react-async-hook";
import restApi from "../../restApi";
import {ResponseStatus} from "../../interfaces/common";
import Contact from "./components/Contact";
import classNames from "classnames";
import {useActions} from "react-redux-actions-hook";
import {getLocation, push} from "connected-react-router";
import {parse} from "qs";
import routes from "../../routes";
import {getFio} from "../../tools/utils";

const Profile = () => {
	const profile = useSelector(getProfile);
	const location = useSelector(getLocation);

	const {result} = useAsync(restApi.contactsAllManagers.bind(restApi), []);

	const [activeKey, setActiveKey] = useState<string>("data");

	const [form] = Form.useForm();

	const actions = useActions({push});
	const params = parse(location.search.substr(1, location.search.length));

	useEffect(() => {
		params.tab ? setActiveKey(params.tab as string):setActiveKey("data")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	useEffect(() => {
		if(profile)
		{
			form.setFieldsValue({
				name: getFio(lastName, name, secondName),
				email: email,
				phone: phone,	
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	if(!profile)
	{
		return null;
	}

	const {email, phone, lastName, secondName, name} = profile;

	const onChange = (key: string) => {
		setActiveKey(key);
		actions.push(routes.profile.setQueryTab(key))
	};

	return (
		<div className="profile">
			<h4 className="head-4 profile__title">Профиль</h4>
			<Tabs className="custom-tabs profile__tabs" onChange={onChange} activeKey={activeKey}>
				<Tabs.TabPane tab="Персональные данные" key="data">
					<Form
						className={classNames("profile__form", {"profile__form_owner": true})}
						layout="vertical"
						form={form}
					>
						<p className="text-4 mt-15 mb-15 profile__form-text">Общая информация</p>
						<div className="profile__form-wrap">
							<Form.Item
								label='ФИО'
								name="name"								
							>
								<Input
									className={classNames({grey: true})}
								/>
							</Form.Item>

							<Form.Item
								label='E-mail'
								name="email"
							>
								<Input
									className={classNames({grey: true})}
								/>
							</Form.Item>

							<Form.Item
								label='Телефон'
								name="phone"
							>
								<Input
									className={classNames({grey: true})}
								/>
							</Form.Item>
						</div>
					</Form>
				</Tabs.TabPane>

				<Tabs.TabPane tab="Контакты менеджеров" key="contacts">
					<div className="contact-block">
						<h4 className="head-4 contact-block__title">Контакты менеджеров</h4>
						<p className="text-2 contact-block__subtitle">Если у вас есть вопросы по сервису, пожалуйста, обратитесь к вашему менеджеру.</p>

						{result?.status === ResponseStatus.OK && (
							<div className="contact-block__container">
								{result.data.map((item, index) => (
									<Contact {...item} key={index}/>
								))}
							</div>
						)}
					</div>
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
};

export default Profile;
