// DD MMMM YYYY - HH:mm:ss

import getYear from '../date/getYear'
import getMonth from '../date/getMonth'
import getDate from '../date/getDate'
import getHours from '../date/getHours'
import getMinutes from '../date/getMinutes'

import capitalize from 'lib/capitalize'
import getDay from "../date/getDay"

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
    const months = t('daterangepicker.months.full').split('_')
    month = months[month]

    let day = getDate(date)
    const daysOfWeek = t('daterangepicker.days.full').split('_')
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
