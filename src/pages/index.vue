<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page-container">
    <div class="hero">
      <span class="hero-badge">✨ Thai & English Braille</span>
      <h1>แปลงข้อความเป็น<br/>อักษรเบรลล์</h1>
      <p>เครื่องมือแปลงภาษาไทยและภาษาอังกฤษเป็นอักษรเบรลล์ รองรับทั้ง Unicode Braille และ ASCII Art</p>
    </div>

    <div class="feature-grid">
      <RouterLink to="/translate" class="feature-card" id="feature-translate">
        <span class="feature-emoji">🔤</span>
        <h3 class="feature-name">แปลงอักษร</h3>
        <p class="feature-desc">พิมพ์ข้อความภาษาไทยหรืออังกฤษ แล้วแปลงเป็นอักษรเบรลล์ทันที พร้อมแสดงผลทั้ง Unicode และ ASCII Art</p>
      </RouterLink>

      <RouterLink to="/reference" class="feature-card" id="feature-reference">
        <span class="feature-emoji">📖</span>
        <h3 class="feature-name">ตารางอ้างอิง</h3>
        <p class="feature-desc">ดูตารางอ้างอิงอักษรเบรลล์ครบทุกตัว ทั้งพยัญชนะ สระ วรรณยุกต์ ตัวเลข และเครื่องหมาย</p>
      </RouterLink>

      <div class="feature-card" id="feature-mirror">
        <span class="feature-emoji">🪞</span>
        <h3 class="feature-name">Mirror Mode</h3>
        <p class="feature-desc">แสดงผลกระจกเงาของอักษรเบรลล์ เพื่อใช้ในการเขียนเบรลล์ด้วยสไตลัส (Reverse Braille)</p>
      </div>
    </div>

    <div style="text-align: center; margin-top: 3rem;">
      <RouterLink to="/translate" class="btn btn-primary" id="btn-start">
        ▸ เริ่มแปลงอักษร
      </RouterLink>
    </div>
  </main>
</template>
