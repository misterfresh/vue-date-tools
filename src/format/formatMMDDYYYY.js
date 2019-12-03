// MM DD, YYYY

import getYear from '/deps/date-fns/getYear'
import getMonth from '/deps/date-fns/getMonth'
import getDate from '/deps/date-fns/getDate'
import capitalize from '/deps/capitalize'

export default function formatMMDDYYYY(date){

    if(!date || !(date instanceof Date)){
        if(!!date && (typeof date === 'string' || date instanceof String) && (new Date(date)) instanceof Date ){
            date = new Date(date)
        } else {
            return ''
        }
    }
    const year = getYear(date)
    let month = getMonth(date)
    const months = ('jan._feb._mar._apr._may_june_july_aug._sept._oct._nov._dec.').split('_')
    month = months[month]

    let day = getDate(date)

    return locale === 'en' ? `${capitalize(month)} ${day}, ${year}` : `${day} ${capitalize(month)} ${year}`
}
