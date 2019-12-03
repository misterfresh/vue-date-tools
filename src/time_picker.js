import NumberIncrement from './components/number_increment'
import uuid from '/deps/uuid'
import getTimeFromHHmm from './parse/getTimeFromHHmm'
import debounce from '/deps/lodash.debounce.js'
import formatHHmm from './format/formatHHmm'

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
        }
    },

    mounted: function(){
        this.fullWidth = document.getElementById('date-picker-input-' + this.id).offsetWidth
    },

    filters: {
        'HHmm': formatHHmm
    },

    template: `<div class="date-picker-container" :class="{'including-label': !!label}" :id="'date-picker-container-' + id">
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
</div>`
}


