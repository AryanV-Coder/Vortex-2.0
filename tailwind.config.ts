import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FFF5F0',
                    100: '#FFE8DC',
                    200: '#FFD0B9',
                    300: '#FFB885',
                    400: '#FF9D5C',
                    500: '#FF8243',
                    600: '#E77B4D',
                    700: '#D2691E',
                    800: '#B85A1A',
                    900: '#9E4D17',
                    950: '#7A3A11',
                },
            },
            borderRadius: {
                '2xl': '1rem',
            },
        },
    },
    plugins: [],
} satisfies Config;
