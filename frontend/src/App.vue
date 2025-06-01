<!-- disables the multiple root rule for this file -->
<!-- eslint-disable vue/no-multiple-template-root -->


<template>
<div>
  <Navbar />
  <router-view/>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>
