export const formCheckPassword = (data) => {
    let result = false;
    if (data.length >= 8 && data.length <= 10) {
        result = true;
    } 

    return result
}