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
    <style>
.increment-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.increment-value {
    font-size: 1.6rem;
    color: #212529;
    text-align: center;
}
.increment-icon {
    align-self: center;
    font-size: 2rem;
    color: #212529;
}
.increment-block {
    display: flex;
    justify-content: center;
    cursor: pointer;
    line-height: 1;
    letter-spacing: 0;

}
</style>
</div>`
}

