<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { translateEnglish, translateEnglishToUnicode, cellToUnicode, type BrailleResult } from './lib/braille-en'
import { translateThai, translateThaiToUnicode } from './lib/braille-th'
import { EN_BRAILLE_MAP } from './lib/EN_MAP'
import { THAI_BRAILLE_MAP } from './lib/TH_MAP'

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

interface BrailleCharMapping {
  braille: string
  label: string
}

/** Check if a Thai character is a combining mark that needs a dotted circle */
function formatThaiLabel(ch: string): string {
  const code = ch.charCodeAt(0)
  // Thai combining characters: sara am above/below vowels, tone marks, special marks
  // U+0E31 (ั), U+0E34-U+0E3A (ิ ี ึ ื ุ ู ฺ), U+0E47-U+0E4E (็ ่ ้ ๊ ๋ ์ ํ ๎)
  if (
    code === 0x0E31 ||
    (code >= 0x0E34 && code <= 0x0E3A) ||
    (code >= 0x0E47 && code <= 0x0E4E)
  ) {
    return '\u25CC' + ch  // ◌ + combining character
  }
  return ch
}
const brailleMapping = computed<BrailleCharMapping[]>(() => {
  const text = inputText.value.trim()
  if (!text) return []

  const map = lang.value === 'en' ? EN_BRAILLE_MAP : THAI_BRAILLE_MAP
  const result: BrailleCharMapping[] = []

  if (lang.value === 'en') {
    for (const ch of text) {
      const dotList = map[ch.toLowerCase()]
      if (ch === ' ') {
        result.push({ braille: '\u2800', label: '␣' })
      } else if (dotList) {
        for (let i = 0; i < dotList.length; i++) {
          const { cells } = translateEnglish(ch)
          result.push({
            braille: cellToUnicode(cells[i]!),
            label: i === 0 ? ch : ''
          })
        }
      } else {
        result.push({ braille: '\u2800', label: ch })
      }
    }
  } else {
    // Thai: use same logic as translateThai but track labels
    const chars = [...text]
    for (const ch of chars) {
      const code = ch.charCodeAt(0)
      if (ch === ' ') {
        result.push({ braille: '\u2800', label: '␣' })
      } else if (map[ch]) {
        const dotList = map[ch]
        for (let i = 0; i < dotList.length; i++) {
          // Build cell from dot string
          const dots = new Set(dotList[i]!.split(''))
          let cellCode = 0x2800
          if (dots.has('1')) cellCode |= 0x01
          if (dots.has('2')) cellCode |= 0x02
          if (dots.has('3')) cellCode |= 0x04
          if (dots.has('4')) cellCode |= 0x08
          if (dots.has('5')) cellCode |= 0x10
          if (dots.has('6')) cellCode |= 0x20
          result.push({
            braille: String.fromCharCode(cellCode),
            label: i === 0 ? formatThaiLabel(ch) : ''
          })
        }
      } else if (code >= 0x0E01 && code <= 0x0E7F) {
        result.push({ braille: '\u2800', label: formatThaiLabel(ch) })
      } else {
        // non-Thai: check EN map
        const enDots = EN_BRAILLE_MAP[ch.toLowerCase()]
        if (enDots) {
          for (let i = 0; i < enDots.length; i++) {
            const dotsSet = new Set(enDots[i]!.split(''))
            let cellCode = 0x2800
            if (dotsSet.has('1')) cellCode |= 0x01
            if (dotsSet.has('2')) cellCode |= 0x02
            if (dotsSet.has('3')) cellCode |= 0x04
            if (dotsSet.has('4')) cellCode |= 0x08
            if (dotsSet.has('5')) cellCode |= 0x10
            if (dotsSet.has('6')) cellCode |= 0x20
            result.push({
              braille: String.fromCharCode(cellCode),
              label: i === 0 ? ch : ''
            })
          }
        } else {
          result.push({ braille: '\u2800', label: ch })
        }
      }
    }
  }

  return result
})

const mirrorUnicode = computed(() => {
  const text = brailleUnicode.value
  if (!text) return ''
  
  return text.split('\n').map(line => {
    return line.split('').reverse().map(char => {
      const code = char.charCodeAt(0)
      if (code >= 0x2800 && code <= 0x28FF) {
        let v = code - 0x2800
        let newV = 0
        if (v & 0x01) newV |= 0x08
        if (v & 0x02) newV |= 0x10
        if (v & 0x04) newV |= 0x20
        if (v & 0x08) newV |= 0x01
        if (v & 0x10) newV |= 0x02
        if (v & 0x20) newV |= 0x04
        if (v & 0x40) newV |= 0x80
        if (v & 0x80) newV |= 0x40
        return String.fromCharCode(0x2800 + newV)
      }
      return char
    }).join('')
  }).join('\n')
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
  <nav class="nav">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-brand">
        <span class="nav-brand-icon">⠃</span>
        <span>Braille Translator</span>
      </RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" id="nav-home">หน้าแรก</RouterLink>
        <RouterLink to="/reference" class="nav-link" id="nav-reference">ตารางอ้างอิง</RouterLink>
      </div>
    </div>
  </nav>

  <main class="page-container" style="padding-bottom: 2rem;">
    <div class="hero">
      <span class="hero-badge">⌨️ Translator</span>
      <h1>แปลงอักษรเบรลล์</h1>
      <p>พิมพ์ข้อความภาษาไทยหรือภาษาอังกฤษ แล้วแปลงเป็นเบรลล์ได้ทันที</p>
    </div>

    <div class="translate-layout">
      <!-- Left Panel: Input -->
      <div class="translate-panel">
        <div class="card h-full">
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
          <div class="input-group" style="flex: 1; display: flex; flex-direction: column;">
            <label class="input-label" for="input-text">
              {{ lang === 'th' ? 'พิมพ์ข้อความภาษาไทย' : 'Type English text' }}
            </label>
            <textarea
              id="input-text"
              class="textarea-field"
              v-model="inputText"
              :placeholder="lang === 'th' ? 'เช่น สวัสดี ครับ...' : 'e.g. hello world...'"
              style="flex: 1; min-height: 150px;"
            ></textarea>
          </div>

          <!-- Toggle mirror -->
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.88rem; color: var(--text-secondary); margin-top: auto;">
            <input type="checkbox" v-model="showMirror" id="toggle-mirror" style="accent-color: var(--accent-blue);" />
            🪞 แสดง Mirror (กระจกเงา)
          </label>
        </div>
      </div>

      <!-- Right Panel: Results -->
      <div class="translate-panel">
        <div v-if="brailleResult" class="result-box h-full" id="result-box">
          <!-- Unicode Braille -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <div class="result-label" style="margin-bottom: 0;">Unicode Braille</div>
            <button class="btn btn-ghost btn-sm" @click="copyToClipboard(brailleUnicode)" id="btn-copy-unicode" style="padding: 4px 10px; font-size: 0.75rem;">
              📋 Copy Unicode
            </button>
          </div>
          <div class="braille-char-grid" id="braille-unicode">
            <div v-for="(item, idx) in brailleMapping" :key="idx" class="braille-char-cell">
              <span class="braille-char">{{ item.braille }}</span>
              <span class="braille-char-label">{{ item.label }}</span>
            </div>
          </div>

          <!-- Mirror -->
          <div v-if="showMirror && mirrorUnicode" class="braille-mirror" style="margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
              <div class="result-label" style="margin-bottom: 0;">🪞 Mirror (กระจกเงา)</div>
              <button class="btn btn-ghost btn-sm" @click="copyToClipboard(mirrorUnicode)" id="btn-copy-mirror" style="padding: 4px 10px; font-size: 0.75rem;">
                📋 Copy Mirror
              </button>
            </div>
            <div class="braille-unicode" id="braille-mirror" style="color: var(--accent-amber);">{{ mirrorUnicode }}</div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="result-box h-full flex-center">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem; opacity: 0.5;">⠿</div>
          <p style="color: var(--text-muted); font-size: 0.92rem;">
            กรุณาพิมพ์ข้อความด้านบนเพื่อดูผลลัพธ์อักษรเบรลล์
          </p>
        </div>
      </div>
    </div>
  </main>

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
.page-container {
  max-width: 1200px; /* Made slightly wider to comfortably fit two columns */
}

.translate-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

@media (max-width: 768px) {
  .translate-layout {
    grid-template-columns: 1fr;
  }
}

.translate-panel {
  display: flex;
  flex-direction: column;
}

.h-full {
  height: 100%;
  margin-top: 0 !important; /* Override result-box margin-top */
  display: flex;
  flex-direction: column;
}

.flex-center {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.braille-char-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 1rem;
}

.braille-char-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 28px;
  padding: 4px 2px;
}

.braille-char {
  font-size: 1.8rem;
  line-height: 1.2;
  color: var(--accent-cyan);
}

.braille-char-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-top: 2px;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  max-width: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
