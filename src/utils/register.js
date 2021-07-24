import { register, uploadUserProfileImage, updateUser } from "../utils/users";

export const registerUser = async (payload, { rejectWithValue }) => {
    try {
        // first register the user
        const user = await register(payload);
        // then upload the profile image in storage...
        const { Key } = await uploadUserProfileImage({
            userId: user[0].id,
            profileImage: payload.profileImage
        });

        // update user profile image
        await updateUser(user[0].id, {
            profile_image: Key
        });

        return user;
    } catch (error) {
        if ('message' in error === false)
            error.message = `We are not able to register user, please try again later.`;
        return rejectWithValue(error.message);
    }
};