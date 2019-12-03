// HHmmss

import setHours from './../date/setHours'
import setMinutes from './../date/setMinutes'
import setSeconds from './../date/setSeconds'

export default function getTimeFromHHmm(timestamp){
    if(!timestamp){
        return null
    }
    if(!( typeof timestamp === 'string' || timestamp instanceof String)){
        timestamp = timestamp + ''
    }

    let timeParts = timestamp.split(':')

    if(timeParts.length !== 2){
        return null
    }

    const hours = parseInt((timeParts[0]).trim())
    const minutes = parseInt((timeParts[1]).trim())

    if(isNaN(hours) || hours < 0 || hours > 23 || isNaN(minutes) || minutes < 0 || minutes > 59 ){
        return null
    }

    return setSeconds( setMinutes( setHours(new Date(), hours), minutes), 0)
}
