import {FC} from 'react';

interface AlertProps {
    message: string;
    type: 'primary' | 'secondary' | 'success' | 'alert' | 'warning' | 'info' | 'light' | 'dark';
}

const Alert: FC<AlertProps> = ({ message, type = 'primary'}) => {
  return (
      <div className={`alert alert-${type}`} role="alert">
          {message}
      </div>
  )
}

export default Alert;
