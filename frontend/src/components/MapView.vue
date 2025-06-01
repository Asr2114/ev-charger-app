<template>
  <div class="map-container">
    <LMap
      :zoom="5"
      :center="defaultCenter"
      class="leaflet-map"
      v-if="stations.length"
    >
    // eslint-disable-next-line no-unused-vars
      <LTileLayer :url="tileUrl" :attribution="attribution" />

      <LMarker
        v-for="station in stations"
        :key="station._id"
        :lat-lng="[station.location.lat, station.location.lng]"
      >
        <LPopup>
          <strong>{{ station.name }}</strong><br />
          Status: {{ station.status }}<br />
          Power: {{ station.power }} kW<br />
          Type: {{ station.connectorType }}
        </LPopup>
      </LMarker>
    </LMap>
    <p v-else>Loading map & stations...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'


const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token')
}


const defaultCenter = ref([20.5937, 78.9629])


const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const stations = ref([])

const loadStations = async () => {
  try {
    const res = await axios.get('http://localhost:5500/api/stations', { headers })
    stations.value = res.data
    console.log("Stations Loaded:", stations.value);
  } catch (err) {
    console.error('Error fetching stations:', err)
  }
}

onMounted(() => {
  loadStations();
  console.log("Map is Mounted");
})
</script>

<style scoped>

  .map-container {
  height: 600px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #f4fdf5;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 2px solid rgb(35, 176, 57);
  
}


.leaflet-map {
    
  height: 500px;
  width: 100%;
  z-index: 1;
  background: lightgray;
}

@media (max-width: 768px) {
  .leaflet-map {
    height: 300px;
  }
}
</style>
