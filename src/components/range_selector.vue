<template>
    <div class="range-selector">
        <div class="iso-weeks">
            <div class="day week-abbr">W</div>
            <div class="day" v-for="isoWeek in isoWeeks" :key="isoWeek.index">{{isoWeek.index}}</div>
        </div>
        <div class="days-grid">
            <div class="week weekDays"><div class="day" v-for="day in ('mo_tu_we_th_fr_sa_su').split('_')" :key="day">{{day}}</div></div>
            <div v-for="isoWeek in isoWeeks" class="week" :key="isoWeek.index">
                <div
                        v-for="day in isoWeek.days"
                        :key="isoWeek.index + '-' + day.day"
                        @click="(setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date)) < maxDate) && $emit('changeDate', setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date))) && (!day.isActiveMonth && $emit('changeView', setMonth(setYear( viewDate, getYear(day.date)), getMonth(day.date))))"
                        class="day"
                        :class="{
                        'other-month': !day.isActiveMonth,
                        'active': (!!activeDate && (getDate(day.date) === getDate(activeDate)) && (getMonth(day.date) === getMonth(activeDate)) && (getYear(day.date) === getYear(activeDate))),
                        'disabled': (setDate(setMonth(setYear( activeDate, getYear(day.date)), getMonth(day.date)), getDate(day.date)) > maxDate)
                    }">
                    {{day.day}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import startOfMonth from 'date-fns/startOfMonth'
    import getISOWeek from 'date-fns/getISOWeek'
    import startOfISOWeek from 'date-fns/startOfISOWeek'
    import getDate from 'date-fns/getDate'
    import getMonth from 'date-fns/getMonth'
    import getYear from 'date-fns/getYear'
    import setDate from 'date-fns/setDate'
    import setMonth from 'date-fns/setMonth'
    import setYear from 'date-fns/setYear'
    import addDays from 'date-fns/addDays'
    import isEqual from 'date-fns/isEqual'

    export default {
        name: 'range-selector',
        props:{
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
    }
</script>
<style scoped>
    .range-selector {
        display: flex;
        width: 26rem;
    }
    .iso-weeks {
        display: flex;
        flex-direction: column;
        width: 2rem;
        font-size: 1.4rem;
        color: #ccc;
        margin-right: 1rem;
    }
    .days-grid {
        display: flex;
        flex-direction: column;
        width: 24rem;
        justify-content: space-between;
    }
    .week {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .week-abbr {
        color: #ccc;
    }
    .weekDays {
        font-weight: bold;
    }
    .day {
        width: 2rem;
        height: 2rem;
        border-radius: 0.4rem;
        border: 1px solid transparent;
        cursor: pointer;
        white-space: nowrap;
        text-align: center;
        min-width: 3.2rem;
        line-height: 2rem;
    }
    .day:hover{
        background-color: #eee;
        border-color: transparent;
        color: inherit;
    }
    .active:hover{
        background-color: #357ebd;
        border-color: transparent;
        color: #fff;
    }
    .day.disabled, .day.disabled:hover {
        color: #ccc;
        background-color: transparent;
        border-color: transparent;
        cursor: default;
    }
    .other-month{
        background-color: #fff;
        border-color: transparent;
        color: #999;
    }
    .active {
        background-color: #357ebd;
        border-color: transparent;
        color: #fff;
    }
</style>
