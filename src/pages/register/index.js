import "./index.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/design/customInput";
import CustomTextarea from "../../components/design/customTextarea";
import ImageThumbnail from "../../components/design/imageThumbnail";
import { registerUserAction, reset } from "../../dataLayer/slices/register";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const { loading, error, errorMessage } = useSelector((state) => state.register);
    const history = useHistory();

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);

    const profileImageChangeHandler = (e) => {
        const { size, type } = e.target.files[0];
        if (size === 0 || size > 100000) {
            setFormErrors({
                ...formErrors,
                profileImage: "Profile image should not exceed 100kb.",
            });
        } else if (["image/png", "image/jpeg"].indexOf(type) < 0) {
            setFormErrors({
                ...formErrors,
                profileImage: "Only jpg|png formats allowed.",
            });
        } else {
            delete formErrors.profileImage;
            setFormErrors({
                ...formErrors
            });
        }//EOI
        setProfileImage(e.target.files[0]);
    };

    const bioChangeHandler = (e) => {
        setBio(e.target.value);
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

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

    const registerUserHandler = async (e) => {
        e.preventDefault();
        // dispatch the action...
        const { payload } = await dispatch(registerUserAction({
            name,
            email,
            password,
            bio,
            profileImage
        }));

        if (payload && payload.length > 0 && payload[0].id) {
            history.replace("/");
        }
    };

    return (
        <div className="register-container d-flex justify-content-center align-items-center">
            <form onSubmit={registerUserHandler}>
                <div className="register-form-container d-flex flex-column bg-white shadow p-5">
                    <h2 className="mb-4">Redux Toolkit App</h2>
                    <h6 className="fw-light fs-6">Register yourself to use the application</h6>
                    <CustomInput
                        name="name"
                        type="text"
                        value={name}
                        onChange={nameChangeHandler}
                        placeholder="Full name"
                        errorMessage={formErrors.name}
                        maxLength="200"
                        required
                    />
                    <CustomInput
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder="Email"
                        className="mt-2"
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
                    <CustomTextarea
                        name="bio"
                        value={bio}
                        onChange={bioChangeHandler}
                        placeholder="Bio"
                        className="mt-2"
                        errorMessage={formErrors.bio}
                        maxLength="200"
                        rows="3"
                        cols="30"
                        required
                    />
                    <CustomInput
                        name="profileImage"
                        type="file"
                        onChange={profileImageChangeHandler}
                        placeholder="Upload pofile image"
                        className="mt-2"
                        errorMessage={formErrors.profileImage}
                        instructions="Max file size: 100kb, accepted: jpg|png"
                        required
                    />
                    <div>
                        <ImageThumbnail
                            htmlFile={profileImage}
                            alt="profile image preview"
                            width="50"
                            height="50"
                            className="rounded-circle overflow-hidden object-fit"
                        />
                    </div>
                    <button type="submit" className="btn btn-info text-light mt-3" disabled={loading || Object.keys(formErrors).length > 0}>Register</button>
                    {/** Error message */}
                    {
                        (error) && <div className="mt-2 text-danger fs-7">{errorMessage}</div>
                    }
                    {/**Login */}
                    <Link to="/" className="fs-6 mt-2">Have an account? Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;