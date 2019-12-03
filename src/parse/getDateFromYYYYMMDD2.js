// YYYYMMDD

export default function getDateFromYYYYMMDD2(timestamp){
    if(!timestamp){
        return null
    }
    if(!( typeof timestamp === 'string' || timestamp instanceof String)){
        timestamp = timestamp + ''
    }
    timestamp = timestamp.trim()
    if(timestamp.length !== 8){
        if(timestamp.length > 8){
            timestamp = timestamp.slice(0,8)
        } else {
            return null
        }
    }

    const day = parseInt(timestamp.slice(6,8))
    const month = parseInt(timestamp.slice(4,6)) - 1
    const year = parseInt(timestamp.slice(0,4))

    if(isNaN(day) || day < 0 || day > 31 || isNaN(month) || month < 0 || month > 11 || isNaN(year) || year < 1980 || year > 2100 ){
        return null
    }

    return new Date(
        year,
        month,
        day
    )
}
