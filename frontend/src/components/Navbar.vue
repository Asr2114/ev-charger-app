<template>
  <nav class="navbar">
    <router-link to="/" class="nav-brand">⚡ Charge Your EV</router-link>
    <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links" :class="{ open: isMenuOpen }">
      <template v-if="isLoggedIn">
        <router-link to="/">Home</router-link>
        <router-link to="/map">Map</router-link>
        <div class="dropdown">
          <button class="dropdown-toggle" @click="toggleDropdown">
            Hello, {{ name }}
            <span class="arrow">▼</span>
          </button>
          <div class="dropdown-menu" v-if="showDropdown">
            <button @click="logout">Logout</button>
          </div>
        </div>
      </template>
      <template v-else>
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import {
    ref,
    watchEffect
} from 'vue';
import {
    useRouter,
    useRoute
} from 'vue-router';

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)
const name = ref('')
const showDropdown = ref(false)
const isMenuOpen = ref(false)

watchEffect(() => {
    const token = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')

    if (token) {
        isLoggedIn.value = true
        name.value = storedName || "User"
    } else {
        isLoggedIn.value = false
        name.value = ''
    }
})

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    isLoggedIn.value = false
    name.value = ''
    showDropdown.value = false
    router.push('/login')
}
</script>

 
<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4CAF50;
    /* soft green */
    padding: 12px 24px;
    color: white;
    font-weight: 500;
    animation: slideDown 0.4s ease;
    height: 56px;
    position: relative;
}
@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    color: white;
    text-decoration: none;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 16px;
}

@media (max-width: 768px) {
  .navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    height: 56px;
  }

  .nav-brand {
    font-size: 1.1rem;
  }

  .nav-links {
    position: absolute;
    top: 56px;
    right: 0;
    background-color: #4CAF50;
    border-radius: 0 0 6px 6px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
    flex-direction: column;
    align-items: flex-end;
    width: fit-content;
    gap: 12px;
    padding: 0 16px;
    z-index: 999;
    text-align: right;
  }

  .nav-links.open {
    max-height: 300px;
    padding: 12px 16px;
  }

  .nav-links a,
  .nav-links button,
  .dropdown-toggle {
    width: 100%;
    text-align: left;
    padding-left: 0;
  }

  .dropdown-menu {
    position: relative;
    z-index: 1001;
    background-color: white;
    width: 100%;
    margin-top: 6px;
  }

  .hamburger {
    display: flex !important;
    position: absolute;
    right: 16px;
    top: 12px;
    margin-left: auto;
    background: none;
    border: none;
    flex-direction: column;
    gap: 4px;
  }
  .dropdown-menu {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    box-shadow: none;
  }
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: opacity 0.2s ease;
}

.nav-links a:hover {
    opacity: 0.85;
}

.nav-links button {
    background: none;
    border: none;
    color: white;
    font: inherit;
    cursor: pointer;
    padding: 6px 12px;
    transition: background-color 0.2s ease;
}

.nav-links button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.nav-links span {
    margin-right: 8px;
    font-weight: 500;
}

.dropdown {
    position: relative;
}

.dropdown-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font: inherit;
    display: flex;
    align-items: center;
    gap: 6px;
}

.dropdown-toggle:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 6px 12px;
}

.arrow {
    font-size: 0.7rem;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    color: black;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 10px;
    z-index: 1000;
    min-width: 100px;
    transition: all 0.2s ease-in-out;
}

.dropdown-menu button {
    background: none;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-size: 14px;
    color: black;
}

.dropdown-menu button:hover {
    background-color: #f2f2f2;
    border-radius: 4px;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}
.hamburger span {
  width: 24px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}
</style>
