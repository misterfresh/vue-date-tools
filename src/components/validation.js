export default {
    name: "validation",
    template: `<div class="dtr-validation">
    <button class="button apply" @click="$emit('apply')">Apply</button>
    <button class="button" @click="$emit('cancel')">Cancel</button>
</div>`
}
