const superscript = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '-': '⁻',
  ' ': ' '}

const subscript = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '-': '₋',
  ' ': ' '
}

export const defaultFractions = {
  '1/4': '¹⁄₄',
  '1/2': '¹⁄₂',
  '3/4': '³⁄₄',
  '1/7': '¹⁄₇',
  '1/9': '¹⁄₉',
  '1/10': '¹⁄₁₀',
  '1/3': '¹⁄₃',
  '2/3': '²⁄₃',
  '1/5': '¹⁄₅',
  '2/5': '²⁄₅',
  '3/5': '³⁄₅',
  '4/5': '⁴⁄₅',
  '1/6': '¹⁄₆',
  '5/6': '⁵⁄₆',
  '1/8': '¹⁄₈',
  '3/8': '³⁄₈',
  '5/8': '⁵⁄₈',
  '7/8': '⁷⁄₈',
  '1/ ': '¹⁄ ',
  '0/3': '⁰⁄₃'
}

const slash = '⁄';

/**
 *
 * @param {string} text
 * @return {string}
 */
export const formatFraction = (text) => {
  if (!text || text === '/') return ''

  const fractions = text.match(/(-?\d+\/-?\d+)/g);

  if (fractions?.length > 0) {
    fractions.filter((val, ind, arr) => arr.indexOf(val) === ind).forEach(frac => {
      let script = superscript
      let formattedText = ''

      if (defaultFractions[frac]) {
        formattedText = defaultFractions[frac]
      } else {
        frac.split('').forEach(char => {
          if (char === '/') {
            script = subscript
            formattedText += slash
          } else {
            formattedText += script[char]
          }
        })
      }

      text = text.replaceAll(frac, formattedText)
    })
  }

  return text
}

function reduce(numerator, denominator) {
  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }

  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

export function generateFraction(numerator, denominator) {
  numerator = numerator.trim();
  denominator = denominator.trim();

  let original = formatFraction(numerator + '/' + denominator);
  let simplified = '';
  if (/^-?\d+$/.test(numerator) && /^-?\d+$/.test(denominator)) {
    simplified = reduce(numerator, denominator);
    simplified = formatFraction(simplified[0].toString() + '/' + simplified[1].toString());
  }
  if (simplified === original) simplified = '';
  return ({original, simplified});
}
