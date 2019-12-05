import Vue from 'vue'
import ToolsPresentation from './ToolsPresentation.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(ToolsPresentation),
}).$mount('#app')
