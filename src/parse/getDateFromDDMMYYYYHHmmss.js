// DD/MM/YYYY HH:mm:ss

export default function getDateFromDDMMYYYYHHmmss(timestamp){
    if(!timestamp){
        return null
    }
    if(!( typeof timestamp === 'string' || timestamp instanceof String)){
        timestamp = timestamp + ''
    }
    if(timestamp.length !== 19){
        return null
    }

    let parts = timestamp.split(' ')
    if(parts.length !== 2) {
        return null
    }

    let dateParts = parts[0]['split']('/')
    if(dateParts.length !== 3){
        return null
    }

    let timeParts = parts[1]['split'](':')
    if(timeParts.length !== 3){
        return null
    }

    const day = parseInt(dateParts[0])
    const month = parseInt(dateParts[1]) - 1
    const year = parseInt(dateParts[2])

    const hours = parseInt(timeParts[0])
    const minutes = parseInt(timeParts[1])
    const seconds = parseInt(timeParts[2])

   if(isNaN(day) || day < 0 || day > 31 || isNaN(month) || month < 0 || month > 11 || isNaN(year) || year < 1980 || year > 2100 || isNaN(hours) || hours < 0 || hours > 23 || isNaN(minutes) || minutes < 0 || minutes > 59 || isNaN(seconds) || seconds < 0 || seconds > 59){
        return null
   }

    return new Date( year, month, day, hours, minutes, seconds )
}
