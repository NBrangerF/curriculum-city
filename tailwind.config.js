/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Blueprint aesthetic colors
                blueprint: {
                    50: '#f0f7ff',
                    100: '#e0efff',
                    200: '#bae0ff',
                    300: '#7cc4ff',
                    400: '#36a5ff',
                    500: '#0c88f4',
                    600: '#006bd1',
                    700: '#0054a8',
                    800: '#00478a',
                    900: '#063c72',
                    950: '#04264b',
                },
                // Heat intensity colors for matrix
                heat: {
                    0: '#f8fafc', // no influence
                    1: '#dcfce7', // minimal
                    2: '#bbf7d0', // low
                    3: '#fef08a', // medium
                    4: '#fca5a5', // high
                },
                // Actor level colors
                actor: {
                    macro: '#7c3aed',  // purple
                    meso: '#0891b2',   // cyan
                    micro: '#059669',  // emerald
                    nano: '#d97706',   // amber
                }
            },
            backgroundImage: {
                'blueprint-grid': `
          linear-gradient(rgba(6, 60, 114, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 60, 114, 0.03) 1px, transparent 1px)
        `,
            },
            backgroundSize: {
                'grid': '20px 20px',
            },
        },
    },
    plugins: [],
}
