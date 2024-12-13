const apiRequest = async(url : string, method : "GET" | "POST" | "PUT" | "DELETE", data?: unknown) => {
    try {

        const response : any = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TKN}`
            },
            body: data
                ? JSON.stringify(data)
                : undefined
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred");
        }
        
        const result = await response.json();
        console.log('result: ', result);
        return result
        
    } catch (error) {
        console.error("API Request Error:", error);
        throw error; // Re-throw to handle in the calling function
    }
};

export default apiRequest