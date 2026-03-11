// =====================================================================
// Thai Braille Translator
// Ported from BrailleTranslation_TH.py + translator.py
// Reference: liblouis th-g0.utb
// =====================================================================

import type { BrailleCell, BrailleResult } from './braille-en'
import { cellToUnicode } from './braille-en'
import { THAI_BRAILLE_MAP } from './TH_MAP'

function dotToCell(dotString: string): BrailleCell {
    const dots = new Set(dotString.split(''))
    return {
        row1: (dots.has('1') ? 1 : 0) + (dots.has('4') ? 2 : 0),
        row2: (dots.has('2') ? 1 : 0) + (dots.has('5') ? 2 : 0),
        row3: (dots.has('3') ? 1 : 0) + (dots.has('6') ? 2 : 0),
    }
}

// =====================================================================
// Thai text parser (from translator.py)
// =====================================================================

function classify(c: string): string {
    if ('เแโใไ'.includes(c)) return 'Vpre'
    if ('่้๊๋'.includes(c)) return 'Tone'
    if ('ะาิีึืุูั'.includes(c)) return 'Vmain'
    if ('กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ'.includes(c)) return 'C'
    if (['เอ', 'เีย', 'เือ', 'ัว', 'เา'].includes(c)) return 'Spelling'
    return 'OTHER'
}

function parseThai(textTemp: string): {
    character: string[]
    spelling: string[]
    tone: string[]
    lastC: string[]
} {
    let text = textTemp
    const character: string[] = []
    let spelling: string[] = []
    const tone: string[] = []
    let lastC: string[] = []

    if (!text.length) return { character, spelling, tone, lastC }

    if (classify(text[0]!) === 'Vpre') {
        // สระนำหน้าพยัญชนะ
        for (let i = 1; i < text.length; i++) {
            if (classify(text[1]!) !== 'C') break
            character.push(text[1]!)
            text = text.slice(0, 1) + text.slice(2)
        }

        for (const c of text) {
            if (classify(c) === 'Tone') {
                tone.push(c)
                text = text.replace(c, '')
                break
            }
        }

        if (classify(text) === 'Spelling') {
            spelling = [text]
        } else {
            if (classify(text[text.length - 1]!) === 'C') {
                lastC = [text[text.length - 1]!]
                text = text.slice(0, -1)
                if (text === 'เิ') {
                    spelling = text ? [text] : []
                } else if (classify(text) === 'Spelling') {
                    spelling = text ? [text] : []
                } else {
                    for (const c of text) {
                        tone.push(c)
                    }
                }
            } else if (text === 'เาะ') {
                spelling.push(text)
            } else if (text[text.length - 1] === 'ะ') {
                spelling.push(text.slice(0, -1))
                spelling.push('ะ')
            } else {
                for (const c of text) {
                    spelling.push(c)
                }
            }
        }
    } else {
        for (const c of text) {
            if (classify(c) !== 'C') break
            character.push(c)
            text = text.slice(1)
        }

        let spellingTmp = ''
        for (const c of text) {
            spellingTmp += c
            if (classify(spellingTmp) === 'Spelling') {
                spelling = [spellingTmp]
                text = text.slice(spellingTmp.length)
                if (text === 'ะ') {
                    spelling.push(text)
                } else {
                    lastC = text ? [text] : []
                }
                break
            }
        }
    }

    return { character, spelling, tone, lastC }
}


export function brailleTranslate(text: string): string[] {
    const { character, spelling, tone, lastC } = parseThai(text)

    if (!spelling.length) return [...text]
    if (classify(spelling[0] ?? '') === 'Vpre') return [...text]
    if (spelling[0] === 'เอ' && lastC.length) return [...text]

    let finalSpelling = spelling
    if (spelling[0] === 'เิ') {
        finalSpelling = ['เอ']
    }

    return [...character, ...finalSpelling, ...tone, ...lastC]
}

// =====================================================================
// Simple Thai syllable tokenizer (frontend-only, no pythainlp)
// =====================================================================

/**
 * Basic Thai syllable segmentation.
 * This is a simplified version - not as accurate as pythainlp
 * but works for basic Thai text without a backend.
 */
export function simpleThaiTokenize(text: string): string[] {
    const segmenter = new (Intl as any).Segmenter('th', { granularity: 'word' });
    return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
}

/** ASCII art star function */
function star(a: number): string {
    if (a === 3) return '**| '
    if (a === 2) return '*_| '
    if (a === 1) return '_*| '
    return '__| '
}

/** Translate a list of Thai characters/spelling units to Braille ASCII art */
function translateCharList(charList: string[]): BrailleResult {
    const lines: [string, string, string] = ['', '', '']
    const cells: BrailleCell[] = []

    for (const ch of charList) {
        if (ch === ' ') {
            const emptyCell: BrailleCell = { row1: 0, row2: 0, row3: 0 }
            cells.push(emptyCell)
            lines[0] += star(0).split('').reverse().join('')
            lines[1] += star(0).split('').reverse().join('')
            lines[2] += star(0).split('').reverse().join('')
        } else if (THAI_BRAILLE_MAP[ch]) {
            const dotList = THAI_BRAILLE_MAP[ch]
            for (const dots of dotList) {
                const cell = dotToCell(dots)
                cells.push(cell)
                lines[0] += star(cell.row1).split('').reverse().join('')
                lines[1] += star(cell.row2).split('').reverse().join('')
                lines[2] += star(cell.row3).split('').reverse().join('')
            }
        } else {
            const emptyCell: BrailleCell = { row1: 0, row2: 0, row3: 0 }
            cells.push(emptyCell)
            lines[0] += star(0).split('').reverse().join('')
            lines[1] += star(0).split('').reverse().join('')
            lines[2] += star(0).split('').reverse().join('')
        }
    }

    return { lines, cells }
}

/**
 * Translate Thai text to Braille
 */
export function translateThai(text: string): BrailleResult {
    const words = simpleThaiTokenize(text)
    const allCells: BrailleCell[] = []
    const allLines: [string, string, string] = ['', '', '']

    for (const word of words) {
        // Check if this word contains Thai characters
        const hasThai = [...word].some(c => c.charCodeAt(0) >= 0x0E01 && c.charCodeAt(0) <= 0x0E7F)

        if (hasThai) {
            const transList = brailleTranslate(word)
            const result = translateCharList(transList)
            allCells.push(...result.cells)
            allLines[0] += result.lines[0]
            allLines[1] += result.lines[1]
            allLines[2] += result.lines[2]
        } else {
            // Non-Thai: translate each character directly
            const result = translateCharList([...word])
            allCells.push(...result.cells)
            allLines[0] += result.lines[0]
            allLines[1] += result.lines[1]
            allLines[2] += result.lines[2]
        }
    }

    return { lines: allLines, cells: allCells }
}

/**
 * Translate Thai text and return Unicode Braille string
 */
export function translateThaiToUnicode(text: string): string {
    const { cells } = translateThai(text)
    return cells.map(cellToUnicode).join('')
}
