<script setup lang="ts">
import { ref, computed } from 'vue'

interface BrailleEntry {
  char: string
  label: string
  dots: string
  unicode: string
}

function dotsToUnicode(dotString: string): string {
  const dots = new Set(dotString.split(''))
  let code = 0x2800
  if (dots.has('1')) code |= 0x01
  if (dots.has('2')) code |= 0x02
  if (dots.has('3')) code |= 0x04
  if (dots.has('4')) code |= 0x08
  if (dots.has('5')) code |= 0x10
  if (dots.has('6')) code |= 0x20
  return String.fromCharCode(code)
}

// ===== Two-level tab system =====
type LangTab = 'th' | 'en'
type ThSubTab = 'th-consonants' | 'th-vowels' | 'th-tones' | 'th-punctuation'
type EnSubTab = 'en-letters' | 'en-numbers' | 'en-punctuation'

const activeLang = ref<LangTab>('th')
const activeThSub = ref<ThSubTab>('th-consonants')
const activeEnSub = ref<EnSubTab>('en-letters')

const langTabs: { key: LangTab; label: string; emoji: string }[] = [
  { key: 'th', label: 'ภาษาไทย', emoji: '🇹🇭' },
  { key: 'en', label: 'English', emoji: '🇬🇧' },
]

const thSubTabs: { key: ThSubTab; label: string; emoji: string }[] = [
  { key: 'th-consonants', label: 'พยัญชนะ', emoji: '🔤' },
  { key: 'th-vowels', label: 'สระ', emoji: '◌ิ' },
  { key: 'th-tones', label: 'วรรณยุกต์', emoji: '◌่' },
  { key: 'th-punctuation', label: 'เครื่องหมาย', emoji: '.,!' },
]

const enSubTabs: { key: EnSubTab; label: string; emoji: string }[] = [
  { key: 'en-letters', label: 'A-Z', emoji: '🔤' },
  { key: 'en-numbers', label: 'Numbers', emoji: '🔢' },
  { key: 'en-punctuation', label: 'Punctuation', emoji: '.,!' },
]

const enLetters: BrailleEntry[] = [
  { char: 'A', label: 'a', dots: '1', unicode: dotsToUnicode('1') },
  { char: 'B', label: 'b', dots: '12', unicode: dotsToUnicode('12') },
  { char: 'C', label: 'c', dots: '14', unicode: dotsToUnicode('14') },
  { char: 'D', label: 'd', dots: '145', unicode: dotsToUnicode('145') },
  { char: 'E', label: 'e', dots: '15', unicode: dotsToUnicode('15') },
  { char: 'F', label: 'f', dots: '124', unicode: dotsToUnicode('124') },
  { char: 'G', label: 'g', dots: '1245', unicode: dotsToUnicode('1245') },
  { char: 'H', label: 'h', dots: '125', unicode: dotsToUnicode('125') },
  { char: 'I', label: 'i', dots: '24', unicode: dotsToUnicode('24') },
  { char: 'J', label: 'j', dots: '245', unicode: dotsToUnicode('245') },
  { char: 'K', label: 'k', dots: '13', unicode: dotsToUnicode('13') },
  { char: 'L', label: 'l', dots: '123', unicode: dotsToUnicode('123') },
  { char: 'M', label: 'm', dots: '134', unicode: dotsToUnicode('134') },
  { char: 'N', label: 'n', dots: '1345', unicode: dotsToUnicode('1345') },
  { char: 'O', label: 'o', dots: '135', unicode: dotsToUnicode('135') },
  { char: 'P', label: 'p', dots: '1234', unicode: dotsToUnicode('1234') },
  { char: 'Q', label: 'q', dots: '12345', unicode: dotsToUnicode('12345') },
  { char: 'R', label: 'r', dots: '1235', unicode: dotsToUnicode('1235') },
  { char: 'S', label: 's', dots: '234', unicode: dotsToUnicode('234') },
  { char: 'T', label: 't', dots: '2345', unicode: dotsToUnicode('2345') },
  { char: 'U', label: 'u', dots: '136', unicode: dotsToUnicode('136') },
  { char: 'V', label: 'v', dots: '1236', unicode: dotsToUnicode('1236') },
  { char: 'W', label: 'w', dots: '2456', unicode: dotsToUnicode('2456') },
  { char: 'X', label: 'x', dots: '1346', unicode: dotsToUnicode('1346') },
  { char: 'Y', label: 'y', dots: '13456', unicode: dotsToUnicode('13456') },
  { char: 'Z', label: 'z', dots: '1356', unicode: dotsToUnicode('1356') },
]

const enNumbers: BrailleEntry[] = [
  { char: '0', label: '0', dots: '3456+245', unicode: dotsToUnicode('3456') + dotsToUnicode('245') },
  { char: '1', label: '1', dots: '3456+1', unicode: dotsToUnicode('3456') + dotsToUnicode('1') },
  { char: '2', label: '2', dots: '3456+12', unicode: dotsToUnicode('3456') + dotsToUnicode('12') },
  { char: '3', label: '3', dots: '3456+14', unicode: dotsToUnicode('3456') + dotsToUnicode('14') },
  { char: '4', label: '4', dots: '3456+145', unicode: dotsToUnicode('3456') + dotsToUnicode('145') },
  { char: '5', label: '5', dots: '3456+15', unicode: dotsToUnicode('3456') + dotsToUnicode('15') },
  { char: '6', label: '6', dots: '3456+124', unicode: dotsToUnicode('3456') + dotsToUnicode('124') },
  { char: '7', label: '7', dots: '3456+1245', unicode: dotsToUnicode('3456') + dotsToUnicode('1245') },
  { char: '8', label: '8', dots: '3456+125', unicode: dotsToUnicode('3456') + dotsToUnicode('125') },
  { char: '9', label: '9', dots: '3456+24', unicode: dotsToUnicode('3456') + dotsToUnicode('24') },
]

const thConsonants: BrailleEntry[] = [
  { char: 'ก', label: 'กอ', dots: '1245', unicode: dotsToUnicode('1245') },
  { char: 'ข', label: 'ขอ', dots: '13', unicode: dotsToUnicode('13') },
  { char: 'ค', label: 'คอ', dots: '136', unicode: dotsToUnicode('136') },
  { char: 'ฆ', label: 'ฆอ', dots: '6+136', unicode: dotsToUnicode('6') + dotsToUnicode('136') },
  { char: 'ง', label: 'งอ', dots: '12456', unicode: dotsToUnicode('12456') },
  { char: 'จ', label: 'จอ', dots: '245', unicode: dotsToUnicode('245') },
  { char: 'ฉ', label: 'ฉอ', dots: '34', unicode: dotsToUnicode('34') },
  { char: 'ช', label: 'ชอ', dots: '346', unicode: dotsToUnicode('346') },
  { char: 'ซ', label: 'ซอ', dots: '2346', unicode: dotsToUnicode('2346') },
  { char: 'ญ', label: 'ญอ', dots: '6+13456', unicode: dotsToUnicode('6') + dotsToUnicode('13456') },
  { char: 'ฎ', label: 'ฎอ', dots: '6+145', unicode: dotsToUnicode('6') + dotsToUnicode('145') },
  { char: 'ฏ', label: 'ฏอ', dots: '6+1256', unicode: dotsToUnicode('6') + dotsToUnicode('1256') },
  { char: 'ฐ', label: 'ฐอ', dots: '6+2345', unicode: dotsToUnicode('6') + dotsToUnicode('2345') },
  { char: 'ฑ', label: 'ฑอ', dots: '6+23456', unicode: dotsToUnicode('6') + dotsToUnicode('23456') },
  { char: 'ณ', label: 'ณอ', dots: '6+1345', unicode: dotsToUnicode('6') + dotsToUnicode('1345') },
  { char: 'ด', label: 'ดอ', dots: '145', unicode: dotsToUnicode('145') },
  { char: 'ต', label: 'ตอ', dots: '1256', unicode: dotsToUnicode('1256') },
  { char: 'ถ', label: 'ถอ', dots: '2345', unicode: dotsToUnicode('2345') },
  { char: 'ท', label: 'ทอ', dots: '23456', unicode: dotsToUnicode('23456') },
  { char: 'ธ', label: 'ธอ', dots: '356+23456', unicode: dotsToUnicode('356') + dotsToUnicode('23456') },
  { char: 'น', label: 'นอ', dots: '1345', unicode: dotsToUnicode('1345') },
  { char: 'บ', label: 'บอ', dots: '1236', unicode: dotsToUnicode('1236') },
  { char: 'ป', label: 'ปอ', dots: '12346', unicode: dotsToUnicode('12346') },
  { char: 'ผ', label: 'ผอ', dots: '1234', unicode: dotsToUnicode('1234') },
  { char: 'ฝ', label: 'ฝอ', dots: '1346', unicode: dotsToUnicode('1346') },
  { char: 'พ', label: 'พอ', dots: '1456', unicode: dotsToUnicode('1456') },
  { char: 'ฟ', label: 'ฟอ', dots: '1246', unicode: dotsToUnicode('1246') },
  { char: 'ภ', label: 'ภอ', dots: '6+1456', unicode: dotsToUnicode('6') + dotsToUnicode('1456') },
  { char: 'ม', label: 'มอ', dots: '134', unicode: dotsToUnicode('134') },
  { char: 'ย', label: 'ยอ', dots: '13456', unicode: dotsToUnicode('13456') },
  { char: 'ร', label: 'รอ', dots: '1235', unicode: dotsToUnicode('1235') },
  { char: 'ล', label: 'ลอ', dots: '123', unicode: dotsToUnicode('123') },
  { char: 'ว', label: 'วอ', dots: '2456', unicode: dotsToUnicode('2456') },
  { char: 'ศ', label: 'ศอ', dots: '6+234', unicode: dotsToUnicode('6') + dotsToUnicode('234') },
  { char: 'ษ', label: 'ษอ', dots: '36+234', unicode: dotsToUnicode('36') + dotsToUnicode('234') },
  { char: 'ส', label: 'สอ', dots: '234', unicode: dotsToUnicode('234') },
  { char: 'ห', label: 'หอ', dots: '125', unicode: dotsToUnicode('125') },
  { char: 'อ', label: 'ออ', dots: '135', unicode: dotsToUnicode('135') },
  { char: 'ฮ', label: 'ฮอ', dots: '123456', unicode: dotsToUnicode('123456') },
]

const thVowels: BrailleEntry[] = [
  { char: 'ะ', label: 'สระอะ', dots: '1', unicode: dotsToUnicode('1') },
  { char: 'า', label: 'สระอา', dots: '16', unicode: dotsToUnicode('16') },
  { char: 'ิ', label: 'สระอิ', dots: '12', unicode: dotsToUnicode('12') },
  { char: 'ี', label: 'สระอี', dots: '23', unicode: dotsToUnicode('23') },
  { char: 'ึ', label: 'สระอึ', dots: '246', unicode: dotsToUnicode('246') },
  { char: 'ื', label: 'สระอื', dots: '26', unicode: dotsToUnicode('26') },
  { char: 'ุ', label: 'สระอุ', dots: '14', unicode: dotsToUnicode('14') },
  { char: 'ู', label: 'สระอู', dots: '25', unicode: dotsToUnicode('25') },
  { char: 'ั', label: 'สระอั', dots: '345', unicode: dotsToUnicode('345') },
  { char: 'เ-ะ', label: 'สระเอะ', dots: '124+1', unicode: dotsToUnicode('124') + dotsToUnicode('1') },
  { char: 'เ', label: 'สระเอ', dots: '124', unicode: dotsToUnicode('124') },
  { char: 'แ-ะ', label: 'สระแอ', dots: '126+1', unicode: dotsToUnicode('126') + dotsToUnicode('1') },
  { char: 'แ', label: 'สระแอ', dots: '126', unicode: dotsToUnicode('126') },
  { char: 'โ-ะ', label: 'สระโอ', dots: '24+1', unicode: dotsToUnicode('24') + dotsToUnicode('1') },
  { char: 'โ', label: 'สระโอ', dots: '24', unicode: dotsToUnicode('24') },
  { char: 'เ-าะ', label: 'สระเอาะ', dots: '135+1', unicode: dotsToUnicode('135') + dotsToUnicode('1') },
  { char: 'เ-อะ', label: 'สระเออะ', dots: '146+1', unicode: dotsToUnicode('146') + dotsToUnicode('1') },
  { char: 'เ-อ', label: 'สระเออ', dots: '146', unicode: dotsToUnicode('146') },
  { char: 'เ-ียะ', label: 'สระเอียะ', dots: '12356+1', unicode: dotsToUnicode('12356') + dotsToUnicode('1') },
  { char: 'เ-ีย', label: 'สระเอีย', dots: '12356', unicode: dotsToUnicode('12356') },
  { char: 'เ-ือะ', label: 'สระเอือะ', dots: '12345+1', unicode: dotsToUnicode('12345') + dotsToUnicode('1') },
  { char: 'เ-ือ', label: 'สระเอือ', dots: '12345', unicode: dotsToUnicode('12345') },
  { char: '-ัวะ', label: 'สระอัวะ', dots: '15+1', unicode: dotsToUnicode('15') + dotsToUnicode('1') },
  { char: '-ัว', label: 'สระอัว', dots: '15', unicode: dotsToUnicode('15') },
  { char: 'ำ', label: 'สระอำ', dots: '1356', unicode: dotsToUnicode('1356') },
  { char: 'ไ', label: 'สระไอ', dots: '156', unicode: dotsToUnicode('156') },
  { char: 'ใ', label: 'สระใอ', dots: '156+2', unicode: dotsToUnicode('156') + dotsToUnicode('2') },
  { char: 'เ-า', label: 'สระเอา', dots: '124', unicode: dotsToUnicode('124')},
]

const thTones: BrailleEntry[] = [
  { char: '่', label: 'ไม้เอก', dots: '35', unicode: dotsToUnicode('35') },
  { char: '้', label: 'ไม้โท', dots: '256', unicode: dotsToUnicode('256') },
  { char: '๊', label: 'ไม้ตรี', dots: '2356', unicode: dotsToUnicode('2356') },
  { char: '๋', label: 'ไม้จัตวา', dots: '236', unicode: dotsToUnicode('236') },
  { char: '็', label: 'ไม้ไต่คู้', dots: '3', unicode: dotsToUnicode('3') },
  { char: '์', label: 'การันต์', dots: '356', unicode: dotsToUnicode('356') },
  { char: 'ํ', label: 'นิคหิต', dots: '5', unicode: dotsToUnicode('5') },
]

const punctuation: BrailleEntry[] = [
  { char: '.', label: 'มหัพภาค', dots: '256', unicode: dotsToUnicode('256') },
  { char: ',', label: 'จุลภาค', dots: '2', unicode: dotsToUnicode('2') },
  { char: ';', label: 'อัฒภาค', dots: '23', unicode: dotsToUnicode('23') },
  { char: ':', label: 'ทวิภาค', dots: '25', unicode: dotsToUnicode('25') },
  { char: '!', label: 'อัศเจรีย์', dots: '235', unicode: dotsToUnicode('235') },
  { char: '?', label: 'ปรัศนี', dots: '236', unicode: dotsToUnicode('236') },
  { char: "'", label: 'อัญประกาศเดี่ยว', dots: '3', unicode: dotsToUnicode('3') },
  { char: '-', label: 'ยัติภังค์', dots: '36', unicode: dotsToUnicode('36') },
  { char: '(', label: 'วงเล็บเปิด', dots: '126', unicode: dotsToUnicode('126') },
  { char: ')', label: 'วงเล็บปิด', dots: '345', unicode: dotsToUnicode('345') },
]

const currentEntries = computed(() => {
  if (activeLang.value === 'th') {
    switch (activeThSub.value) {
      case 'th-consonants': return thConsonants
      case 'th-vowels': return thVowels
      case 'th-tones': return thTones
      case 'th-punctuation': return punctuation
      default: return thConsonants
    }
  } else {
    switch (activeEnSub.value) {
      case 'en-letters': return enLetters
      case 'en-numbers': return enNumbers
      case 'en-punctuation': return punctuation
      default: return enLetters
    }
  }
})
</script>

<template>
  <main class="page-container">
    <div class="hero">
      <span class="hero-badge">📖 Reference Table</span>
      <h1>ตารางอ้างอิงเบรลล์</h1>
      <p>ตารางแสดงอักษรเบรลล์ทั้งภาษาไทยและอังกฤษ พร้อม Dot Pattern และ Unicode</p>
    </div>

    <!-- Language Tabs (Top Level) -->
    <div class="ref-lang-tabs">
      <button
        v-for="tab in langTabs"
        :key="tab.key"
        :id="`ref-lang-${tab.key}`"
        @click="activeLang = tab.key"
        class="ref-lang-tab"
        :class="{ active: activeLang === tab.key }"
      >
        <span class="ref-tab-emoji">{{ tab.emoji }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- Sub-category Tabs (Thai) -->
    <div v-if="activeLang === 'th'" class="ref-sub-tabs">
      <button
        v-for="tab in thSubTabs"
        :key="tab.key"
        :id="`ref-tab-${tab.key}`"
        @click="activeThSub = tab.key"
        class="ref-sub-tab"
        :class="{ active: activeThSub === tab.key }"
      >
        <span class="ref-tab-emoji">{{ tab.emoji }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- Sub-category Tabs (English) -->
    <div v-if="activeLang === 'en'" class="ref-sub-tabs">
      <button
        v-for="tab in enSubTabs"
        :key="tab.key"
        :id="`ref-tab-${tab.key}`"
        @click="activeEnSub = tab.key"
        class="ref-sub-tab"
        :class="{ active: activeEnSub === tab.key }"
      >
        <span class="ref-tab-emoji">{{ tab.emoji }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- Reference Grid -->
    <div id="ref-table" class="ref-grid">
      <div
        v-for="entry in currentEntries"
        :key="entry.char"
        class="ref-card"
      >
        <div class="ref-card-braille">{{ entry.unicode }}</div>
        <div class="ref-card-char">{{ entry.char }}</div>
        <div class="ref-card-label">{{ entry.label }}</div>
        <div class="ref-card-dots">dots {{ entry.dots }}</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* ===== Language tabs (top level) ===== */
.ref-lang-tabs {
  display: flex;
  gap: 4px;
  padding: 5px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  width: fit-content;
  margin-bottom: 0.75rem;
}

.ref-lang-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--text-muted);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.ref-lang-tab:hover {
  color: var(--text-secondary);
  background: var(--btn-ghost-bg);
}

.ref-lang-tab.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 2px 12px rgba(99, 132, 255, 0.3);
}

/* ===== Sub-category tabs ===== */
.ref-sub-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 5px;
  background: var(--bg-input);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  margin-bottom: 2rem;
}

.ref-sub-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  font-family: 'Inter', sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--text-muted);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.ref-sub-tab:hover {
  color: var(--text-secondary);
  background: var(--btn-ghost-bg);
}

.ref-sub-tab.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 2px 8px rgba(99, 132, 255, 0.25);
}

.ref-tab-emoji {
  font-size: 0.95rem;
  line-height: 1;
}

/* ===== Reference grid ===== */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}

@media (max-width: 768px) {
  .ref-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

.ref-card {
  background: var(--gradient-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 1.2rem 1rem;
  text-align: center;
  transition: all var(--transition-smooth);
  cursor: default;
}

.ref-card:hover {
  border-color: var(--border-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.ref-card-braille {
  font-size: 2.2rem;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
  min-height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ref-card-char {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.ref-card-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.ref-card-dots {
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 0.7rem;
  color: var(--accent-purple);
  opacity: 0.8;
}
</style>
