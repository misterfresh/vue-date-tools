// YYYY-MM-DD HH:mm

import extractYMDhms from './extractYMDhms'

export default function formatYYYYMMDDHHmm(date){
    if(!date || !(date instanceof Date)){
        return ''
    }
    let {year, month, day, hours, minutes, seconds} = extractYMDhms(date)
    return `${year}-${month}-${day} ${hours}:${minutes}`
}
