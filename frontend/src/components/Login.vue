<template>
  <div class="form-container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <input v-model="email" type="email" placeholder="Enter your Email" required />
      <input v-model="password" type="password" placeholder="Enter your Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const email = ref('')
const password= ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async() =>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
            email: email.value,
            password: password.value
        })

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userEmail', res.data.email)
        localStorage.setItem('name', res.data.name)
        
        router.push('/').then(()=> window.location.reload())
    } catch(err){
        error.value="Invalid Credentials"

    }
}

</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 10vh auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
}

form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  color: #222;
  letter-spacing: 1px;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  transition: border 0.2s;
}
input:focus {
  border: 1.5px solid #4CAF50;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  transition: background 0.3s ease;
  cursor: pointer;
}
button:hover {
  background-color: #43a047;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
  animation: fadeIn 0.3s ease;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>