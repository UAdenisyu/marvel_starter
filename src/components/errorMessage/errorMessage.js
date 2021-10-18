import img from './error.png';

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: "90%", height: "90%",objectFit: 'contain', margin: "0 auto"}} src={img} alt='Error message'/>
    )
}

export default ErrorMessage;