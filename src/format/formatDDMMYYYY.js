// DD/MM/YYYY

import extractYMDhms from './extractYMDhms'

export default function formatDDMMYYYY(date){
    if(!date || !(date instanceof Date)){
        return ''
    }
    let {year, month, day, hours, minutes, seconds} = extractYMDhms(date)

    return `${day}/${month}/${year}`
}
