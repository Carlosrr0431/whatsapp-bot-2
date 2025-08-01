// Environment configuration helper optimizado para Fly.io

export const getEnvConfig = () => {
  console.log('🌐 Plataforma detectada: FLY');
  
  // Configuración específica para Fly.io
  return {
    sessionFolder: '/data',
    customUserDataDir: '/data/userData/',
    tokenStoreType: 'file',
    platform: 'fly'
  };
};
