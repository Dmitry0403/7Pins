import { useState } from "react";
import { Input } from "antd";
import scss from "./styles.module.scss";
import { UserOutlined } from "@ant-design/icons";

interface InputType {
    value: string;
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RepeatType {
    numTimes: number;
    children: (i: number) => React.ReactElement;
}

interface InputsComponentType {
    quantityInput: number;
}

const Repeat: React.FC<RepeatType> = (props) => {
    let items: React.ReactElement[] = [];
    for (let i = 0; i < props.numTimes; i++) {
        items = [...items, props.children(i)];
    }
    return <div>{items}</div>;
};

const ItemInput: React.FC = () => {
    const [value, setValue] = useState("");
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <Input
            size="large"
            placeholder="player"
            value={value}
            className={scss.input}
            prefix={<UserOutlined />}
            onChange={handlerChange}
        />
    );
};

export const InputsComponent: React.FC<InputsComponentType> = (props) => {
    const quantity = props.quantityInput;
    return (
        <Repeat numTimes={quantity}>
            {(index: number) => (
                <div className={scss.inputSection} key={index}>
                    <ItemInput />
                </div>
            )}
        </Repeat>
    );
};
