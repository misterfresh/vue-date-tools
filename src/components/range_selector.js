import startOfMonth from '/deps/date-fns/startOfMonth'
import getISOWeek from '/deps/date-fns/getISOWeek'
import startOfISOWeek from '/deps/date-fns/startOfISOWeek'
import getDate from '/deps/date-fns/getDate'
import getMonth from '/deps/date-fns/getMonth'
import getYear from '/deps/date-fns/getYear'
import setDate from '/deps/date-fns/setDate'
import setMonth from '/deps/date-fns/setMonth'
import setYear from '/deps/date-fns/setYear'
import addDays from '/deps/date-fns/addDays'
import isEqual from '/deps/date-fns/isEqual'

export default {
    name: 'range-selector',
    props: {
        viewDate: {
            type: Date,
            required: true
        },
        activeDate: {
            type: Date,
            required: false
        },
        maxDate: {
            type: Date,
            default: function(){
                return new Date()
            }
        }
    },
    computed: {
        isoWeeks: function(){
            const activeMonth = getMonth(this.viewDate)
            const monthStart = startOfMonth(this.viewDate)
            const isoWeeks = []

            let currentDay = startOfISOWeek(monthStart)
            for( let week = 0; week < 6; week++){
                let isoWeekIndex  = getISOWeek(currentDay)
                let isoWeek = {
                    index: isoWeekIndex,
                    days: []
                }
                for( let day = 0; day < 7; day++ ){
                    isoWeek.days.push({
                        isoWeek: isoWeekIndex,
                        date: currentDay,
                        day: getDate(currentDay),
                        isActiveMonth: getMonth(currentDay) === activeMonth
                    })
                    currentDay = addDays(currentDay, 1)
                }
                isoWeeks.push(isoWeek)
            }
            return isoWeeks
        }
    },
    methods: {
        isEqual,
        getDate,
        getMonth,
        getYear,
        setDate,
        setMonth,
        setYear
    },
    template: `<div class="ra-range-selector">
    <div class="ra-iso-weeks">
        <div class="ra-day ra-week-abbr">W</div>
        <div class="ra-day" v-for="isoWeek in isoWeeks">{{isoWeek.index}}</div>
    </div>
    <div class="ra-days-grid">
        <div class="ra-week ra-weekDays"><div class="ra-day" v-for="day in ('mo_tu_we_th_fr_sa_su').split('_')">{{day}}</div></div>
        <div v-for="isoWeek in isoWeeks" class="ra-week">
            <div
                    v-for="day in isoWeek.days"
                    @click="(setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date)) < maxDate) && $emit('changeDate', setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date))) && (!day.isActiveMonth && $emit('changeView', setMonth(setYear( viewDate, getYear(day.date)), getMonth(day.date))))"
                    class="ra-day"
                    :class="{
                        'ra-other-month': !day.isActiveMonth,
                        'ra-active': (!!activeDate && (getDate(day.date) === getDate(activeDate)) && (getMonth(day.date) === getMonth(activeDate)) && (getYear(day.date) === getYear(activeDate))),
                        'ra-disabled': (setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date)) > maxDate)
                    }">
                {{day.day}}
            </div>
        </div>
    </div>
</div>`
}
