// YYYYMMDDHHmmss

export default function getDateFromYYYYMMDDHHmmss(timestamp){

    if(!timestamp){
        return null
    }
    if(!( typeof timestamp === 'string' || timestamp instanceof String)){
        timestamp = timestamp + ''
    }
    if(timestamp.length !== 14){
        return null
    }

    const year = parseInt(timestamp.slice(0, 4))
    const month = parseInt(timestamp.slice(4, 6)) - 1
    const day = parseInt(timestamp.slice(6, 8))
    const hours = parseInt(timestamp.slice(8, 10))
    const minutes = parseInt(timestamp.slice(10, 12))
    const seconds = parseInt(timestamp.slice(12, 14))

    if(isNaN(day) || day < 0 || day > 31 || isNaN(month) || month < 0 || month > 13 || isNaN(year) || year < 1980 || year > 2100 || isNaN(hours) || hours < 0 || hours > 24 || isNaN(minutes) || minutes < 0 || minutes > 60 || isNaN(seconds) || seconds < 0 || seconds > 60){
        return null
    }

    return new Date( year, month, day, hours, minutes, seconds )
}
