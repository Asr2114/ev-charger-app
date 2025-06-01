<!-- disables the multiple root rule for this file -->
<!-- eslint-disable vue/no-multiple-template-root -->

<template>
<div class="form-container">
    <form @submit.prevent="handleRegister">
        <h2> Register </h2>
        <input v-model="name" type="name" placeholder="Enter your Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit"> Register </button>
        <p v-if="message" class="success">{{message}}</p>
        <p v-if="error" class="error">{{error}}</p>
    </form>
</div>
</template>

<script setup>
import { ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const message = ref('');
const router = useRouter();

const handleRegister = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
            name: name.value,
            email: email.value,
            password: password.value
        });
        message.value = "Registration Succesful";
        setTimeout(() => router.push('/login'), 1500);
    } catch {
        error.value = "Something went wrong";

    }
};
</script>

<style scoped>

.form-container {
  max-width: 420px;
  margin: 5vh auto;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease;
}


h2 {
  text-align: center;
  color: #2e7d32;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}


input {
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}



input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  outline: none;
}


button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

button:hover {
  background-color: #388e3c;
}


.error {
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}


@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (max-width: 480px) {
  .form-container {
    margin: 2rem 1rem;
    padding: 1.5rem;
  }
}
</style>

