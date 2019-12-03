export default {
    name: 'number-increment',
    props: {
        value: {
            type: Number,
            required: false
        }
    },
    template: `<div class="ni-increment-container">
    <div class="ni-increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value + 1) : 0)">
        <i class="icon-chevron-up ni-increment-icon"/>
    </div>
    <div class="ni-increment-value">
        {{(!!value || parseInt(value) === 0 ) ? (value < 10 ? ('0' + value) : value ) : '--'}}
    </div>
    <div class="ni-increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value - 1) : 0)">
        <i class="icon-chevron-down ni-increment-icon"/>
    </div>
</div>`
}

