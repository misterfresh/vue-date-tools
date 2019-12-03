export default {
    name: 'number-increment',
    props: {
        value: {
            type: Number,
            required: false
        }
    },
    template: `<div class="increment-container">
    <div class="increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value + 1) : 0)">
        <i class="icon-chevron-up increment-icon"/>
    </div>
    <div class="increment-value">
        {{(!!value || parseInt(value) === 0 ) ? (value < 10 ? ('0' + value) : value ) : '--'}}
    </div>
    <div class="increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value - 1) : 0)">
        <i class="icon-chevron-down increment-icon"/>
    </div>
</div>`
}

