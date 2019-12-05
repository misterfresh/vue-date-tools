import setHours from '/deps/date-fns/setHours'
import setMinutes from '/deps/date-fns/setMinutes'
import setSeconds from '/deps/date-fns/setSeconds'
import getHours from '/deps/date-fns/getHours'
import getMinutes from '/deps/date-fns/getMinutes'
import getSeconds from '/deps/date-fns/getSeconds'
import BaseSelect from './base_select'

export default {
    name: 'time-selector',
    props: {
        activeDate: {
            type: Date
        },
        clockIconClass: {
            type: String,
            default: 'icon-clock'
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
        setHours,
        setMinutes,
        setSeconds,
        getHours,
        getMinutes,
        getSeconds
    },
    template: `<div class="time-selector">
    <i v-if="clockIconClass" class="clock" :class="clockIconClass"/>
    <base-select
            title="Hour"
            :options="Array(24).fill().map( (_, hour) => parseInt(hour))"
            :value="getHours(activeDate)"
            @change="$emit('changeTime', setHours(activeDate, $event))"
            :optionDisabled="option=> (setHours(activeDate, option) > maxDate)"
    />
    <div>&nbsp;:&nbsp;</div>
    <base-select
            title="Minutes"
            :options="Array(60).fill().map( (_, minutes) => parseInt(minutes))"
            :value="getMinutes(activeDate) < 10 ? ('0' + getMinutes(activeDate)) : getMinutes(activeDate)"
            @change="$emit('changeTime', setMinutes(activeDate, $event))"
            :class="'timeselect'"
            :optionDisabled="option=> (setMinutes(activeDate, option) > maxDate)"
    >
        <template slot="option" slot-scope="props">
            <div
                    @click="() => props.update(props.option, props.id)"
                    :class="{
                        'timeoption': true,
                        'count': !!props.index,
                        'disabled': props.disabled
                    }"
                    :id="props.id"
            >&nbsp;
            </div>
        </template>
    </base-select>
    <div>&nbsp;:&nbsp;</div>
    <base-select
            title="Seconds"
            :options="Array(60).fill().map( (_, seconds) => parseInt(seconds))"
            :value="getSeconds(activeDate) < 10 ? ('0' + getSeconds(activeDate)) : getSeconds(activeDate)"
            @change="$emit('changeTime', setSeconds(activeDate, $event))"
            :class="'timeselect'"
            :optionDisabled="option=> (setSeconds(activeDate, option) > maxDate)"
    >
        <template slot="option" slot-scope="props">
            <div
                    @click="() => props.update(props.option, props.id)"
                    :class="{
                        'timeoption': true,
                        'count': !!props.index,
                        'disabled': props.disabled
                    }"
                    :id="props.id"
            >&nbsp;
            </div>
        </template>
    </base-select>
</div>`
}
