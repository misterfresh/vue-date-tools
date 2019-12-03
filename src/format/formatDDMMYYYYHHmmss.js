// DD/MM/YYYY HH:mm:ss

import extractYMDhms from "./extractYMDhms"

export default function formatDDMMYYYYHHmmss(date){

    if(!date || !(date instanceof Date)){
        return ''
    }
    let {year, month, day, hours, minutes, seconds} = extractYMDhms(date)
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
