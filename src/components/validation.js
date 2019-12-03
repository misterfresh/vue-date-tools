export default {
    name: "validation",
    template: `<div class="dtr-validation">
    <button class="button apply" @click="$emit('apply')">{{t('messages.common.apply')}}</button>
    <button class="button" @click="$emit('cancel')">{{t('messages.common.cancel')}}</button>
    <style scoped>
.dtr-validation {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    justify-content: flex-end;
}
.button {
    font-family: 'proximaMedium', sans-serif;
    text-transform: none;
    overflow: visible;
    margin: 0;

    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;

    user-select: none;
    border: 1px solid transparent;

    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    padding: 0.4rem 0.8rem;
    font-size: 1.4rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    background-color: rgb(221, 221, 221);
    cursor: pointer;
    height: 3.2rem;
    margin-right: 0.5rem;
}
.apply {
    color: #fff;
    background-color: #32d13d;
    border-color: #32d13d;
    box-shadow: none !important;
}

</style>
</div>`
}
