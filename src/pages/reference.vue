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

type TabKey = 'en-letters' | 'en-numbers' | 'th-consonants' | 'th-vowels' | 'th-tones' | 'punctuation'

const activeTab = ref<TabKey>('en-letters')

const tabs: { key: TabKey; label: string; emoji: string }[] = [
  { key: 'en-letters', label: 'A-Z', emoji: '🔤' },
  { key: 'en-numbers', label: 'เลข EN', emoji: '🔢' },
  { key: 'th-consonants', label: 'พยัญชนะ', emoji: '🇹🇭' },
  { key: 'th-vowels', label: 'สระ', emoji: '◌ิ' },
  { key: 'th-tones', label: 'วรรณยุกต์', emoji: '◌่' },
  { key: 'punctuation', label: 'เครื่องหมาย', emoji: '.,!' },
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
  { char: 'ั', label: 'สระอั', dots: '345', unicode: dotsToUnicode('345') },
  { char: 'า', label: 'สระอา', dots: '16', unicode: dotsToUnicode('16') },
  { char: 'ิ', label: 'สระอิ', dots: '12', unicode: dotsToUnicode('12') },
  { char: 'ี', label: 'สระอี', dots: '23', unicode: dotsToUnicode('23') },
  { char: 'ุ', label: 'สระอุ', dots: '14', unicode: dotsToUnicode('14') },
  { char: 'ู', label: 'สระอู', dots: '25', unicode: dotsToUnicode('25') },
  { char: 'ึ', label: 'สระอึ', dots: '246', unicode: dotsToUnicode('246') },
  { char: 'ื', label: 'สระอื', dots: '26', unicode: dotsToUnicode('26') },
  { char: 'เ', label: 'สระเอ', dots: '124', unicode: dotsToUnicode('124') },
  { char: 'แ', label: 'สระแอ', dots: '126', unicode: dotsToUnicode('126') },
  { char: 'โ', label: 'สระโอ', dots: '24', unicode: dotsToUnicode('24') },
  { char: 'ำ', label: 'สระอำ', dots: '1356', unicode: dotsToUnicode('1356') },
  { char: 'ไ', label: 'สระไอ', dots: '156', unicode: dotsToUnicode('156') },
  { char: 'ใ', label: 'สระใอ', dots: '156+2', unicode: dotsToUnicode('156') + dotsToUnicode('2') },
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
  switch (activeTab.value) {
    case 'en-letters': return enLetters
    case 'en-numbers': return enNumbers
    case 'th-consonants': return thConsonants
    case 'th-vowels': return thVowels
    case 'th-tones': return thTones
    case 'punctuation': return punctuation
    default: return enLetters
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

    <!-- Category Tabs -->
    <div class="flex flex-wrap gap-1.5 p-1.5 bg-[var(--bg-input)] rounded-[var(--radius-md)] mb-8 border border-[var(--border-subtle)]">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :id="`ref-tab-${tab.key}`"
        @click="activeTab = tab.key"
        class="px-4 py-2 rounded-[var(--radius-sm)] font-['Inter'] text-[0.82rem] font-medium cursor-pointer border-none flex items-center gap-1.5 whitespace-nowrap transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="activeTab === tab.key
          ? 'bg-[var(--gradient-primary)] text-white shadow-[0_2px_8px_rgba(99,132,255,0.25)]'
          : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/[0.03]'"
      >
        <span class="text-[0.9rem]">{{ tab.emoji }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- Reference Grid -->
    <div class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3 max-md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
      <div
        v-for="entry in currentEntries"
        :key="entry.char"
        class="bg-[var(--gradient-card)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] px-4 py-5 text-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default hover:border-[var(--border-accent)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
      >
        <div class="text-[2.2rem] text-[var(--accent-cyan)] mb-2 tracking-[0.1em] min-h-[2.8rem] flex items-center justify-center">
          {{ entry.unicode }}
        </div>
        <div class="text-[1.3rem] font-bold text-[var(--text-primary)] mb-[0.2rem]">
          {{ entry.char }}
        </div>
        <div class="text-[0.75rem] text-[var(--text-secondary)] mb-[0.3rem]">
          {{ entry.label }}
        </div>
        <div class="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[var(--accent-purple)] opacity-80">
          dots {{ entry.dots }}
        </div>
      </div>
    </div>
  </main>
</template>
