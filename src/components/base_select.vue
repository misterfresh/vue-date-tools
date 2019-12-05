<template>
    <div class="base-select" :id="id">
        <div @click="(hasFocus = true) && (scrollToElement())" :title="title" class="value">{{value}}</div>
        <div v-if="hasFocus" class="underlay" @click="hasFocus = false"></div>
        <div class="options" :class="{visible: hasFocus}" :id="id + '_options'">
            <template
                    v-for="(option, index) in Object.keys(options)"
            >
                <slot
                        :option="option"
                        :index="index"
                        :hasFocus="hasFocus"
                        :update="update"
                        name="option"
                        :id="id + '_' + index"
                        :disabled="optionDisabled(option)"
                >
                    <div
                            @click="(!optionDisabled(option)) && $emit('change', parseInt(option)) && (selected = id + '_' + index) && (hasFocus = false)"
                            class="option"
                            :id="id + '_' + index"
                            :class="{
                            'disabled': optionDisabled(option)
                        }"
                    >{{options[option]}}
                    </div>
                </slot>
            </template>
        </div>
    </div>
</template>
<script>
    import uuid from './../utils/uuid'

    export default {
        name: 'base-select',
        props: {
            options: {
                type: [Object, Array],
                default: function () {
                    return []
                }
            },
            value: {},
            title: {
                type: String,
                default: ''
            },
            optionDisabled: {
                type: Function,
                default: function(option){
                    return false
                }
            }
        },
        data: function () {
            return {
                hasFocus: false,
                id: uuid(),
                selected: false
            }
        },
        methods: {
            update: function (option, id) {
                if(!this.optionDisabled(option)){
                    this.$emit('change', parseInt(option))
                    this.hasFocus = false
                    this.selected = id
                }
            },
            scrollToElement: function () {
                if (this.selected) {
                    const id = this.selected.split('_')[0]
                    const optionsContainer = document.getElementById(id + '_options')
                    const optionElement = document.getElementById(this.selected)
                    optionsContainer.scrollTop = optionElement.offsetTop
                }
            }
        },

    }
</script>
<style scoped>
    .base-select {
        width: 5rem;
        height: 2.2rem;
        position: relative;
        border-radius: 0px;
        background-color: #eee;
        padding-left: 0.5rem;
        padding-top: 0.2rem;
        border: 1px solid #ccc;
    }

    .base-select:after {
        content: "▼";
        color: #000;
        position: absolute;
        right: 0.5rem;
        top: 0;
        z-index: 1;
        text-align: center;
        width: 0.6rem;
        height: 0.3rem;
        padding: 0.2rem;
        font-size: 1.2rem;
        pointer-events: none;
    }

    .base-select .value {
        width: 100%;
    }

    .options {
        position: absolute;
        top: 2rem;
        z-index: 12500;
        left: 0;
        max-height: 25rem;
        overflow-y: scroll;
        overflow-x: hidden;
        opacity: 0;
        pointer-events: none;
    }

    .visible {
        opacity: 1;
        pointer-events: auto;
    }

    .option {
        background-color: #fff;
        color: #000;
        width: 5rem;
        height: 2rem;
        padding-left: 0.5rem;
        padding-top: 0.2rem;
    }

    .option:hover {
        background-color: #40b883;
        color: #fff;
    }
    .option.disabled, .option.disabled:hover {
        color: #fff;
        background-color: #ccc;
    }

    .underlay {
        z-index: 12450;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background: transparent;
        opacity: 0.3;
    }
</style>
