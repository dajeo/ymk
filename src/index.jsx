import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import App from './App'

console.log(`%c

                                               
8b        d8  88b           d88  88      a8P   
 Y8,    ,8P   888b         d888  88    ,88'    
  Y8,  ,8P    88\`8b       d8'88  88  ,88"      
   "8aa8"     88 \`8b     d8' 88  88,d88'       
    \`88'      88  \`8b   d8'  88  8888"88,      
     88       88   \`8b d8'   88  88P   Y8b     
     88       88    \`888'    88  88     "88,   
     88       88     \`8'     88  88       Y8b  
                                               
                                               
`, 'color: #1f5290')

createRoot(document.getElementById('root')).render(<App />)
