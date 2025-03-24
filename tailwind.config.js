/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#191717',
          'bg-card': '#222020',
          'bg-card-alt': '#1d1c1c',
          text: '#71A5B9',
          'text-hover': '#8fC6d9',
          prompt: '#cccccc',
          command: '#ffffff',
          link: '#aaaaaa',
          border: '#333333',
          secondary: '#777777',
          tertiary: '#555555',
          'text-light': '#aaaaaa',
        }
      },
      fontFamily: {
        mono: ['var(--font-family)', 'monospace']
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
} 