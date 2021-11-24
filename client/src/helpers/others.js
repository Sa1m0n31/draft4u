const removePolishChars = (str) => {
    return str
        .toLowerCase()
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ź/g, "z")
        .replace(/ż/g, "z");
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

const getMessagePreview = (content) => {
    return content.length < 30 ? content : content.substring(0, 30) + "...";
}

const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

const getNotificationsNumber = (n) => {
    if(n < 10) return n.toString();
    else return "9+";
}

const convertStringToURL = (str) => {
    return removePolishChars(str.replace(/ /g, "-"));
}

export { removePolishChars, calculateAge, isElementInArray, getPositionById, getMessagePreview, getUniqueListBy, getNotificationsNumber, convertStringToURL }
