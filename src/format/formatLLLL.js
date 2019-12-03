// DD MMMM YYYY - HH:mm:ss

import getYear from '/deps/date-fns/getYear'
import getMonth from '/deps/date-fns/getMonth'
import getDate from '/deps/date-fns/getDate'
import getHours from '/deps/date-fns/getHours'
import getMinutes from '/deps/date-fns/getMinutes'

import capitalize from '/deps/capitalize'
import getDay from "/deps/date-fns/getDay"

export default function formatLLLL(date){

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
    const daysOfWeek = ('monday_tuesday_wednesday_thursday_friday_saturday_sunday').split('_')
    let dayOfWeek = daysOfWeek[getDay(date)]
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

    return locale === 'en' ? `${capitalize(dayOfWeek)}, ${capitalize(month)} ${day}, ${year} - ${hours}:${minutes}` : `${capitalize(dayOfWeek)} ${day} ${month} ${year} - ${hours}:${minutes}`
}
