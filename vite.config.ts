import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
    plugins      : [react()],
    optimizeDeps : {
        include : ['@bryntum/gantt', '@bryntum/gantt-react']
    },
    base : '',
    resolve : {
        alias : [
            { find : '~@bryntum', replacement : '/node_modules/@bryntum' }
        ]
    }
});
