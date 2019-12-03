// DD/MM/YYYY - DD/MM/YYYY

import getDateFromDDMMYYYY from './getDateFromDDMMYYYY'

export default function getRangeFromDDMMYYYYDDMMYYYY(rangeString){
    if(!rangeString){
        return null
    }
    if(!( typeof rangeString === 'string' || rangeString instanceof String)){
        rangeString = rangeString + ''
    }
    if(rangeString.length < 17){
        return null
    }
    let rangeParts = rangeString.split('-')
    if(rangeParts.length !== 2) {
        return null
    }

    const startDate = getDateFromDDMMYYYY((rangeParts[0]).trim())
    const endDate = getDateFromDDMMYYYY((rangeParts[1]).trim())

    if(!startDate || !(startDate instanceof Date) || !endDate || !(endDate instanceof Date)){
        return null
    }

    return startDate < endDate ? [startDate, endDate] : [endDate, startDate]
}
