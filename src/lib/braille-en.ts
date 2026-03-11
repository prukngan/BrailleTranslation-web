// =====================================================================
// English Braille Translator (Grade 1 / Uncontracted)
// Ported from BrailleTranslation_EN.py
// =====================================================================
import { EN_BRAILLE_MAP } from './EN_MAP'

export interface BrailleCell {
    row1: number // dot1 + dot4
    row2: number // dot2 + dot5
    row3: number // dot3 + dot6
}

/**
 * Convert dot string like '1245' to a BrailleCell
 * row value: 0=no dots, 1=left only, 2=right only, 3=both
 */
function dotToCell(dotString: string): BrailleCell {
    const dots = new Set(dotString.split(''))
    return {
        row1: (dots.has('1') ? 1 : 0) + (dots.has('4') ? 2 : 0),
        row2: (dots.has('2') ? 1 : 0) + (dots.has('5') ? 2 : 0),
        row3: (dots.has('3') ? 1 : 0) + (dots.has('6') ? 2 : 0),
    }
}

/** Convert ASCII art row value to display string */
function star(a: number): string {
    if (a === 3) return '**| '
    if (a === 2) return '*_| '
    if (a === 1) return '_*| '
    return '__| '
}

export interface BrailleResult {
    lines: [string, string, string]
    cells: BrailleCell[]
}

/**
 * Translate English text to Braille ASCII art (3 rows)
 */
export function translateEnglish(text: string): BrailleResult {
    const lines: [string, string, string] = ['', '', '']
    const cells: BrailleCell[] = []

    for (const ch of text) {
        const dotList = EN_BRAILLE_MAP[ch.toLowerCase()]
        if (ch === ' ' || !dotList) {
            const emptyCell: BrailleCell = { row1: 0, row2: 0, row3: 0 }
            cells.push(emptyCell)
            lines[0] += star(0).split('').reverse().join('')
            lines[1] += star(0).split('').reverse().join('')
            lines[2] += star(0).split('').reverse().join('')
        } else {
            for (const dots of dotList) {
                const cell = dotToCell(dots)
                cells.push(cell)
                lines[0] += star(cell.row1).split('').reverse().join('')
                lines[1] += star(cell.row2).split('').reverse().join('')
                lines[2] += star(cell.row3).split('').reverse().join('')
            }
        }
    }

    return { lines, cells }
}

/**
 * Get the Unicode Braille character for a cell
 */
export function cellToUnicode(cell: BrailleCell): string {
    let code = 0x2800
    // dot1=bit0, dot2=bit1, dot3=bit2, dot4=bit3, dot5=bit4, dot6=bit5
    if (cell.row1 & 1) code |= 0x01 // dot 1
    if (cell.row2 & 1) code |= 0x02 // dot 2
    if (cell.row3 & 1) code |= 0x04 // dot 3
    if (cell.row1 & 2) code |= 0x08 // dot 4
    if (cell.row2 & 2) code |= 0x10 // dot 5
    if (cell.row3 & 2) code |= 0x20 // dot 6
    return String.fromCharCode(code)
}

/**
 * Translate text and return Unicode Braille string
 */
export function translateEnglishToUnicode(text: string): string {
    const { cells } = translateEnglish(text)
    return cells.map(cellToUnicode).join('')
}
