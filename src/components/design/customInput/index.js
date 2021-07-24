import "./index.css";

const CustomInput = ({ label = "", className = "", errorMessage = "", instructions = "", ...props }) => {
    return (
        <div className="d-flex flex-column">
            {
                (label.length > 0) && <label className="form-label">{label}</label>
            }
            <input className={`${className} form-control`} {...props} />
            {
                (instructions.length > 0) && <span className="fs-7 text-black-50">{instructions}</span>
            }
            {
                (errorMessage.length > 0) && <span className="text-danger fs-7">{errorMessage}</span>
            }
        </div>
    );
};

export default CustomInput;