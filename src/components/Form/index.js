export const formCheckName = (data) => {
    let result = false;
    if (data) {
        result = true;
    };

    return result
}

export const formCheckCity = (data) => {
    let result = false;
    if (data) {
        result = true;
    };

    return result
}

export const formCheckEmail = (data) => {
    let result = false;
    if (data) {
        result = true;
    };

    return result
}

export const formCheckPassword = (data) => {
    let result = false;
    if (data.length >= 8 && data.length <= 10) {
        result = true;
    };

    return result
}

export const formCheckPassword2 = (password1, password2) => {
    let result = false;
    if (password1 === password2) {
        result = true;
    };

    return result
}

export const formCheckStreet = (data) => {
    let result = false;
    if (data) {
        result = true;
    };

    return result
}

export const formCheckZipcode = (data) => {
    let result = false;
    if (data) {
        result = true;
    };

    return result
}