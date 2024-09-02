"use client";

import axios from "axios";

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const response = await axios.get("/api/refresh", {
                withCredentials: true
            });

            const user_data: {
                accessToken: string;
                role: string;
            } = {
                accessToken: response.data.newAccessToken,
                role: response.data.role
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