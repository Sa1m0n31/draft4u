import settings from "../settings";

const { API_URL } = settings;

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

const addTrailingZero = (n) => {
    if(n > 9) return n;
    else return `0${n}`;
}

const countriesEn = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BR": "Brazil",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "CV": "Cabo Verde",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CD": "Democratic Republic of Congo",
    "CG": "Congo",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "CI": "Côte d'Ivoire",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "Eswatini",
    "ET": "Ethiopia",
    "FK": "Falkland Islands",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "VA": "Holy See",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "North Korea",
    "KR": "South Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People's Democratic Republic (the)",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "MX": "Mexico",
    "FM": "Micronesia (Federated States of)",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine, State of",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "MK": "Republic of North Macedonia",
    "RO": "Romania",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "RE": "Réunion",
    "KN": "Saint Kitts and Nevis",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania, United Republic of",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States of America",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Viet Nam",
    "VG": "Virgin Islands (British)",
    "VI": "Virgin Islands (U.S.)",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};

const countriesPl = {
    "AF": "Afganistan",
    "AL": "Albania",
    "DZ": "Algieria",
    "AS": "Samoa Amerykańskie",
    "AD": "Andora",
    "AO": "Angola",
    "AI": "Anguilla",
    "AG": "Antigua i Barbuda",
    "AR": "Argentyna",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbejdżan",
    "BS": "Bahamy",
    "BH": "Bahrajn",
    "BD": "Bangladesz",
    "BB": "Barbados",
    "BY": "Białoruś",
    "BE": "Belgia",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermudy",
    "BT": "Bhutan",
    "BO": "Boliwia",
    "BA": "Bośnia i Hercegowina",
    "BW": "Botswana",
    "BR": "Brazylia",
    "BG": "Bułgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "CV": "Cabo Verde",
    "KH": "Kambodża",
    "CM": "Kamerun",
    "CA": "Kanada",
    "KY": "Kajmany",
    "CF": "Republika Środkowoafrykańska",
    "TD": "Czad",
    "CL": "Chile",
    "CN": "Chiny",
    "CX": "Wyspa Bożonarodzeniowa",
    "CC": "Wyspy Kokosowe",
    "CO": "Kolumbia",
    "KM": "Komory",
    "CD": "Demokratyczna Republika Konga",
    "CG": "Kongo",
    "CK": "Wyspy Cooka",
    "CR": "Kostaryka",
    "HR": "Chorwacja",
    "CU": "Kuba",
    "CY": "Cypr",
    "CZ": "Czechy",
    "CI": "Wybrzeże Kości Słoniowej",
    "DK": "Dania",
    "DJ": "Dżibuti",
    "DM": "Dominika",
    "DO": "Republika Dominikany",
    "WE": "Ekwador",
    "EG": "Egipt",
    "SV": "Salwador",
    "GQ": "Gwinea Równikowa",
    "ER": "Erytrea",
    "EE": "Estonia",
    "SZ": "Eswatini",
    "ET": "Etiopia",
    "FK": "Falklandy",
    "FO": "Wyspy Owcze",
    "FJ": "Fidżi",
    "FI": "Finlandia",
    "FR": "Francja",
    "GF": "Gujana Francuska",
    "PF": "Polinezja Francuska",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Gruzja",
    "DE": "Niemcy",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Grecja",
    "GL": "Grenlandia",
    "GD": "Grenada",
    "GP": "Gwadelupa",
    "GU": "Guam",
    "GT": "Gwatemala",
    "GN": "Gwinea",
    "GW": "Gwinea Bissau",
    "GY": "Gujana",
    "HT": "Haiti",
    "VA": "Watykan",
    "HN": "Honduras",
    "HK": "Hongkong",
    "HU": "Węgry",
    "IS": "Islandia",
    "IN": "Indie",
    "ID": "Indonezja",
    "IR": "Iran",
    "IQ": "Irak",
    "IE": "Irlandia",
    "IL": "Izrael",
    "IT": "Włochy",
    "JM": "Jamajka",
    "JP": "Japonia",
    "JO": "Jordania",
    "KZ": "Kazachstan",
    "KE": "Kenia",
    "KI": "Kiribati",
    "KP": "Korea Północna",
    "KR": "Korea Południowa",
    "KW": "Kuwejt",
    "KG": "Kirgistan",
    "LA": "Laos",
    "LV": "Łotwa",
    "LB": "Liban",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libia",
    "LI": "Liechtenstein",
    "LT": "Litwa",
    "LU": "Luksemburg",
    "MO": "Makau",
    "MG": "Madagaskar",
    "MW": "Malawi",
    "MY": "Malezja",
    "MV": "Malediwy",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Wyspy Marshalla",
    "MQ": "Martynika",
    "MR": "Mauretania",
    "MU": "Mauritius",
    "MX": "Meksyk",
    "FM": "Mikronezja",
    "MD": "Mołdawia",
    "MC": "Monako",
    "MN": "Mongolia",
    "JA": "Czarnogóra",
    "MS": "Montserrat",
    "MA": "Maroko",
    "MZ": "Mozambik",
    "MM": "Mjanma",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Holandia",
    "NC": "Nowa Kaledonia",
    "NZ": "Nowa Zelandia",
    "NI": "Nikaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NIE": "Norwegia",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestyna",
    "PA": "Panama",
    "PG": "Papua Nowa Gwinea",
    "PY": "Paragwaj",
    "PE": "Peru",
    "PH": "Filipiny",
    "PL": "Polska",
    "PT": "Portugalia",
    "PR": "Puerto Rico",
    "QA": "Katar",
    "MK": "Republika Macedonii Północnej",
    "RO": "Rumunia",
    "RU": "Rosja",
    "RW": "Rwanda",
    "RE": "Reunion",
    "KN": "Saint Kitts i Nevis",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Arabia Saudyjska",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seszele",
    "SL": "Sierra Leone",
    "SG": "Singapur",
    "SK": "Słowacja",
    "SI": "Słowenia",
    "SB": "Wyspy Salomona",
    "SO": "Somalia",
    "ZA": "Republika Południowej Afryki",
    "SS": "Sudan Południowy",
    "ES": "Hiszpania",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Surinam",
    "SJ": "Svalbard i Jan Mayen",
    "SE": "Szwecja",
    "CH": "Szwajcaria",
    "SY": "Syryjska Republika Arabska",
    "TW": "Tajwan",
    "TJ": "Tadżykistan",
    "TZ": "Tanzania, Zjednoczona Republika",
    "TH": "Tajlandia",
    "TL": "Timor Wschodni",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trynidad i Tobago",
    "TN": "Tunezja",
    "TR": "Turcja",
    "TM": "Turkmenistan",
    "TC": "Wyspy Turks i Caicos",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraina",
    "AE": "Zjednoczone Emiraty Arabskie",
    "GB": "Wielka Brytania",
    "USA": "Stany Zjednoczone",
    "UY": "Urugwaj",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Wenezuela",
    "VN": "Wietnam",
    "VG": "Wyspy Dziewicze (Brytyjskie)",
    "VI": "Wyspy Dziewicze (USA)",
    "WF": "Wallis i Futuna",
    "EH": "Sahara Zachodnia",
    "YE": "Jemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};

const getPositionById = (id) => {
    switch(id) {
        case 3:
            return 'przyjmujący';
        case 1:
            return 'atakujący';
        case 4:
            return 'środkowy';
        case 2:
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
    if(arr?.length) {
        return [...new Map(arr.map(item => [item[key], item])).values()];
    }
    else {
        return [];
    }
}

const getNotificationsNumber = (n) => {
    if(n < 10) return n.toString();
    else return "9+";
}

const convertStringToURL = (str) => {
    return removePolishChars(str.replace(/ /g, "-"));
}

const getImageUrl = (path) => {
    return `https://draft4u.com.pl/image?url=/media/fields/${path}`;
}

const getDate = (d) => {
    const date = new Date(d);
    if(date) return date?.getDate() + "." + parseInt(date?.getMonth()+1) + "." + date?.getFullYear();
    else return '';
}

const getDateForInput = (d) => {
    const date = new Date(d);
    if(date) return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1)) + '-' + date.getDate();
    else return null;
}

const getPostDate = (dateString) => {
    const postDate = new Date(dateString);
    return `${addTrailingZero(postDate.getDate())}.${addTrailingZero(postDate.getMonth()+1)}.${postDate.getFullYear()}`;
}

export { removePolishChars, unicodeToUTF8, calculateAge, isElementInArray, getPositionById,
    countriesEn, countriesPl,
    getMessagePreview, getUniqueListBy, getDate, getNotificationsNumber, convertStringToURL,
    addTrailingZero, getImageUrl, getDateForInput, getPostDate }
