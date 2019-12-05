// DD MMMM YYYY - HH:mm:ss

import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import getSeconds from 'date-fns/getSeconds'

export default function formatDDMMMMYYYYHHhmmss(date){

    if(!date || !(date instanceof Date)){
        if(!!date && (typeof date === 'string' || date instanceof String) && (new Date(date)) instanceof Date ){
            date = new Date(date)
        } else {
            return ''
        }
    }
    const year = getYear(date)
    let month = getMonth(date)
    const months = ('january_february_march_april_may_june_july_august_september_october_november_december').split('_')
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
    return `${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`
}
