// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

// Material Icon suck!!
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFemale, faCogs, faPaw, faFileArchive, faFlask, faHeart,
faHeartbeat, faFolderOpen,
faTrophy, faTruck, faTachometerAlt,
faUser, faPlus, faPaperPlane, faDownload,
faCaretLeft, faCaretRight, faPencilAlt,
faHospital, faTablets,
faTrash, faTimes, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFemale, faCogs, faPaw, faFileArchive,
faFlask, faHeart, faHeartbeat, faFolderOpen, faTrophy,
faTruck, faTachometerAlt, faUser, faPlus, faTablets,
faCaretLeft, faCaretRight, faPencilAlt, faTrash,
faPaperPlane, faDownload, faTimes, faEye, faHospital)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
