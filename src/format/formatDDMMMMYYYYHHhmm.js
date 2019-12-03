// DD MMMM YYYY - HH[h]mm

import getYear from '/deps/date-fns/getYear'
import getMonth from '/deps/date-fns/getMonth'
import getDate from '/deps/date-fns/getDate'
import getHours from '/deps/date-fns/getHours'
import getMinutes from '/deps/date-fns/getMinutes'
import getSeconds from '/deps/date-fns/getSeconds'

export default function formatDDMMMMYYYYHHhmm(date){

    if(!date || !(date instanceof Date)){
        return ''
    }
    const year = getYear(date)
    let month = getMonth(date)
    const months = t('daterangepicker.months.full').split('_')
    month = months[month]

    let day = getDate(date)
    if(day < 10){
        day = '0' + day
    }
    let hours = getHours(date)
    if(hours < 10){
        hours = '0' + hours
    }
    let minutes = getMinutes(date)
    if(minutes < 10){
        minutes = '0' + minutes
    }
    let seconds = getSeconds(date)
    if(seconds < 10){
        seconds = '0' + seconds
    }
    return `${day} ${month} ${year} - ${hours}h${minutes}`
}
