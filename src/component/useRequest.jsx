import useSWR from "swr";
import axios from "axios";

const useRequest = (request, { fallbackData, ...config } = {}) => {
    return useSWR(request, () => axios(request || {}).then((response) => response.data), {
        ...config,
        fallbackData: fallbackData && {
            status: 200,
            statusText: "InitialData",
            headers: {
                "Content-Type": "application/json",
                "authtoken" : localStorage.getItem("token"),
            },
            data: fallbackData,
        },
    });
};

export default useRequest;
