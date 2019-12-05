export default {
    name: "validation",
    template: `<div class="validation-container ">
    <button class="button apply" @click="$emit('apply')">Apply</button>
    <button class="button" @click="$emit('cancel')">Cancel</button>
</div>`
}
