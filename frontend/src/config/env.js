// Helper module to access Vite environment variables with safe defaults
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  websocketUrl: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8080/api/ws',
  appTitle: import.meta.env.VITE_APP_TITLE || 'Digital Pass Library & Bookstore',
  enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA !== 'false',
};

export default config;
