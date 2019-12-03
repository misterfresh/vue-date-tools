export default {
    name: "validation",
    template: `<div class="va-dtr-validation">
    <button class="va-button va-apply" @click="$emit('apply')">Apply</button>
    <button class="va-button" @click="$emit('cancel')">Cancel</button>
</div>`
}
