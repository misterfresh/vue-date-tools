// HHmmss

import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import setSeconds from 'date-fns/setSeconds'

export default function getTimeFromHHmmss(timestamp){
    if(!timestamp){
        return null
    }
    if(!( typeof timestamp === 'string' || timestamp instanceof String)){
        timestamp = timestamp + ''
    }
    timestamp = timestamp.trim()
    if(timestamp.length !== 6){
        return null
    }

    const hours = parseInt(timestamp.slice(0,2))
    const minutes = parseInt(timestamp.slice(2,4))
    const seconds = parseInt(timestamp.slice(4))

    if(isNaN(hours) || hours < 0 || hours > 23 || isNaN(minutes) || minutes < 0 || minutes > 59 || isNaN(seconds) || seconds < 0 || seconds > 59){
        return null
    }

    return setSeconds(setMinutes(setHours(new Date(), hours), minutes), seconds )
}
