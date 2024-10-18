import EntryBlock from '../../../components/сommon/EntryBlock';
import {ConstructorField, PasswordRecoveryFormValues, ConstructorFieldType} from "../../../interfaces/auth/form";
import React, {useEffect, useMemo, useState} from "react";
import {push} from "connected-react-router";
import {useActions} from "react-redux-actions-hook/lib";
import {Form} from "antd";
import {useAsyncCallback} from "react-async-hook";
import restApi from "../../../restApi";
import {ResponseStatus} from "../../../interfaces/common";
import useFormErrors from "../../../hooks/useFormErrors";
import {isApiError} from "../../../interfaces/utils";
import {DeleteIcon} from '../../../components/Icons';
import cookieStore from '../../../tools/cookieStore';
import moment from 'moment';
import {getDateOneMinuteAdded} from '../../../tools/utils';
import EntryLayout from "../../../layouts/EntryLayout";

const registeredFields = [
    'email',
];

const EMAIL_PASSWORD_RECOVERY = "emailPasswordRecovery";
const TIME_PASSWORD_RECOVERY = "timePasswordRecovery";

const timeFromCookie = cookieStore.get(TIME_PASSWORD_RECOVERY);
const emailFromCookie = cookieStore.get(EMAIL_PASSWORD_RECOVERY);

const PasswordRecovery = () => {
    const {push: pushAction} = useActions({push});
    const [sentRequest, setSentRequest] = useState(false);
    const [form] = Form.useForm<PasswordRecoveryFormValues>();
    const {getFieldAsyncProps, errorsManage} = useFormErrors(registeredFields);
    const {
        execute,
        loading,
        result,
    } = useAsyncCallback(restApi.passwordResetRequest.bind(restApi), {
        onSuccess: (res) => {
            if (res.status === ResponseStatus.OK) {
                const expires = getDateOneMinuteAdded();

                cookieStore.set(EMAIL_PASSWORD_RECOVERY, form.getFieldValue('email'));
                cookieStore.set(TIME_PASSWORD_RECOVERY, moment(), expires);

                setSentRequest(true);
                setTime(60);
            }
            errorsManage.setErrorsByRestResponse(res);
        },
    });
    const [time, setTime] = React.useState(0);

    const pRecoveryFields = useMemo(() => {
        const fields: (ConstructorField<PasswordRecoveryFormValues> | null)[] = [
            {
                key: 'email',
                type: ConstructorFieldType.INPUT,
                field: {
                    label: 'E-mail',
                    ...getFieldAsyncProps('email', {isHelpText: true}),
                },
                innerField: {
                    rules: [{required: true}],
                    required: true,
                    name: 'email'
                },
                input: {
                    placeholder: 'Введите почту',
                    onChange: () => errorsManage.removeErrors(['email'])
                },
            },
            isApiError(result?.data, result?.status) && !Array.isArray(result?.data) ? {
                key: 'alert2',
                type: ConstructorFieldType.ALERT,
                alert: {
                    message: 'Ошибка',
                    description: result?.data?.message,
                    type: 'error',
                    showIcon: true,
                    icon: <DeleteIcon/>,
                    className: "auth-alert"
                },
                field: {}
            } : null,
            {
                key: 'button',
                type: ConstructorFieldType.BUTTON_SUBMIT,
                field: {
                    label: '',
                    required: true,
                    style: {
                        marginTop: '25px'
                    }
                },

                button: {
                    type: 'primary',
                    title: 'Восстановить пароль',
                    htmlType: 'submit',
                    loading,
                },
            },
            {
                key: 'link',
                type: ConstructorFieldType.BUTTON,
                field: {
                    label: '',
                    required: true,
                },
                button: {
                    type: 'link',
                    title: 'Войти',
                    onClick: () => pushAction('/login')
                }
            },
        ]
        return fields.filter(Boolean) as ConstructorField<PasswordRecoveryFormValues>[];
    }, [getFieldAsyncProps, result?.data, result?.status, loading, errorsManage, pushAction]);

    const reqSentFields = useMemo(() => {
        const fields: (ConstructorField<any> | null)[] = [
            {
                key: 'text',
                type: ConstructorFieldType.TEXT,
                field: {
                    label: '',
                },
                text: {
                    jsx: (
                        <>
                            Не пришла ссылка? Проверьте корректность введенных данных и попробуйте отправить повторно.
                        </>
                    )
                }
            },
            {
                key: 'button',
                type: ConstructorFieldType.BUTTON,
                field: {
                    label: '',
                    style: {
                        marginBottom: '7px'
                    }
                },
                button: {
                    type: 'primary',
                    title: 'Отправить повторно',
                    htmlType: 'button',
                    disabled: time !== 0,
                    onClick: () => setSentRequest(false)
                },
            },
            time !== 0 ? {
                key: 'text1',
                type: ConstructorFieldType.TEXT,
                field: {
                    label: '',
                },
                text: {
                    jsx: (
                        <>
                            Через <b>{time}</b> секунд
                        </>
                    )
                }
            } : null
        ];

        return fields.filter(Boolean) as ConstructorField<any>[];
    }, [time])

    useEffect(() => {
        if (timeFromCookie) {
            const date = moment(timeFromCookie);

            if (date.isValid()) {
                const duration = moment.duration(moment().diff(moment(date)));
                const restSeconds = 60 - duration.seconds();

                if (duration.minutes() === 0 && restSeconds > 0) {
                    setSentRequest(true);
                    setTime(restSeconds);

                    form.setFieldsValue({
                        email: emailFromCookie
                    });
                }
            }
        }
    }, [])

    useEffect(() => {
        const timer = time > 0 && setTimeout(() => {
            setTime(time - 1)
        }, 1000);

        return () => {
            timer && clearTimeout(timer)
        }
    }, [time]);

    if (sentRequest) {
        return (
            <EntryLayout>
                <EntryBlock
                    blockClass='entry-block_w_medium'
                    title='Запрос отправлен'
                    subtitle={`В случае, если пользователь с адресом электронной почты ${form.getFieldValue('email') ?? emailFromCookie} есть и активен, на этот адрес придет ссылка для восстановления пароля. `}
                    fields={reqSentFields}
                />
            </EntryLayout>
        )
    }

    return (
        <EntryLayout>
            <EntryBlock
                blockClass='entry-block_w_wide'
                title='Восстановление пароля'
                subtitle='Введите адрес электронной почты, на который зарегистрирован ваш кабинет (ваш логин). На эту почту придет ссылка; перейдите по этой ссылке, чтобы задать новый пароль.'
                fields={pRecoveryFields}
                onFinish={(values) => execute({
                    email: values.email!,
                    type: 'passwordCreate',
                })}
                form={form}
            />

        </EntryLayout>
    )
}

export default PasswordRecovery;
