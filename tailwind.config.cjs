
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
  }
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