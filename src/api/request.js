const request = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = response.json();
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

export default request;
