<template>
    <div class="number-increment-container">
        <div class="increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value + 1) : 0)">
            <i v-if="incrementIconClass" class="increment-icon" :class="incrementIconClass"/>
            <span v-else class="increment-icon default-icon">&lt;</span>
        </div>
        <div class="increment-value">
            {{(!!value || parseInt(value) === 0 ) ? ( 10 > value ? ('0' + value) : value ) : '--'}}
        </div>
        <div class="increment-block" @click="$emit('change', typeof value !== 'undefined' ? (value - 1) : 0)">
            <i v-if="decrementIconClass" class="increment-icon" :class="decrementIconClass"/>
            <span v-else class="increment-icon default-icon">&gt;</span>
        </div>
    </div>
</template>
<script>
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
    }
</script>
<style scoped>
    .number-increment-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .increment-value {
        font-size: 1.6rem;
        color: #35495d;
        text-align: center;
    }
    .increment-icon {
        align-self: center;
        font-size: 2rem;
        color: #35495d;
    }
    .increment-block {
        display: flex;
        justify-content: center;
        cursor: pointer;
        line-height: 1;
        letter-spacing: 0;
        color: #35495d;
    }
    .increment-block:hover .increment-icon{
        color: #637f9a;
    }
    .default-icon {
        transform: rotate(90deg);
    }

</style>
