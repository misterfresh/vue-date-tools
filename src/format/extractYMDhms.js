import getSeconds from "../date/getSeconds";
import getMonth from "../date/getMonth";
import getMinutes from "../date/getMinutes";
import getDate from "../date/getDate";
import getYear from "../date/getYear";
import getHours from "../date/getHours";

export default function extractYMDhms(date){
    if(!date || !(date instanceof Date)){
        return null
    }
    const year = getYear(date)
    let month = getMonth(date) +1
    if(month < 10) {
        month = '0' + month
    }
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
    return {
        year, month, day, hours, minutes, seconds
    }
}
