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

const isElementInArray = (arr, el) => {
    return arr.findIndex((item) => {
        return el === item;
    }) !== -1;
}

const getPositionById = (id) => {
    switch(id) {
        case 1:
            return 'przyjmujący';
        case 2:
            return 'atakujący';
        case 3:
            return 'środkowy';
        case 4:
            return 'rozgrywający';
        case 5:
            return 'libero';
        default:
            return null;
    }
}

export { removePolishChars, calculateAge, isElementInArray, getPositionById }
