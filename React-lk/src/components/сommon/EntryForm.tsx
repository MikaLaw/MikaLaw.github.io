import React, {PropsWithChildren, ReactNode} from "react";
import {Alert, Button, Form, FormInstance, FormProps, Input, Tooltip} from 'antd';

import {EyeCrossIcon, EyeIcon} from '../Icons';
import {ConstructorField, ConstructorFieldType} from "../../interfaces/auth/form";

export interface EntryFormProps<Values> {
	fields: ConstructorField<Values>[];
	form?: FormInstance<Values>;
	onFinish?: FormProps<Values>['onFinish'];
	onFinishFailed?: FormProps<Values>['onFinishFailed'];
	formProps?: FormProps<Values>;
	formHeader?: ReactNode;
}

const EntryForm = <Values extends object, >(
	{
		fields,
		form,
		onFinish,
		onFinishFailed,
		formProps,
		formHeader
	}: PropsWithChildren<EntryFormProps<Values>>) => {
	return (
		<Form
			form={form}
			className='form'
			layout='vertical'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			{...formProps}
		>
			{() => (
				<>
					{formHeader && formHeader}
					{fields.map(({key, field, innerField, ...rest}) => (
						<Form.Item key={key} className='large' {...field}>
							{rest.type === ConstructorFieldType.INPUT && (
								<>
									<Form.Item noStyle {...innerField}>
										<Input
											placeholder={rest.input.placeholder}
											onChange={rest.input.onChange}
										/>
									</Form.Item>
									{rest.input.passwordPrompt && (
										<p className='text-3 form__prompt'>{rest.input.passwordPrompt}</p>
									)}
								</>
							)}
							{rest.type === ConstructorFieldType.PASSWORD && (
								<>
									<Form.Item noStyle {...innerField}>
										<Input.Password
											placeholder={rest.password.placeholder}
											onChange={rest.password.onChange}
											iconRender={(visible) => (visible ? <EyeIcon/>:<EyeCrossIcon/>)}
										/>
									</Form.Item>

									{rest.password.passwordLink && (
										<Button
											type='link'
											{...rest.password.passwordLink.button}
										>
											{rest.password.passwordLink.title}
										</Button>
									)}

									{rest.password.passwordPrompt && (
										<p className='text-3 form__prompt'>{rest.password.passwordPrompt}</p>
									)}
								</>
							)}

							{rest.type === ConstructorFieldType.BUTTON && (
								<Button {...rest.button}>
									{rest?.button?.title}
								</Button>
							)}

							{rest.type === ConstructorFieldType.BUTTON_SUBMIT && (
								<Button
									type={rest.button?.type}
									htmlType={rest.button?.htmlType}
									loading={rest.button?.loading}
									disabled={rest.button?.disabled}
								>
									{rest?.button?.title}
								</Button>
							)}

							{rest.type === ConstructorFieldType.ALERT && (
								<Alert {...rest.alert}/>
							)}

							{rest.type === ConstructorFieldType.TEXT && (
								<p className='text-3 form__text'>
									{rest.text.jsx}
								</p>
							)}

							{rest.type === ConstructorFieldType.TOOLTIP && (
								<Tooltip title={rest.title} overlayClassName="tooltip-green tooltip-entry" placement="bottom">
									<span className="text-3 color-brand-2-hover form__text form__text_tooltip">{rest.text}</span>
								</Tooltip>
							)}
						</Form.Item>
					))}
				</>
			)}
		</Form>
	)
}

export default EntryForm;
