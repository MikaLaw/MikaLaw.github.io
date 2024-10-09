import {useMemo} from 'react';
import EntryBlock from '../../components/сommon/EntryBlock';
import {ConstructorField, ConstructorFieldType, EntryFormValues} from "../../interfaces/auth/form";
import {useActions} from "react-redux-actions-hook";
import {push} from 'connected-react-router';
import routes from "../../routes";
import {stateSelector, useAuthActions} from "../../redux/ducks/auth";
import {useSelector} from "react-redux";
import {DeleteIcon} from "../../components/Icons";
import EntryLayout from "../../layouts/EntryLayout";

const Entry = () => {
    const {push: pushAction} = useActions({push});
    const {signIn} = useAuthActions();
    const {loading, error} = useSelector(stateSelector);

    const fields = useMemo(() => {
        const fields: (ConstructorField<EntryFormValues> | null)[] = [
            {
                key: 'login',
                type: ConstructorFieldType.INPUT,
                input: {
                    placeholder: 'Введите почту',
                },
                field: {
                    label: 'Логин (e-mail)',
                },
                innerField: {
                    rules: [{required: true, message: 'Пожалуйста, введите логин'}],
                    required: true,
                    name: 'login',
                }
            },
            {
                key: 'password',
                type: ConstructorFieldType.PASSWORD,
                password: {
                    placeholder: '•••••••',
                    passwordLink: {
                        title: 'Забыли пароль?',
                        button: {
                            onClick: () => pushAction(routes.passwordRecovery.path)
                        }
                    },
                },
                field: {
                    label: 'Пароль',
                },
                innerField: {
                    rules: [{required: true, message: 'Пожалуйста, введите пароль'}],
                    name: 'password',
                    required: true,
                }
            },
            error ? {
                key: 'alert',
                type: ConstructorFieldType.ALERT,
                alert: {
                    message: 'Ошибка авторизации',
                    description: error,
                    type: 'error',
                    showIcon: true,
                    icon: <DeleteIcon/>,
                    className: "auth-alert"
                },
                field: {}
            } : null,
            {
                key: 'entry',
                type: ConstructorFieldType.BUTTON_SUBMIT,
                button: {
                    type: 'primary',
                    htmlType: 'submit',
                    title: 'Войти',
                    loading
                },
                field: {
                    label: '',
                    style: {
                        marginTop: '25px'
                    }
                }
            }
        ];

        return fields.filter(Boolean) as ConstructorField<EntryFormValues>[];
    }, [loading, error, pushAction]);

    return (
        <>
            <EntryLayout>
                <EntryBlock
                    blockClass=''
                    title='Войти'
                    fields={fields}
                    onFinish={(values) => signIn(values.login as string, values.password as string)}
                />
            </EntryLayout>
        </>
    );
};

export default Entry;
