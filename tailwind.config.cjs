
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:{
extend:{
  fontFamily:{
    'sans': ['Inter', 'system-ui', 'sans-serif'], 
        'mono': ['JetBrains Mono', 'monospace'],
  },
   keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
       animation: {
        spin: 'spin 1s linear infinite',
      },
}
  },
   plugins: [
        require('@tailwindcss/line-clamp'),
      ],
  overrides: [
    {
      files: ['*.js', '*.cjs'], 
      parserOptions: {
        sourceType: 'module', 
      },
    },
  ],
  
}