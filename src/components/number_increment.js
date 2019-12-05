export default {
    name: 'number-increment',
    props: {
        value: {
            type: Number,
            required: false
        },
        incrementIconClass: {
            type: String,
            default: ''
        },
        decrementIconClass: {
            type: String,
            default: ''
        }
    },
    template: `<div class="number-increment-container">
    <div class="increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value + 1) : 0)">
        <i v-if="incrementIconClass" class="increment-icon" :class="incrementIconClass"/>
        <span v-else class="increment-icon default-icon"><</span>
    </div>
    <div class="increment-value">
        {{(!!value || parseInt(value) === 0 ) ? (value < 10 ? ('0' + value) : value ) : '--'}}
    </div>
    <div class="increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value - 1) : 0)">
        <i v-if="decrementIconClass" class="increment-icon" :class="decrementIconClass"/>
        <span v-else class="increment-icon default-icon">></span>
    </div>
</div>`
}

