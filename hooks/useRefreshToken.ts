"use client";

import axios from "axios";

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const response = await axios.get("/api/refresh", {
                withCredentials: true
            });

            const user_data: Partial<UserInfo> = {
                accessToken: response.data.newAccessToken,
                fullName: response.data.fullName,
                email: response.data.email,
                userId: response.data._id,
                role: response.data.role,
                avatar: response.data.avatar,
                biography: response.data.biography,
            };
      
            localStorage.setItem("userInfo", JSON.stringify(user_data));
            return response.data.newAccessToken;

        } catch (error) {
            console.log(error);
        }
    };

    return refresh;
};

export default useRefreshToken;