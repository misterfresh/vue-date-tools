// DD MMMM YYYY - HH[h]mm

import getYear from '../date/getYear'
import getMonth from '../date/getMonth'
import getDate from '../date/getDate'
import getHours from '../date/getHours'
import getMinutes from '../date/getMinutes'
import getSeconds from '../date/getSeconds'

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
