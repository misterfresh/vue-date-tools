<template>
    <div class="date-input-container">
        <input
                @focus="(hasFocus = true)"
                @blur="(hasFocus = false)"
                :value="date | DDMMYYYY"
                class="date-input"
                :class="{focused: hasFocus}"
                :style="inputStyle"
                @input="event => { event.preventDefault(); event.stopPropagation(); update(event.target.value)}"
        >
        <div class="input-icon-container" :class="{focused: hasFocus}">
            <i :class="'input-icon icon-calendar'"/>
        </div>
    </div>
</template>
<script>
    import getMonth from 'date-fns/getMonth'
    import getYear from 'date-fns/getYear'
    import setMonth from 'date-fns/setMonth'
    import setYear from 'date-fns/setYear'
    import getDateFromDDMMYYYY from './../parse/getDateFromDDMMYYYY'
    import debounce from 'lodash.debounce'
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
    }
</script>
<style scoped>
    .date-input-container {
        position: relative;
        display: block;
    }
    .date-input {
        border-radius: 0.4rem;
    }
    input{
        height: 3rem;
        line-height: 3rem;
        display: block;
        vertical-align: middle;
        margin: 0 0 0.5rem 0;
        padding: 0 0.6rem 0 2.8rem;
        width: 100%;
        outline: 0;
        border: 1px solid #ccc;
        font-size: 1.4rem;
    }
    input:focus{
        outline: 0;
    }
    input.focused {
        border: 1px solid #40b883;
    }
    i {
        align-self: center;
        padding: 0;
        margin: 0;
    }
    .input-icon-container{
        position: absolute;
        left: 0rem;
        padding: 0;
        margin: 0;
        top: 0rem;
        height: 3rem;
        width: 3rem;
        display: flex;
        justify-content: center;
        pointer-events: none;
    }
    @media (min-width: 768px) {
        .date-input {
            padding-left: 3.8rem;
        }
    }
</style>
