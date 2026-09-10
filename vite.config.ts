import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The dev server is reachable on localhost, on the LAN, and through a
// Cloudflare Quick Tunnel — whose hostname is generated per run, hence the
// wildcard suffixes rather than a fixed host.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['localhost', '127.0.0.1', '.trycloudflare.com', '.cfargotunnel.com'],
    // `hmr` is deliberately left unset: the client then derives host, port and
    // ws/wss from the page's own location, which is what makes the socket
    // follow the tunnel to :443 over TLS without anyone having to remember a
    // flag. Pinning it here is what breaks HMR behind the tunnel.
  },
  preview: {
    host: true,
    allowedHosts: ['localhost', '127.0.0.1', '.trycloudflare.com', '.cfargotunnel.com'],
  },
})
