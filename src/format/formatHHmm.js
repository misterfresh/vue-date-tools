// HH:mm

import extractYMDhms from './extractYMDhms'

export default function formatHHmm(date){

    if(!date || !(date instanceof Date)){
        if(!!date && (typeof date === 'string' || date instanceof String) && (new Date(date)) instanceof Date ){
            date = new Date(date)
        } else {
            return ''
        }
    }
    let {hours, minutes} = extractYMDhms(date)
    return `${hours}:${minutes}`
}
