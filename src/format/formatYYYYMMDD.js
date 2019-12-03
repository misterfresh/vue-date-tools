// YYYY-MM-DD

import extractYMDhms from './extractYMDhms'

export default function formatYYYYMMDD(date){
    if(!date || !(date instanceof Date)){
        return ''
    }
    let {year, month, day, hours, minutes, seconds} = extractYMDhms(date)

    return `${year}-${month}-${day}`
}
