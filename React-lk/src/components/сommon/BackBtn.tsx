import {FC, PropsWithChildren} from "react";
import {Button, ButtonProps} from "antd";
import {useActions} from "react-redux-actions-hook";
import {push} from "connected-react-router";
import { ArrowUpIcon } from "../Icons";
import classNames from "classnames";

interface Props {
    text: string;
    to: string;
    className?: string;
}

const BackBtn: FC<PropsWithChildren<Props & ButtonProps>> = (
    {
        text,
        to,
        className,
        ...rest
    }) => {
    const actions = useActions({push});

    return (
        <Button
            type="ghost"
            className={classNames("btn-v2 btn-v2-ghost btn-back", className)}
            icon={<ArrowUpIcon />}
            onClick={() => {
                actions.push(to);
            }}
            {...rest}
        >
            {text}
        </Button>
    );
};

export default BackBtn;