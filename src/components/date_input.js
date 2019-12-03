import getMonth from '/deps/date-fns/getMonth'
import getYear from '/deps/date-fns/getYear'
import setMonth from '/deps/date-fns/setMonth'
import setYear from '/deps/date-fns/setYear'
import getDateFromDDMMYYYY from './../parse/getDateFromDDMMYYYY'
import debounce from '/deps/lodash.debounce.js'
import formatDDMMYYYY from './../format/formatDDMMYYYY'

export default {
    name: 'date-input',
    props: {
        maxDate: {
            type: Date,
            default: function() {
                return new Date()
            }
        },
        date: {
            type: Date
        },
        inputStyle: {
            type: Object,
            default: function(){
                return {}
            }
        },
    },
    data: function(){
        return {
            hasFocus: false
        }
    },

    methods: {
        update: debounce(function(dateString){
            const date = getDateFromDDMMYYYY(dateString)
            if(date && date <= this.maxDate){
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
        'DDMMYYYY': formatDDMMYYYY
    },
    template: `<div class="di-input-container">
    <input
            @focus="(hasFocus = true)"
            @blur="(hasFocus = false)"
            :value="date | DDMMYYYY"
            class="di-date-input"
            :class="{focused: hasFocus}"
            :style="inputStyle"
            @input="event => { event.preventDefault(); event.stopPropagation(); update(event.target.value)}"
    >
    <div class="di-input-icon-container" :class="{focused: hasFocus}">
        <i :class="'di-input-icon icon-calendar'"/>
    </div>
</div>`
}
