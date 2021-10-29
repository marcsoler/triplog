import {FC, InputHTMLAttributes} from 'react';
import {auto} from '@popperjs/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
}

const Input: FC<InputProps> = ({ type = 'text', placeholder, value, name, onChange, label}) => {
    return(
        <div className="col-auto">
            <label htmlFor="{name}">{label}</label>
            <input type="{type}" placeholder={placeholder} value={value} name={name} id={name} onChange={onChange} required />
        </div>
    )
}

export default Input;
