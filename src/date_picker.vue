<template>
    <div class="date-picker" :class="{'including-label': !!label}" :id="'date-picker-container-' + id">
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
                class="date-picker-overlay"
                v-if="hasFocus"
                :class="{
                    [position]: true,
                    'including-label': !!label
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
</template>
<script>

    import TimeSelector from './components/time_selector'
    import RangeSelector from './components/range_selector'
    import MonthSelector from './components/month_selector'
    import Validation from './components/validation'
    import startOfMonth from 'date-fns/startOfMonth'
    import uuid from './utils/uuid'
    import getDateFromDDMMYYYYHHmmss from './parse/getDateFromDDMMYYYYHHmmss'
    import getMonth from 'date-fns/getMonth'
    import getYear from 'date-fns/getYear'
    import setMonth from 'date-fns/setMonth'
    import setYear from 'date-fns/setYear'
    import debounce from 'lodash.debounce'
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
                default: function () {
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
                default: function () {
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
            update: debounce(function (dateString) {
                const date = getDateFromDDMMYYYYHHmmss(dateString)
                if (date && date <= new Date()) {
                    this.activeDate = date
                    this.viewDate = setMonth(setYear(this.viewDate, getYear(date)), getMonth(date))
                    this.$emit('change', date)
                }
            }, 500),
            scrollToDatePicker: function () {
                document.getElementById('input-container-' + this.id).style.width = this.fullWidth + 'px'
                if (this.parentId) {
                    setTimeout(() => {
                        const parentContainer = document.getElementById(this.parentId)
                        const inputContainer = document.getElementById('date-picker-container-' + this.id)
                        const pickerContainer = document.getElementById('date-picker-' + this.id)
                        const invisible = (inputContainer.offsetTop + inputContainer.offsetHeight + pickerContainer.offsetHeight) - (parentContainer.scrollTop + parentContainer.offsetHeight)
                        if (invisible > 0) {
                            parentContainer.scrollTop = parentContainer.scrollTop + invisible
                        }
                    })
                }
            }
        },

        filters: {
            'DDMMYYYYHHmmss': formatDDMMYYYYHHmmss,
        },

        created: function () {
            if (this.date) {
                this.activeDate = this.date
            }
        },
        mounted: function () {
            this.fullWidth = document.getElementById('date-picker-input-' + this.id).offsetWidth
        },
    }
</script>
<style scoped>
    .date-picker {
        position: relative;
        display: block;
        height: 4rem;
    }
    .date-picker.including-label {
        height: 6rem;
    }

    .input-container {
        position: relative;
        height: 4rem;
    }

    .date-picker-input {
        font-size: 1.6rem;
        padding-top: 0rem;
        background-color: #fff;
        border: 1px solid #c0d1d1;
        text-align: left;
        padding-left: 3.8rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        color: #303038;
        border-radius: 0.8rem;
        line-height: 1.25;
        height: 4rem;
    }

    .date-picker-input:focus {
        border-color: #51bdba;
        outline: none;
        box-shadow: none;
        position: absolute;
        z-index: 12351;
        top: 0;
        left: 0;
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
        opacity: 0.1;
    }

    .date-picker-overlay {
        position: absolute;
        z-index: 12400;
        display: flex;
        background-color: #fff;
        border-radius: 0.4rem;
        padding: 0.4rem;
        flex-direction: column;
        border: 1px solid #eee;
        justify-content: center;
    }

    .date-picker-inner {
        display: flex;
        flex-direction: column;
    }

    .input-icon-container{
        position: absolute;
        left: 0;
        padding: 0;
        margin: 0;
        top: 0;
        height: 4rem;
        width: 4rem;
        display: flex;
        justify-content: center;
    }
    .input-icon-container.focus {
        z-index: 12352;
    }
    .input-icon {
        align-self: center;
        padding: 0;
        margin: 0;
    }

    .top {

    }

    .bottom {
        width: 28rem;
        height: 28rem;
    }

    @media (min-width: 768px) {
        .date-picker-overlay {
            flex-direction: row;
        }
        .bottom {
            width: 44rem;
            height: 23rem;
        }
    }

    .bottom-left {
        width: 44rem;
        height: 23rem;
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
    }

</style>
