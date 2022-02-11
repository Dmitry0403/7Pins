import { Input } from "antd";
import scss from "./styles.module.scss";
import { UserOutlined } from "@ant-design/icons";
import type { PlayerType } from "../../pages/StartPage";

interface RepeatType {
    numTimes: number;
    children: (i: number) => React.ReactElement;
}

interface InputsComponentType {
    values: PlayerType;
    quantity: number;
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Repeat: React.FC<RepeatType> = (props) => {
    let items: React.ReactElement[] = [];
    for (let i = 1; i < props.numTimes || i === props.numTimes; i++) {
        items = [...items, props.children(i)];
    }
    return <div>{items}</div>;
};

export const InputsComponent: React.FC<InputsComponentType> = ({
    quantity,
    values,
    handlerChange,
}) => {
    return (
        <Repeat numTimes={quantity}>
            {(index: number) => (
                <div className={scss.inputSection} key={index}>
                    <Input
                        size="large"
                        placeholder="player"
                        name={`name${index}`}
                        value={values[`name${index}`]}
                        className={scss.input}
                        prefix={<UserOutlined />}
                        onChange={handlerChange}
                    />
                </div>
            )}
        </Repeat>
    );
};
