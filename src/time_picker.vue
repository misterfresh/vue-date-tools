<template>
    <div class="time-picker" :class="{'including-label': !!label}" :id="'date-picker-container-' + id">
        <div v-if="!!label" class="label">{{label}}</div>
        <div class="input-container" :id="'input-container-' + id">
            <input
                    class="date-picker-input"
                    @focus="(hasFocus = true) && scrollToDatePicker()"
                    :value="time | HHmm"
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
            <div class="date-picker-inner" :style="{height: '100%', width: '100%'}">
                <div class="time-increments" :style="{height: '80%', width: '100%'}">
                    <number-increment
                            :value="(!!time && time instanceof Date ) ? time.getHours() : undefined"
                            :range="[0,23]"
                            @change="hours=>{$emit('change', setHours(time ? time : new Date(), hours))}"
                            :style="{height: '100%', width: '40%'}"
                    />
                    <div class="time-separator" :style="{height: '100%', width: '20%'}">:</div>
                    <number-increment
                            :value="(!!time && time instanceof Date ) ? time.getMinutes() : undefined"
                            :range="[0,59]"
                            @change="minutes=>{$emit('change', setMinutes(time ? time : new Date(), minutes))}"
                            :style="{height: '100%', width: '40%'}"
                    />
                </div>
                <div class="erase-time" :style="{height: '20%', width: '100%'}" @click="() => $emit('change', undefined)">
                    <i class="icon-trash erase-icon" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import NumberIncrement from './components/number_increment'
import uuid from './utils/uuid'
import getTimeFromHHmm from './parse/getTimeFromHHmm'
import debounce from 'lodash.debounce'
import formatHHmm from './format/formatHHmm'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

export default {
    name: 'time-picker',
    props: {
        time: {
            type: Date,

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
            default: '--:--'
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
            id: uuid(),
            fullWidth: 0
        }
    },
    components: {
        NumberIncrement,
    },

    methods: {
        update: debounce(function(timeString){
            const time = getTimeFromHHmm(timeString)
            if(time ){
                this.$emit('change', time)
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
        },
        setHours,setMinutes,
    },

    mounted: function(){
        this.fullWidth = document.getElementById('date-picker-input-' + this.id).offsetWidth
    },

    filters: {
        'HHmm': formatHHmm
    },
}
</script>
<style scoped>
    .time-picker {
        position: relative;
        display: block;
        height: 3.8rem;
        width: 26rem;
    }
    .including-label {
        height: 5.8rem;
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
        height: 3.8rem;
        width: 26rem;
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
        opacity: 0.2;
    }

    .date-picker {
        position: absolute;
        z-index: 12400;
        display: flex;
        background-color: #fff;
        border-radius: 0.4rem;
        padding: 0.4rem;
        flex-direction: row;
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
        height: 3.8rem;
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
        width: 26rem;
        height: 17rem;
        top: 6rem;
        left: 0;
    }

    .including-label .bottom {
        top: 5.8rem;
    }

    .bottom-left {
        width: 28rem;
        height: 17rem;
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

    .time-increments {
        display: flex;
        flex-direction: row;
    }

    .time-separator {
        font-size: 1.6rem;
        color: #212529;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .erase-time {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    .erase-icon {
        color:#6e2c87;
        align-self: center;
        font-size: 1.6rem;
    }

</style>
