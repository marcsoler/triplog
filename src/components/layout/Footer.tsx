import moment from 'moment/moment';

const Footer = () => {
  return (
      <footer className="footer">
        <p className="text-center">Triplog &ndash; {moment().format('YYYY')}</p>
      </footer>
  )
}

export default Footer;
