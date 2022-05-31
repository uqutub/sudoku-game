import { ToggleButton } from 'react-bootstrap';

type Props = {
    idx: number|string,
    value: string,
    difficultyChangeHandler: (value: React.ChangeEvent<HTMLInputElement>) => void,
    selectedValue: string,
    name: string
}

const RadioToggleButton: React.FC<Props> = ({ idx, value, difficultyChangeHandler, selectedValue, name }) => {
    return (
        <ToggleButton
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-light'}
            name={name}
            value={value}           // need to add loader
            checked={selectedValue === value}
            onChange={difficultyChangeHandler}
        >
            <span className="text-color-black text-capitalize">{value}</span>
        </ToggleButton>
    )
}

RadioToggleButton.defaultProps = {
    idx: 0,
    value: '',
    difficultyChangeHandler: () => { },
    selectedValue: '',
    name: ''
}


export default RadioToggleButton;
