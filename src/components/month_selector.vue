<template>
    <div class="month-selector">
        <button @click="$emit('changeView', addMonths(viewDate, -1))"
                class="navigation-button" :disabled="activeYear === (firstYear || (lastYear-10)) && activeMonth === 0">
            <i v-if="previousMonthIconClass" class="nav-icon" :class="previousMonthIconClass"/>
            <span v-else>&lt;</span>
        </button>
        <base-select
                :options="('jan._feb._mar._apr._may_june_july_aug._sept._oct._nov._dec.').split('_')"
                :value="('jan._feb._mar._apr._may_june_july_aug._sept._oct._nov._dec.').split('_')[activeMonth]"
                :optionDisabled="option=> (setMonth(viewDate, option) > maxDate)"
                @change="$emit('changeView', setMonth(viewDate,$event))"
                class="month-select"
        />
        <base-select
                :options="Array(lastYear - (firstYear || (lastYear-10)) + 1).fill().map(
                (_, idx) => ((firstYear || (lastYear-10)) + idx )
            ).reduce(
                (o, year) => { return Object.assign(o, {[year]: year})}, {}
            )"
                :value="activeYear"
                @change="$emit('changeView', setYear(viewDate, $event))"
                class="month-select"
        />
        <button @click="$emit('changeView', addMonths(viewDate, 1))"
                class="navigation-button" :disabled="addMonths(viewDate, 1) > maxDate">
            <i v-if="nextMonthIconClass" class="nav-icon" :class="nextMonthIconClass"/>
            <span v-else>&gt;</span>
        </button>
    </div>
</template>
<script>
    import getYear from 'date-fns/getYear'
    import BaseSelect from './base_select'
    import getMonth from 'date-fns/getMonth'
    import addMonths from 'date-fns/addMonths'
    import setMonth from 'date-fns/setMonth'
    import setYear from 'date-fns/setYear'

    export default {
        name: 'month-selector',
        computed: {
            activeMonth: function(){
                return getMonth(this.viewDate)
            },
            activeYear: function(){
                return getYear(this.viewDate)
            }
        },
        props: {
            viewDate: {
                type: Date,
                required: true
            },
            previousMonthIconClass: {
                type: String,
                default: ''
            },
            nextMonthIconClass: {
                type: String,
                default: ''
            },
            lastYear: {
                type: Number,
                default: getYear(new Date())
            },
            firstYear: {
                type: Number,
                required: false
            },
            maxDate: {
                type: Date,
                default: function(){
                    return new Date()
                }
            }
        },
        components: {
            BaseSelect
        },
        methods: {
            addMonths,
            setMonth,
            setYear
        },
    }
</script>
<style scoped>
    .month-selector {
        display: flex;
        margin-left: 3.5rem;
        width: 22rem;
        height: 3.5rem;
        justify-content: space-between;
        align-items: center;
    }

    .month-select {
        width: 8rem;
    }

    .navigation-button {
        background: transparent;
        outline: none;
        cursor: pointer;
        color: #000;
        font-weight: bold;
        padding-left: 0;
        padding-right: 0;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 0.4rem;
        border: 1px solid transparent;
        display: flex;
        justify-content: center;
    }

    .nav-icon {
        align-self: center;
    }

    .navigation-button:hover {
        background-color: #eee;
    }

    .navigation-button:disabled {
        background-color: #ddd;
        color: #eee
    }
    button:disabled {
        cursor: default;
    }
    select {
        height: 2rem;
        width: 8rem;
    }
</style>

