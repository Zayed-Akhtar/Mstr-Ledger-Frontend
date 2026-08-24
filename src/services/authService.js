const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

export const getCurrentUser = async () => {

    const response = await fetch(
        `${serverEndpoint}/auth/me`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch current user"
        );
    }

    return data.user;
};


export const logoutUser = async () => {

    const response = await fetch(
        `${serverEndpoint}/auth/logout`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Logout failed"
        );
    }

    return data;
};