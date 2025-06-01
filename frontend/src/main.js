import { createApp } from 'vue';
import './css/styles.css';
import App from './App.vue';
import router from './router';

import 'leaflet/dist/leaflet.css';

import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup
} from '@vue-leaflet/vue-leaflet';

const app = createApp(App);

app.use(router);

app.component('LMap', LMap);
app.component('LTileLayer', LTileLayer);
app.component('LMarker', LMarker);
app.component('LPopup', LPopup);

app.mount('#app');

