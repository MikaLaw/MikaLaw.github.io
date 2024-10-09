import {FormItemProps} from "antd/lib/form/FormItem";
import {AlertProps, ButtonProps, InputProps} from "antd";
import {PasswordProps} from "antd/lib/input";
import {PasswordResetDto, PasswordResetRequestDto, SignUpDto, TmpPasswordResetDto, TokenGenerateDto} from "./dto";

export enum ConstructorFieldType {
    INPUT = 'input',
    TEXT = 'text',
    PASSWORD = 'password',
    BUTTON = 'button',
    BUTTON_SUBMIT = 'buttonSubmit',
    ALERT = 'alert',
    TOOLTIP = 'tooltip',
}

interface Field<Values> {
    key: string;
    field: FormItemProps<Values>;
    innerField?: FormItemProps<Values>;
}

interface InputField<Values> extends Field<Values> {
    type: ConstructorFieldType.INPUT;
    input: InputProps & {
        passwordPrompt?: string;
    };
}

interface ButtonField<Values> extends Field<Values> {
    type: ConstructorFieldType.BUTTON;
    button: ButtonProps;
}

interface ButtonSubmitField<Values> extends Field<Values> {
    type: ConstructorFieldType.BUTTON_SUBMIT;
    button: ButtonProps;
}

interface TextField<Values> extends Field<Values> {
    type: ConstructorFieldType.TEXT;
    text: {
        // html?: string;
        // options?: HTMLReactParserOptions;
        jsx?: JSX.Element;
    }
}

interface TooltipField<Values> extends Field<Values> {
    type: ConstructorFieldType.TOOLTIP;
    title: JSX.Element;
    text: string;
}

interface PasswordField<Values> extends Field<Values> {
    type: ConstructorFieldType.PASSWORD;
    password: PasswordProps & {
        passwordLink?: {
            title: string;
            button?: ButtonProps;
        },
        passwordPrompt?: string;
    };
}

interface AlertField<Values> extends Field<Values> {
    type: ConstructorFieldType.ALERT;
    alert: AlertProps;
}

export type EntryFormValues = Partial<TokenGenerateDto>;
export type SignUpFormValues = Partial<SignUpDto>;
export type PasswordCreateFormValues = Partial<PasswordResetDto>;
export type PasswordCreateNewFormValues = Partial<TmpPasswordResetDto>;
export type PasswordRecoveryFormValues = Partial<Pick<PasswordResetRequestDto, 'email'>>;

export type ConstructorField<Values> = InputField<Values>
    | ButtonField<Values>
    | TextField<Values>
    | PasswordField<Values>
    | ButtonSubmitField<Values>
    | AlertField<Values>
    | TooltipField<Values>
