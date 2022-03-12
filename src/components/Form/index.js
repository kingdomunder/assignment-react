export const formCheckPassword = (data) => {
    result = false;
    if (data >= 8 && data <= 10) {
        result = true;
    } 

    return result
}