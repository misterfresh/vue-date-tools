// YYYY-MM-DD HH:mm:ss

import extractYMDhms from './extractYMDhms'

export default function formatYYYYMMDDHHmmss2(date){
    if(!date || !(date instanceof Date)){
        if(!!date && (typeof date === 'string' || date instanceof String) && (new Date(date)) instanceof Date ){
            date = new Date(date)
        } else {
            return ''
        }
    }
    let {year, month, day, hours, minutes, seconds} = extractYMDhms(date)
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
