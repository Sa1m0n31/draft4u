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

const unicodeToUTF8 = (str) => {
    return str
        .replace(/\\u0105/g, "ą")
        .replace(/\\u0107/g, "ć")
        .replace(/\\u0119/g, "ę")
        .replace(/\\u0142/g, "ł")
        .replace(/\\u0144/g, "ń")
        .replace(/\\u0F3/g, "ó")
        .replace(/\\u015b/g, "ś")
        .replace(/\\u017A/g, "ż")
        .replace(/\\u017C/g, "ź");
}

const calculateAge = (dateOfBirth) => {
    const birthday = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return ageDate.getUTCFullYear() - 1970;
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
    if(content.split(' ')[0] === '[image') return "Zdjęcie zostało wysłane";
    else return content.length < 30 ? content : content.substring(0, 30) + "...";
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

export { removePolishChars, unicodeToUTF8, calculateAge, isElementInArray, getPositionById, getMessagePreview, getUniqueListBy, getNotificationsNumber, convertStringToURL }
