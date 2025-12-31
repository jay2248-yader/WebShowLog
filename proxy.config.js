export const proxyConfig = {
  '/api': {
    target: 'http://30.30.30.222:65532',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
