import DateInput from './components/date_input'
import RangeSelectable from './components/range_selectable'
import MonthSelector from './components/month_selector'
import Validation from './components/validation'
import startOfMonth from '/deps/date-fns/startOfMonth'
import uuid from '/deps/uuid'
import getRangeFromDDMMYYYYDDMMYYYY from './parse/getRangeFromDDMMYYYYDDMMYYYY'
import getMonth from '/deps/date-fns/getMonth'
import getYear from '/deps/date-fns/getYear'
import setMonth from '/deps/date-fns/setMonth'
import setYear from '/deps/date-fns/setYear'
import debounce from '/deps/lodash.debounce.js'
import addMonths from "/deps/date-fns/addMonths";
import addDays from '/deps/date-fns/addDays'

export default {
    name: 'date-range-picker-suggestions',
    props: {
        dateRange: {
            type: Array,
            default: null
        },
        maxDate: {
            type: Date,
            default: function() {
                return new Date()
            }
        },
        position: {
            type: String,
            default: "center"
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        inputStyle: {
            type: Object,
            default: function(){
                return {}
            }
        },
        parentId: {
            type: String,
            default: ''
        },

        isInput: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: 'calendar'
        },
        suggestions: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            hasFocus: false,
            viewDate: startOfMonth((this.date) ? this.date : new Date()),
            step: 'selected',
            activeRange: [typeof this.dateRange[0] !== 'undefined' && this.dateRange[0] instanceof Date ? this.dateRange[0] : addMonths(new Date(), -1), (typeof this.dateRange[1] !== 'undefined' && this.dateRange[1] instanceof Date) ? this.dateRange[1] : new Date()],
            id: uuid(),
            fullWidth: 0,
            viewRange: [startOfMonth(typeof this.dateRange[0] !== 'undefined' && this.dateRange[0] instanceof Date ? this.dateRange[0] : addMonths(new Date(), -1)), startOfMonth((typeof this.dateRange[1] !== 'undefined' && this.dateRange[1] instanceof Date) ? this.dateRange[1] : new Date())],
            hoveredDate: null,
            activeSuggestion: 'custom',
            ranges: {
                today: 'Today',
                yesterday: 'Yesterday',
                last7Days: 'Last 7 days',
                last30Days: 'Last 30 days',
                lastMonth: 'Last month',
                custom: 'Custom',
            }
        }
    },
    components: {
        DateInput,
        MonthSelector,
        RangeSelectable,
        Validation
    },

    methods: {
        update: debounce(function(rangeString){
            const range = getRangeFromDDMMYYYYDDMMYYYY(rangeString)
            if(range && range[1] <= this.maxDate){
                this.viewRange = [setMonth(setYear( this.viewRange[0], getYear(range[0])), getMonth(range[0])), setMonth(setYear( this.viewRange[1], getYear(range[0])), getMonth(range[1]))]
                this.activeRange = range
            }
        }, 500),
        scrollToDatePicker: function(){
            //document.getElementById('input-container-' + this.id).style.width = this.fullWidth + 'px'
            if(this.parentId){
                setTimeout(() => {
                    const parentContainer = document.getElementById(this.parentId)
                    const inputContainer = document.getElementById('date-picker-container-' + this.id)
                    const pickerContainer = document.getElementById('date-picker-' + this.id)
                    const invisible = (inputContainer.offsetTop + inputContainer.offsetHeight + pickerContainer.offsetHeight) - (parentContainer.scrollTop + parentContainer.offsetHeight)
                    if(invisible > 0){
                        parentContainer.scrollTop = parentContainer.scrollTop + invisible
                    }
                })
            }
        },
        updateRange: function(date){
            this.hoveredDate = null

            if(date && date instanceof Date){
                if(date > this.maxDate){
                    date = this.maxDate
                }
                let startDate = this.activeRange[0]
                let endDate = this.activeRange[1]
                let startDefined = (!!startDate && startDate instanceof Date)
                let endDefined = (!!endDate && endDate instanceof Date)
                this.activeSuggestion = 'custom'
                if(startDefined && endDefined){

                    this.activeRange = [date, null]
                } else if(startDefined && !endDefined){

                    if(startDate === date){
                        startDate = addDays(date, -1)
                    }
                    if(startDate < date){
                        this.activeRange = [startDate, date]
                    } else {
                        this.activeRange = [date, startDate]
                    }
                }
            }
        },
        updateHovered: function(date){
            if(!!date && date instanceof Date && date <= this.maxDate){
                let startDate = this.activeRange[0]
                let endDate = this.activeRange[1]
                let startDefined = (!!startDate && startDate instanceof Date)
                let endDefined = (!!endDate && endDate instanceof Date)
                if(startDefined && !endDefined){
                    this.hoveredDate = date
                }
            }
        },
        startOfMonth,
        addMonths,
        getYear
    },

    created: function(){
        if(this.date){
            this.activeDate = this.date
        }
    },
    mounted: function(){
        this.fullWidth = document.getElementById('input-container-' + this.id).offsetWidth
    },

    template: `<div class="date-picker-container" :class="{'including-label': !!label, 'as-input': !!isInput}" :id="'date-picker-container-' + id">
    <div v-if="!!label" class="label">{{label}}<span v-if="!!required" class="required">*</span></div>
    <div class="input-container" :id="'input-container-' + id">
        <input
                class="date-picker-input"
                :class="{focus: hasFocus, icon: !!icon}"
                @focus="(hasFocus = true) && scrollToDatePicker()"
                :value="dateRange | DDMMYYYYDDMMYYYY"
                :placeholder="!!placeholder ? placeholder : ''"
                :style="inputStyle"
                :id="'date-picker-input-' + id"
                @input="event => { event.preventDefault(); event.stopPropagation(); update(event.target.value)}"
        />
        <div v-if="!!icon" class="input-icon-container" :class="{focus: hasFocus}">
            <i :class="'input-icon icon-' + icon + (!!hasFocus ? ' focus' : '')" />
        </div>
        <div v-if="!isInput" class="input-icon-container action" :class="{focus: hasFocus}">
            <i :class="'input-icon icon-chevron-' + (hasFocus ? 'up' : 'down') + (hasFocus ? ' focus' : '')"/>
        </div>
    </div>
    <div v-if="hasFocus" class="date-picker-underlay" @click="hasFocus=false"></div>
    <div
            class="date-picker"
            v-if="hasFocus"
            :class="{
                [position]: true
            }"
            :id="'date-picker-' + id"

    >
        <div class="date-picker-inner">
            <date-input
                    :date="activeRange[0]"
                    :style="{marginTop: '1rem', marginLeft: '0.5rem'}"
                    :input-style="{width: '25rem'}"
                    :max-date="maxDate"
                    @change="date => {
                        viewRange = [date, viewRange[1] > date ? viewRange[1] : (startOfMonth(addMonths(date, 1)) < maxDate ? startOfMonth(addMonths(date, 1)) : startOfMonth(maxDate))];
                        activeRange = [date, dateRange[1] > date ? dateRange[1] : Math.min(addMonths(date, 1), maxDate)];
                    }"
            />
            <month-selector
                    :view-date="viewRange[0]"
                    @changeView="date=>{ viewRange = [date, viewRange[1] > date ? viewRange[1] : (startOfMonth(addMonths(date, 1)) < maxDate ? startOfMonth(addMonths(date, 1)) : startOfMonth(maxDate))]}"
                    :max-date="addMonths(maxDate, -1)"
                    :first-year="getYear(new Date()) - 5"
            />
            <range-selectable
                    :active-date="activeRange[0]"
                    :active-range="activeRange"
                    :view-date="viewRange[0]"
                    @changeView="date=>{viewRange = [date, viewRange[1] > date ? viewRange[1] : (startOfMonth(addMonths(date, 1)) < maxDate ? startOfMonth(addMonths(date, 1)) : startOfMonth(maxDate))]}"
                    @changeDate="date=>{updateRange(date)}"
                    :max-date="maxDate"
                    @hover="updateHovered"
                    :hovered-date="hoveredDate"
            />
        </div>
        <div class="date-picker-inner">

            <date-input
                    :date="activeRange[1]"
                    :style="{marginTop: '1rem', marginLeft: '0.5rem'}"
                    :input-style="{width: '25rem'}"
                    @change="date => {
                        viewRange = [viewRange[0] <= date ? viewRange[0] : startOfMonth(addMonths(date, -1)), date];
                        activeRange = [dateRange[0] <= date ? dateRange[0] : addMonths(date, -1), date]
                    }"
                    :max-date="maxDate"
            />

            <month-selector
                    :view-date="viewRange[1]"
                    @changeView="date=>{viewRange = [viewRange[0] <= date ? viewRange[0] : startOfMonth(addMonths(date, -1)), date]}"
                    :max-date="maxDate"
                    :first-year="getYear(new Date()) - 5"
            />
            <range-selectable
                    :active-date="activeRange[1]"
                    :active-range="activeRange"
                    :view-date="viewRange[1]"
                    @changeView="date=>{viewRange = [viewRange[0] <= date ? viewRange[0] : startOfMonth(addMonths(date, -1)), date]}"
                    @changeDate="date=>{updateRange(date)}"
                    :max-date="maxDate"
                    @hover="updateHovered"
                    :hovered-date="hoveredDate"
            />
        </div>
        <div class="date-picker-suggestions">
            <div class="date-picker-suggestion" :class="{active:(label === activeSuggestion)}" v-for="(suggestion, label) in suggestions" @click="() => {
                viewRange = suggestion
                activeRange = suggestion
                activeSuggestion = label

            }">
                {{ ranges[label] }}
            </div>
            <validation
                    @apply="$emit('change', activeRange) && (hasFocus = false)"
                    @cancel="hasFocus = false"
            />
        </div>
    </div>
</div>`
}
