const generateQueryString = (obj) => {
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    return queryString;
};

export default generateQueryString;
