<template>
    <div class="date-picker-arrows" :class="{'including-label': !!label}" :id="'date-picker-container-' + id">
        <div v-if="!!label" class="label">{{label}}</div>
        <div class="input-container" :id="'input-container-' + id">
            <button class="navigation previous" :disabled="disabled" @click="()=>{$emit('change', addDays(date, -1)); hasFocus = false}">
                <i v-if="previousDayIconClass" class="direction" :class="previousDayIconClass"></i>
                <span v-else class="direction">&lt;</span>
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
                <i v-if="nextDayIconClass" class="direction" :class="nextDayIconClass"></i>
                <span v-else class="direction">&gt;</span>
            </button>
        </div>
        <div v-if="hasFocus" class="date-picker-underlay" @click="hasFocus=false"></div>
        <div
                class="date-picker-arrows-overlay"
                v-if="hasFocus"
                :class="{
                    [position]: true,
                    'including-label': !!label
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
    </div>
</template>
<script>

    import RangeSelector from './components/range_selector'
    import MonthSelector from './components/month_selector'
    import startOfMonth from 'date-fns/startOfMonth'
    import uuid from './utils/uuid'
    import getDateFromDDMMYYYY from './parse/getDateFromDDMMYYYY'
    import getMonth from 'date-fns/getMonth'
    import getYear from 'date-fns/getYear'
    import setMonth from 'date-fns/setMonth'
    import setYear from 'date-fns/setYear'
    import debounce from 'lodash.debounce'
    import addDays from "date-fns/addDays"
    import formatDDMMYYYY from './format/formatDDMMYYYY'

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
            },
            previousDayIconClass: {
                type: String,
                default: ''
            },
            nextDayIconClass: {
                type: String,
                default: ''
            },
        },
        data: function () {
            return {
                hasFocus: false,
                viewDate: startOfMonth(this.date ? this.date : new Date()),
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

        filters: {
            'DDMMYYYY': formatDDMMYYYY
        },

    }
</script>
<style scoped>
    .date-picker-arrows {
        position: relative;
        display: block;
        height: 4rem;
    }
    .including-label {
        height: 6rem;
    }

    .input-container {
        position: relative;
        height: 4rem;
        width: 22rem;
        display: flex;
    }

    .date-picker-input {
        text-align: left;
        padding-left: 3.8rem;
        fill: transparent;
        color: #35495d;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        width: 14rem;
        line-height: 1.6rem;
        border-radius: 0rem;
        border: 2px solid #35495d;
        font-size: 1.8rem;
        font-weight: normal;
        box-sizing: border-box;
        height: 4rem;
        border-left: none;
        border-right: none;
        padding-top: 0rem;

    }

    .date-picker-input:focus {
        border-color: #35495d;
        background-color: #35495d;
        color: #fff;
        outline: none;
        box-shadow: none;
        position: absolute;
        z-index: 12351;
        top: 0;
        left: 4rem;
        width: 14rem;
    }

    .date-picker-underlay {
        position: fixed;
        z-index: 12350;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        background-color: #aaa;
        opacity: 0.15;
    }

    .date-picker-arrows-overlay {
        position: absolute;
        z-index: 12400;
        display: flex;
        background-color: #fff;
        border-radius: 0.4rem;
        padding: 0.4rem;
        flex-direction: row;
        border: 1px solid #eee;
        justify-content: center;
    }

    .date-picker-inner {
        display: flex;
        flex-direction: column;
    }

    .input-icon-container{
        position: absolute;
        left: 4rem;
        padding: 0;
        margin: 0;
        top: 0;
        height: 4rem;
        width: 4rem;
        display: flex;
        justify-content: center;
        pointer-events: none;
    }
    .input-icon-container.focus {
        z-index: 12352;
    }
    .input-icon-container.focus i{
        color: #fff;
    }
    .input-icon {
        align-self: center;
        padding: 0;
        margin: 0;
        color: #35495d;
    }
    .input-icon-focus {
        color: #fff;
    }
    .input-container:hover input{
        color: #fff;
        border-color: #35495d;
        background-color: #35495d;
    }
    .input-container:hover i{
        color: #fff;
    }
    .top {

    }

    .bottom {
        width: 30rem;
        height: 20rem;
        top: 5.8rem;
    }

    .bottom-left {
        width: 30rem;
        height: 20rem;
        top: 4rem;
        right: 0;
    }

    .left {

    }

    .right {

    }

    .label {
        color: #999;
        font-size: 1.4rem;
        padding-left: 15px;
        height: 20px;
        white-space: nowrap;
        max-width: 95vw;
        overflow: hidden;
    }

   .navigation{
        background-color: #35495d;
        border: 2px solid #35495d;
        cursor: pointer;
        display: flex;
        justify-content: center;
        border-left: none;
        border-right: none;
        width: 4rem;
        height: 4rem;
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        outline: 0;
    }
    .navigation:hover{
        background-color: #637f9a;
        border: 2px solid #637f9a;
        border-left: none;
        border-right: none;
    }
    .navigation:hover i {
        color: #fff;
    }
   .navigation:disabled {
        border: 2px solid rgba(53, 73, 93, 0.5);
        fill: rgba(53, 73, 93, 0.5);
        background-color: rgba(53, 73, 93, 0.5);
        cursor: not-allowed;
    }
    .previous {
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
    }
    .previous:disabled {
        border-right: none;
    }
    .next {
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;
    }
    .next:disabled {
        border-left: none;
    }
    .next.focus {
        position: absolute;
        right: 0;
        top: 0;
    }
    .direction {
        background-color: transparent;
        color: #fff;
        align-self: center;
        font-size: 1.6rem;
        font-weight: bold;
    }

</style>
