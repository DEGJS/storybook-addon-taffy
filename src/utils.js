const getEmFromPx = (px, baseSize = 16) => (px / baseSize).toString();

const getPxFromEm = (em, baseSize = 16) => (em * baseSize).toString();

const getRandomVal = (min, max) => {
    const roundedMin = Math.ceil(min);
    const roundedMax = Math.floor(max);
    return Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin;
};

const getArrayItemByValue = (arr = [], val = '', prop = 'id') => arr.find(item => item[prop] === val);

export {
    getEmFromPx,
    getPxFromEm,
    getRandomVal,
    getArrayItemByValue
};