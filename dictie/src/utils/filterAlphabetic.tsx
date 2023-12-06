function filterAlphabetic(inputString : string) {
    return inputString.replace(/[^a-zA-Z]/g, '');
}

export default filterAlphabetic