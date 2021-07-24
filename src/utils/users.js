import { supabaseClient } from "./_common";

export const loginUser = async ({ email, password }) => {
    try {
        //call the API
        let { data: users, error } = await supabaseClient
            .from('users')
            .select('id, name, bio, email, created_at, updated_at')
            .eq('email', email)
            .eq('password', password);
        // if error
        if (error)
            throw error;
        return users;
    } catch (error) {
        throw error;
    }
}

export const register = async ({ name, email, password, bio }) => {
    try {
        // call the API
        const { data, error } = await supabaseClient
            .from('users')
            .insert([
                { name, email, password, bio },
            ]);
        // if error
        if (error)
            throw error;
        return data;
    } catch (error) {
        throw error;
    }
}

export const uploadUserProfileImage = async ({ userId, profileImage }) => {
    try {
        //call the API
        const { data, error } = await supabaseClient
            .storage
            .from(process.env.REACT_APP_BUCKET_BASE_PATH)
            .upload(`${process.env.REACT_APP_BUCKET_USERS_PATH}/${userId}/profileImage.jpg`, profileImage, {
                cacheControl: 3600,
                upsert: true
            });
        // if error
        if (error)
            throw error;
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, payload) => {
    try {
        const { data, error } = await supabaseClient
            .from('users')
            .update(payload)
            .eq('id', id);

        if (error)
            throw error;

        return data;
    } catch (error) {
        throw error;
    }
}