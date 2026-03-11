<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page-container" style="padding-top: 2rem;">
    <div class="feature-grid">
      <div class="feature-card" id="feature-translate">
        <span class="feature-emoji">🔤</span>
        <h3 class="feature-name">ระบบแปลภาษาสำเร็จรูป</h3>
        <p class="feature-desc">แปลงข้อความภาษาไทยและภาษาอังกฤษเป็นอักษรเบรลล์ได้อย่างถูกต้องและรวดเร็ว เพียงแค่พิมพ์ข้อความที่ต้องการ</p>
      </div>

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
  </main>
</template>
