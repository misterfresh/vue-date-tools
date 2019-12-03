// DD/MM/YYYY - DD/MM/YYYY

import formatDDMMYYYY from './formatDDMMYYYY'

export default function formatDDMMYYYYDDMMYYYY(dateRange){
    if(!dateRange || !Array.isArray(dateRange) || dateRange.length !== 2){
        return ''
    }
    const startDate = dateRange[0]
    const endDate = dateRange[1]

    return `${formatDDMMYYYY(startDate)} - ${formatDDMMYYYY(endDate)}`
}

