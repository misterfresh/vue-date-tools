import uuid from '/deps/uuid'

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
    template: `<div class="bs-select" :id="id">
    <div @click="(hasFocus = true) && (scrollToElement())" :title="title" class="bs-value">{{value}}</div>
    <div v-if="hasFocus" class="bs-underlay" @click="hasFocus = false"></div>
    <div class="bs-options" :class="{visible: hasFocus}" :id="id + '_options'">
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
                        class="bs-option"
                        :id="id + '_' + index"
                        :class="{
                            disabled: optionDisabled(option)
                        }"
                >{{options[option]}}
                </div>
            </slot>
        </template>
    </div>
</div>`
}


