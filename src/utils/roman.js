export default function validateRoman(romanArg) {
    const regexAlg = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (regexAlg.test(romanArg)) {
        return true;
    }
    return false;
};