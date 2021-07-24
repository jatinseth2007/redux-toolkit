import "./index.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../../dataLayer/slices/login";
import CustomInput from "../../components/design/customInput";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const { error, errorMessage, loading } = useSelector((state) => state.login);
    const history = useHistory();

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        //check if password is valid or not...
        if (e.target.value.length < 6) {
            setFormErrors({
                ...formErrors,
                password: "Password must be atleast 6 character long."
            });
        } else {
            delete formErrors.password;
            setFormErrors({
                ...formErrors
            });
        }//EOI
        setPassword(e.target.value);
    };

    const loginFormSubmitHandler = async (e) => {
        e.preventDefault();
        //dispatching the event
        await dispatch(loginUser({
            email,
            password
        }));
        history.replace("/homepage");
    }

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <form onSubmit={loginFormSubmitHandler}>
                <div className="login-form-container d-flex flex-column bg-white shadow p-5">
                    <h2 className="mb-4">Redux Toolkit App</h2>
                    <CustomInput
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder="Email"
                        errorMessage={formErrors.email}
                        maxLength="200"
                        required
                    />
                    <CustomInput
                        name="password"
                        type="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        placeholder="Password"
                        className="mt-2"
                        errorMessage={formErrors.password}
                        maxLength="200"
                        required
                    />
                    <button type="submit" className="btn btn-info text-light mt-3" disabled={loading || Object.keys(formErrors).length > 0}>Login</button>
                    {/** Error message */}
                    {
                        (error) && <div className="mt-2 text-danger fs-7">{errorMessage}</div>
                    }
                    {/**Signup */}
                    <Link to="/register" className="fs-6 mt-2">Don't have an account? Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;