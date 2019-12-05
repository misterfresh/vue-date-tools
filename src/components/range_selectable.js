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
    name: 'range-selectable',
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
        },
        activeRange: {
            type: Array,
            default: null
        },
        hoveredDate: {
            type: Date,
            required: false
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
        setYear,
        handleClick: function(day){

            if(!this.activeDate){
                this.$emit('changeDate', day.date)
            } else {
                if(  setDate( setMonth( setYear( this.activeDate, getYear(day.date)), getMonth(day.date) ), getDate(day.date) ) <= this.maxDate ) {

                    this.$emit('changeDate', setDate( setMonth( setYear( this.activeDate, getYear(day.date) ), getMonth(day.date) ), getDate(day.date) ) )
                }
            }

             if(!day.isActiveMonth) {
                 this.$emit('changeView', setMonth(setYear( this.viewDate, getYear(day.date)), getMonth(day.date)))
             }
        }
    },
    template: `<div class="range-selectable">
    <div class="iso-weeks">
        <div class="day week-abbr">W</div>
        <div class="day" v-for="isoWeek in isoWeeks">{{isoWeek.index}}</div>
    </div>
    <div class="days-grid">
        <div class="week weekDays"><div class="day" v-for="day in ('mo_tu_we_th_fr_sa_su').split('_')">{{day}}</div></div>
        <div v-for="isoWeek in isoWeeks" class="week">
            <div
                    v-for="day in isoWeek.days"
                    @click="handleClick(day)"
                    @mouseover="$emit('hover', day.date)"
                    class="day"
                    :class="{
                        'other-month': !day.isActiveMonth,
                        'disabled': (setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date)) > maxDate),
                        'range': !!activeRange && !!activeRange[0] && activeRange[0] instanceof Date && (
                            ( !!activeRange[1] && activeRange[1] instanceof Date && (
                                (activeRange[0] <= day.date && day.date <= activeRange[1])
                                || (activeRange[0] >= day.date && day.date >= activeRange[1])
                            ) ) || (!!hoveredDate && hoveredDate instanceof Date && (
                                (activeRange[0] <= day.date && day.date <= hoveredDate)
                                || (activeRange[0] >= day.date && day.date >= hoveredDate)
                            )) ),
                         'active': (!!activeRange && !!activeRange[0] && activeRange[0] instanceof Date && (getDate(day.date) === getDate(activeRange[0])) && (getMonth(day.date) === getMonth(activeRange[0])) && (getYear(day.date) === getYear(activeRange[0]))) || (!!activeRange && !!activeRange[1] && activeRange[1] instanceof Date && (getDate(day.date) === getDate(activeRange[1])) && (getMonth(day.date) === getMonth(activeRange[1])) && (getYear(day.date) === getYear(activeRange[1]))),
                    }">
                {{day.day}}
            </div>
        </div>
    </div>
</div>`
}
