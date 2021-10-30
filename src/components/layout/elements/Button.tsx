import {FC, ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
}

const Button: FC<ButtonProps> = ({text, className = 'btn-primary', onClick, type, disabled}) => {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button;
