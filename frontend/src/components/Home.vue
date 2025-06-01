<template> 
  <div class = "container">
    

    <!-- Station Form-->
    <div class = "station-form">
        <h2> EV Charging Stations </h2>
    <form @submit.prevent='saveStation' class='station-form' ref="stationForm">
        <input v-model="form.name" placeholder="Station Name" required />
        <input v-model.number="form.location.lat" type ="number" step="any" placeholder="Latitude" required />
        <input v-model.number="form.location.lng" type ="number" step="any" placeholder="Longitude" required />
        <input v-model="form.connectorType" placeholder = "Connector Type" required />
        <input v-model.number="form.power" type ="number" step="any" placeholder="Power (kW)" required/>
        <select v-model="form.status">
            <option> Active </option>
            <option> Inactive </option>
        </select>
        <button type="submit"> {{editing ? "Update" : "Add"}} Station </button>
    </form>
    </div>


    <!--Station Cards-->
    <div class="station-list">
      <div class="filter-section">
        <select v-model="selectedStatus">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select v-model="selectedConnector">
          <option value="">All Connector Types</option>
          <option v-for="type in connectorTypes" :key="type" :value="type">{{ type }}</option>
        </select>

        <input type="number" v-model.number="minPower" placeholder="Min Power (kW)" />
      </div>

      <div v-for="station in filteredStations" :key="station._id" class="station-card">
          <strong>{{station.name}} </strong>
          <p>Status: {{station.status}}</p>
          <p> Power: {{station.power}} kW </p>
          <p> Type: {{station.connectorType}}</p>
          <div class = "card-actions">
              <button @click="editStation(station)">Edit</button>
              <button @click="deleteStation(station._id)">Delete </button>
          </div>
      </div>
    </div>
  </div>
  </template>

      
        
<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const stations = ref([])
const editing = ref(false)
const form = ref({
    name: '',
    location: {lat:'', lng:''},
    status: "Active",
    power:'',
    connectorType: ''
})

const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token')
}

const loadStations = async () =>{
    const res = await axios.get('http://localhost:5500/api/stations', {headers})
    stations.value = res.data
}

onMounted(()=>{
    loadStations()
})

const saveStation = async() =>{
    if(editing.value){
        await axios.put(`http://localhost:5500/api/stations/${form.value._id}`, form.value, {headers})
    } else {
        await axios.post('http://localhost:5500/api/stations', form.value, {headers})
    }

    form.value={
        name: '',
        location: { lat:'', lng:'' },
        status: 'Active',
        power: '',
        connectorType: ''
    }
    editing.value = false
    loadStations()
}

const stationForm = ref(null)

const editStation = (station) =>{
    form.value = {...station}
    editing.value = true
    stationForm.value?.scrollIntoView({behaviour: 'smooth'})
}

const deleteStation=async(id) =>{
    await axios.delete(`http://localhost:5500/api/stations/${id}`, {headers})
    loadStations()
}

// Filter state and logic
const selectedStatus = ref('');
const selectedConnector = ref('');
const minPower = ref(0);

const filteredStations = computed(() => {
  return stations.value.filter(station => {
    const matchesStatus = !selectedStatus.value || station.status === selectedStatus.value;
    const matchesConnector = !selectedConnector.value || station.connectorType === selectedConnector.value;
    const matchesPower = !minPower.value || station.power >= minPower.value;
    return matchesStatus && matchesConnector && matchesPower;
  });
});

const connectorTypes = computed(() => {
  const types = new Set();
  stations.value.forEach(station => {
    if (station.connectorType) types.add(station.connectorType);
  });
  return Array.from(types);
});

</script>


<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap; /* keep side-by-side */
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 2rem;
}

.station-form {
  flex: 0 0 60%;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.station-list {
  flex: 0 0 30%;
  max-height: 600px;
  overflow-y: auto;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.station-card {
  background: #fff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}


.card-actions button {
  flex: 1;
  padding: 8px;
  font-size: 0.9rem;
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.card-actions button:nth-child(1) {
  background-color: #2196f3;
}

.card-actions button:nth-child(1):hover {
  background-color: #1976d2;
}

.card-actions button:nth-child(2) {
  background-color: #f44336;
}

.card-actions button:nth-child(2):hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 16px;
    padding: 1rem;
  }

  .station-form,
  .station-list,
  .station-card {
    width: 100%;
    box-sizing: border-box;
  }

  .station-form {
    padding: 16px;
  }

  .station-list {
    flex: 0 0 100%;
    max-width: 100%;
    max-height: none;
    overflow-y: visible;
    padding: 0;
  }

  .station-card {
    margin: 12px 0;
    padding: 20px;
    text-align: center;
  }
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-section select,
.filter-section input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 150px;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }
}
</style>
