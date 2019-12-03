import TimeSelector from './components/time_selector'
import RangeSelector from './components/range_selector'
import MonthSelector from './components/month_selector'
import Validation from './components/validation'
import startOfMonth from '/deps/date-fns/startOfMonth'
import uuid from '/deps/uuid'
import getDateFromDDMMYYYYHHmmss from './parse/getDateFromDDMMYYYYHHmmss'
import getMonth from '/deps/date-fns/getMonth'
import getYear from '/deps/date-fns/getYear'
import setMonth from '/deps/date-fns/setMonth'
import setYear from '/deps/date-fns/setYear'
import debounce from '/deps/lodash.debounce.js'
import formatDDMMYYYYHHmmss from './format/formatDDMMYYYYHHmmss'

export default {
    name: 'date-picker',
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
        }
    },
    data: function () {
        return {
            hasFocus: false,
            viewDate: startOfMonth(this.date ? this.date : new Date()),
            activeDate: new Date(),
            id: uuid(),
            fullWidth: 0
        }
    },
    components: {
        TimeSelector,
        MonthSelector,
        RangeSelector,
        Validation
    },

    methods: {
        update: debounce(function(dateString){
            const date = getDateFromDDMMYYYYHHmmss(dateString)
            if(date && date <= new Date()){
                this.activeDate = date
                this.viewDate = setMonth(setYear( this.viewDate, getYear(date)), getMonth(date))
                this.$emit('change', date)
            }
        }, 500),
        scrollToDatePicker: function(){
            document.getElementById('input-container-' + this.id).style.width = this.fullWidth + 'px'
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
        }
    },

    filters: {
        'DDMMYYYYHHmmss': formatDDMMYYYYHHmmss,

    },

    created: function(){
        if(this.date){
            this.activeDate = this.date
        }
    },
    mounted: function(){
        this.fullWidth = document.getElementById('date-picker-input-' + this.id).offsetWidth
    },
    template: `
    <div class="date-picker-container" :class="{'including-label': !!label}" :id="'date-picker-container-' + id">
    <div v-if="!!label" class="label">{{label}}</div>
    <div class="input-container" :id="'input-container-' + id">
        <input
                class="date-picker-input"
                @focus="(hasFocus = true) && scrollToDatePicker()"
                :value="date | DDMMYYYYHHmmss"
                :placeholder="!!placeholder ? placeholder : ''"
                :style="inputStyle"
                :id="'date-picker-input-' + id"
                @input="event => { event.preventDefault(); event.stopPropagation(); update(event.target.value)}"
        />
        <div class="input-icon-container" :class="{focus: hasFocus}">
            <i :class="'input-icon icon-' + icon"/>
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
            <time-selector
                    :active-date="activeDate"
                    @changeTime="date=>{activeDate = date}"
            />
            <month-selector
                    :view-date="viewDate"
                    @changeView="date=>{viewDate = date}"
            />
            <range-selector
                    :active-date="activeDate"
                    :view-date="viewDate"
                    @changeView="date=>{viewDate = date}"
                    @changeDate="date=>{activeDate = date}"
            />
        </div>
        <validation
                @apply="$emit('change', activeDate) && (hasFocus = false)"
                @cancel="hasFocus = false"
        />
    </div>
</div>
    `,
}


