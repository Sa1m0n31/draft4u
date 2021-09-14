const isMail = (email) => {
    return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(email);
}

const isPasswordStrength = (password) => {
    if(password.length < 8) return false;
    if(password.toLowerCase() === password) return false;
    if(!/\d/.test(password)) return false;

    return true;
}

export { isMail, isPasswordStrength }
