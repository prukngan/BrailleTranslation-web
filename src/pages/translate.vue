<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { translateEnglish, translateEnglishToUnicode, type BrailleResult } from '../lib/braille-en'
import { translateThai, translateThaiToUnicode } from '../lib/braille-th'

type Lang = 'en' | 'th'

const lang = ref<Lang>('th')
const inputText = ref('')
const showMirror = ref(true)

const brailleResult = computed<BrailleResult | null>(() => {
  const text = inputText.value.trim()
  if (!text) return null

  if (lang.value === 'en') {
    return translateEnglish(text)
  } else {
    return translateThai(text)
  }
})

const brailleUnicode = computed(() => {
  const text = inputText.value.trim()
  if (!text) return ''

  if (lang.value === 'en') {
    return translateEnglishToUnicode(text)
  } else {
    return translateThaiToUnicode(text)
  }
})

const mirrorLines = computed(() => {
  if (!brailleResult.value) return null
  return brailleResult.value.lines.map(line => line.split('').reverse().join('')) as [string, string, string]
})

// Auto-detect language
watch(inputText, (newVal) => {
  if (!newVal) return
  const firstChar = newVal.trim()[0]
  if (!firstChar) return
  const code = firstChar.charCodeAt(0)
  if (code >= 0x0E01 && code <= 0x0E7F) {
    lang.value = 'th'
  } else if (/[a-zA-Z]/.test(firstChar)) {
    lang.value = 'en'
  }
})

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <main class="page-container">
    <div class="hero">
      <span class="hero-badge">⌨️ Translator</span>
      <h1>แปลงอักษรเบรลล์</h1>
      <p>พิมพ์ข้อความภาษาไทยหรือภาษาอังกฤษ แล้วแปลงเป็นเบรลล์ได้ทันที</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-icon blue">✏️</div>
        <div>
          <div class="card-title">ข้อความต้นฉบับ</div>
          <div class="card-subtitle">เลือกภาษาแล้วพิมพ์ข้อความ (รองรับตรวจจับภาษาอัตโนมัติ)</div>
        </div>
      </div>

      <!-- Language tabs -->
      <div class="lang-tabs">
        <button 
          class="lang-tab" 
          :class="{ active: lang === 'th' }" 
          @click="lang = 'th'"
          id="tab-thai"
        >
          🇹🇭 ภาษาไทย
        </button>
        <button 
          class="lang-tab" 
          :class="{ active: lang === 'en' }" 
          @click="lang = 'en'"
          id="tab-english"
        >
          🇬🇧 English
        </button>
      </div>

      <!-- Input -->
      <div class="input-group">
        <label class="input-label" for="input-text">
          {{ lang === 'th' ? 'พิมพ์ข้อความภาษาไทย' : 'Type English text' }}
        </label>
        <textarea
          id="input-text"
          class="textarea-field"
          v-model="inputText"
          :placeholder="lang === 'th' ? 'เช่น สวัสดี ครับ...' : 'e.g. hello world...'"
          rows="4"
        ></textarea>
      </div>

      <!-- Toggle mirror -->
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.88rem; color: var(--text-secondary);">
        <input type="checkbox" v-model="showMirror" id="toggle-mirror" style="accent-color: var(--accent-blue);" />
        🪞 แสดง Mirror (กระจกเงา)
      </label>
    </div>

    <!-- Results -->
    <div v-if="brailleResult" class="result-box" id="result-box">
      <!-- Unicode Braille -->
      <div class="result-label">Unicode Braille</div>
      <div class="braille-unicode" id="braille-unicode">{{ brailleUnicode }}</div>
      <button class="btn btn-ghost btn-sm" @click="copyToClipboard(brailleUnicode)" id="btn-copy-unicode">
        📋 Copy Unicode
      </button>

      <!-- ASCII Art -->
      <div style="margin-top: 1.5rem;">
        <div class="result-label">ASCII Art Braille</div>
        <div class="braille-ascii" id="braille-ascii">{{ brailleResult.lines[0] }}
{{ brailleResult.lines[1] }}
{{ brailleResult.lines[2] }}</div>
      </div>

      <!-- Mirror -->
      <div v-if="showMirror && mirrorLines" class="braille-mirror">
        <div class="result-label">🪞 Mirror (กระจกเงา)</div>
        <div class="braille-ascii" id="braille-mirror">{{ mirrorLines[0] }}
{{ mirrorLines[1] }}
{{ mirrorLines[2] }}</div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="result-box" style="text-align: center; padding: 3rem;">
      <div style="font-size: 2.5rem; margin-bottom: 0.8rem; opacity: 0.5;">⠿</div>
      <p style="color: var(--text-muted); font-size: 0.92rem;">
        กรุณาพิมพ์ข้อความด้านบนเพื่อดูผลลัพธ์อักษรเบรลล์
      </p>
    </div>
  </main>
</template>
