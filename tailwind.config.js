
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#F7F6F2', // Primary
                'alt-section': '#EFEDE6',
                'dark-section': '#111111',

                primary: {
                    DEFAULT: '#3B82F6', // Electric Blue
                    foreground: '#FFFFFF',
                },
                'accent-coral': '#FF5C5C', // Hot Coral
                'accent-lime': '#B4F000', // Lime Pop

                ink: '#1A1A1A', // Midnight Ink
                slate: '#5C5C5C', // Slate Neutral
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'sans-serif'],
            },
            keyframes: {
                'slide-up': {
                    '0%': { transform: 'translateY(10px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
            },
            animation: {
                'slide-up': 'slide-up 0.5s ease-out forwards',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
