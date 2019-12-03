import getYear from '/deps/date-fns/getYear'
import BaseSelect from './base_select'
import getMonth from '/deps/date-fns/getMonth'
import addMonths from '/deps/date-fns/addMonths'
import setMonth from '/deps/date-fns/setMonth'
import setYear from '/deps/date-fns/setYear'

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
            default: 'icon-chevron-left'
        },
        nextMonthIconClass: {
            type: String,
            default: 'icon-chevron-right'
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
    template: `<div class="month-selector">
    <button @click="$emit('changeView', addMonths(viewDate, -1))"
            class="navigation-button" :disabled="activeYear === (firstYear || (lastYear-10)) && activeMonth === 0">
        <i v-if="previousMonthIconClass" class="nav-icon" :class="previousMonthIconClass"/>
        <span v-else><</span>
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
        <span v-else>></span>
    </button>
</div>`
}
