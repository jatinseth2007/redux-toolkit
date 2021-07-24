import "./index.css";


const CustomTextarea = ({ label = "", className = "", errorMessage = "", ...props }) => {
    return (
        <div>
            {
                (label.length > 0) && <label className="form-label">{label}</label>
            }
            <textarea className={`form-control ${className}`} {...props}></textarea>
            {
                (errorMessage.length > 0) && <span className="text-danger fs-7">{errorMessage}</span>
            }
        </div>
    );
};

export default CustomTextarea;