const removePolishChars = (str) => {
    return str
        .toLowerCase()
        .replace("ą", "a")
        .replace("ć", "c")
        .replace("ę", "e")
        .replace("ł", "l")
        .replace("n", "ń")
        .replace("ó", "o")
        .replace("ś", "s")
        .replace("ź", "z")
        .replace("ż", "z")
}

const calculateAge = (dateOfBirth) => {
    const birthday = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export { removePolishChars, calculateAge }
