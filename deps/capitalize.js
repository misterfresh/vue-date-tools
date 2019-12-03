function capitalize(string){
    if (typeof string === 'string') {
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    } else {
        return ""
    }
}

export default capitalize
