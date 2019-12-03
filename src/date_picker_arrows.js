import RangeSelector from './components/range_selector'
import MonthSelector from './components/month_selector'
import startOfMonth from '/deps/date-fns/startOfMonth'
import uuid from '/deps/uuid'
import getDateFromDDMMYYYY from './parse/getDateFromDDMMYYYY'
import getMonth from '/deps/date-fns/getMonth'
import getYear from '/deps/date-fns/getYear'
import setMonth from '/deps/date-fns/setMonth'
import setYear from '/deps/date-fns/setYear'
import debounce from '/deps/lodash.debounce.js'
import addDays from "/deps/date-fns/addDays"

export default {
    name: 'date-picker-arrows',
    props: {
        date: {
            type: Date,
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
            default: "bottom"
        },
        icon: {
            type: String,
            default: "calendar"
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
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            hasFocus: false,
            viewDate: startOfMonth(!!this.date ? this.date : new Date()),
            id: uuid(),
            inputWidth: 0,
            containerWidth: 0
        }
    },
    components: {
        MonthSelector,
        RangeSelector
    },

    methods: {
        update: debounce(function(dateString){
            console.log('got', dateString)
            const date = getDateFromDDMMYYYY(dateString)
            if(date && date <= new Date()){

                this.viewDate = setMonth(setYear( this.viewDate, getYear(date)), getMonth(date))
                this.$emit('change', date)
            }
        }, 700),
        scrollToDatePicker: function(){
            document.getElementById('input-container-' + this.id).style.width = this.containerWidth + 'px'
            document.getElementById('date-picker-input-' + this.id).style.width = this.inputWidth + 'px'
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

        addDays
    },

    mounted: function(){
        this.inputWidth = document.getElementById('date-picker-input-' + this.id).offsetWidth
        this.containerWidth = document.getElementById('input-container-' + this.id).offsetWidth
    },

    template: `<div class="date-picker-container" :class="{'including-label': !!label}" :id="'date-picker-container-' + id">
    <div v-if="!!label" class="label">{{label}}</div>
    <div class="input-container" :id="'input-container-' + id">
        <button class="navigation previous" :disabled="disabled" @click="()=>{$emit('change', addDays(date, -1)); hasFocus = false}">
            <i class="icon-chevron-left direction"></i>
        </button>
        <input
                class="date-picker-input"
                @focus="(hasFocus = true) && scrollToDatePicker()"
                :value="date | DDMMYYYY"
                :placeholder="!!placeholder ? placeholder : ''"
                :style="inputStyle"
                :class="{'is-disabled':disabled}"
                :id="'date-picker-input-' + id"
                @input="event => { event.preventDefault(); event.stopPropagation(); update(event.target.value)}"
        />
        <div class="input-icon-container" :class="{focus: hasFocus}">
            <i :class="'input-icon icon-' + icon" />
        </div>
        <button class="navigation next" :disabled="!!disabled || (addDays(date, 1) > maxDate)" @click="()=>{$emit('change', addDays(date, 1)); hasFocus = false}" :class="{focus: hasFocus}">
            <i class="icon-chevron-right direction"></i>
        </button>
    </div>
    <div v-if="hasFocus" class="date-picker-underlay" @click="hasFocus=false"></div>
    <div
            class="date-picker"
            v-if="hasFocus"
            :class="{
                top: position === 'top',
                bottom: position === 'bottom',
                left: position === 'left',
                right: position === 'right',
                'bottom-left': position === 'bottom-left'
            }"
            :id="'date-picker-' + id"

    >
        <div class="date-picker-inner">
            <month-selector
                    :view-date="viewDate"
                    @changeView="date=>{viewDate = date}"
            />
            <range-selector
                    :active-date="date"
                    :view-date="viewDate"
                    @changeView="date=>{viewDate = date}"
                    @changeDate="date=>{$emit('change', date); hasFocus = false;}"
            />
        </div>
    </div>
</div>`
}

