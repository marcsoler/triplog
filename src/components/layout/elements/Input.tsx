import {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
}

const Input: FC<InputProps> = ({ type = 'text', placeholder, value, name, onChange, label}) => {
    return(
        <div className="col">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type={type} placeholder={placeholder} value={value} name={name} id={name} onChange={onChange} className="form-control" required />
        </div>
    )
}

export default Input;
