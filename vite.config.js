import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),

        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Mstr-Ledger',
                short_name: 'Mstr-Ledger',
                description: 'Mstr-Ledger Application',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                scope: '/',

                icons: [
                    {
                        src: '/mstr-ledger-desktop.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/mstr-ledger-desktop.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
})