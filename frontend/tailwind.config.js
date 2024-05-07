/** @type {import('tailwindcss').Config} */

/*
 * We extend Tailwind's default values with a few custom ones
 * Note that only number-based values are overridden
 * This means that you can still do text-2xl, w-1/2, tracking-wider etc.
 *
 * Font Size:
 * @example For a given value of 16px (1rem)
 * Before: text-base
 * After: text-16
 *
 * Spacing: (apply to to p, m, w, h, etc.)
 * @example For a given value of 32px (2rem)
 * Before: p-8
 * After: p-32
 *
 * Letter Spacing:
 * @example For a given value of 0.05em
 * Before: tracking-wider
 * After: tracking-5
 *
 * Line Height:
 * @example For a given value of 1.5
 * Before: leading-normal
 * After: leading-15
 */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#008882',
        artwork: '#ebebeb',
        publication: '#ebebeb'
      },
      fontFamily: {
        chinese: 'var(--chinese)',
        display: 'var(--display)',
        'display-local': 'var(--display-local)',
        'display-sc': 'var(--display-sc)',
        'display-light': 'var(--display-light)',
        'display-infant': 'var(--display-infant)',
        condensed: 'var(--condensed)'
      },
      textUnderlineOffset: {
        text: '0.3em'
      },
      fontSize: Array.from({ length: 129 }, (_, i) => i).reduce(
        (acc, val) => {
          acc[val] = `${val / 16}rem`
          return acc
        },
        {
          title: '2rem',
          description: '1rem',
          caption: '0.8rem',
          info: '0.5rem'
        }
      ),
      spacing: Array.from({ length: 385 }, (_, i) => i).reduce((acc, val) => {
        acc[val] = `${val / 16}rem`
        return acc
      }, {}),
      letterSpacing: Array.from({ length: 11 }, (_, i) => i).reduce(
        (acc, val) => {
          acc[val] = `${val / 100}em`
          return acc
        },
        {
          logo: '-.05em',
          // display: '-.07em',
          display: '0em',
          'display-uppercase': '-.1em',
          'display-text': '-.03em',
          description: '-.03em',
          caption: '-.03em',
          condensed: '-.05em'
        }
      ),
      lineHeight: Array.from({ length: 21 }, (_, i) => i).reduce((acc, val) => {
        acc[val] = `${val / 10}`
        return acc
      }, {}),
      screens: {
        sm: { min: '300px', max: '1023px' },
        lg: { min: '1280px' }
      },
      transitionProperty: {
        width: 'width'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}
