import './button.styles.scss';
/**
 * Default
 * Invert
 * Google-Sign-in
 * @param {*} param0 
 * @returns 
 */


const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted:'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
        {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button;