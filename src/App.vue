<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="nav">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-brand">
        <span class="nav-brand-icon">⠃</span>
        <span>Braille Translator</span>
      </RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" id="nav-home">หน้าแรก</RouterLink>
        <RouterLink to="/translate" class="nav-link" id="nav-translate">แปลงอักษร</RouterLink>
        <RouterLink to="/reference" class="nav-link" id="nav-reference">ตารางอ้างอิง</RouterLink>
      </div>
    </div>
  </nav>

  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <footer class="footer">
    <p>Braille Translator — อ้างอิงจาก liblouis th-g0.utb & English Braille Grade 1</p>
  </footer>
</template>

<style scoped>
</style>
