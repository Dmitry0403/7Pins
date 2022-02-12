import { Input } from "antd";
import scss from "./styles.module.scss";
import { UserOutlined } from "@ant-design/icons";
import type { PlayerType } from "../../pages/StartPage";

interface RepeatType {
    values: PlayerType;
    children: (i: string) => React.ReactElement;
}

interface InputsComponentType {
    values: PlayerType;
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Repeat: React.FC<RepeatType> = (props) => {
    const values = props.values;
    let items: React.ReactElement[] = [];
    Object.keys(values).map((key) => {
        items = [...items, props.children(key)];
    });
    return <div>{items}</div>;
};

export const InputsComponent: React.FC<InputsComponentType> = ({
    values,
    handlerChange,
}) => {
    return (
        <Repeat values={values}>
            {(key) => (
                <div className={scss.inputSection} key={key}>
                    <Input
                        size="large"
                        placeholder="player"
                        name={key}
                        value={values[key]}
                        className={scss.input}
                        prefix={<UserOutlined />}
                        onChange={handlerChange}
                    />
                </div>
            )}
        </Repeat>
    );
};
