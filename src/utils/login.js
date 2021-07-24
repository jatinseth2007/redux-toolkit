import { loginUser } from "./users";

export const loginUserHandler = async (payload, { rejectWithValue }) => {
    try {
        const userDetails = await loginUser(payload);
        if (userDetails.length <= 0) throw new Error("User does not exist");
        //add userdetails in localstorage...
        localStorage.setItem("loggedInUser", JSON.stringify(userDetails[0]));
        return userDetails[0];
    } catch (error) {
        if ('message' in error === false)
            error.message = `Email or password is wrong`;
        return rejectWithValue(error.message);
    }
}