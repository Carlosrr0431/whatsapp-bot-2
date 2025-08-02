import { ServerOptions } from './types/ServerOptions';
import { getEnvConfig } from './util/envConfig';

const envConfig = getEnvConfig();

export default {
  secretKey: 'THISISMYSECURETOKEN',
  host: 'https://wppconnect-server-polished-grass-7184.fly.dev',
  port: '21465',
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',
  startAllSession: true,
  tokenStoreType: envConfig.tokenStoreType,
  maxListeners: 100,
  customUserDataDir: envConfig.customUserDataDir,
 webhook: {
  url: null,                   // No hay URL de webhook configurada aún
  autoDownload: true,          // Descarga automática de archivos multimedia
  readMessage: false,           // Marca los mensajes como leídos al recibirlos
  listenAcks: true,            // Escucha confirmaciones de lectura (ticks)
  onPresenceChanged: false,    // ❌ No escucha cambios de presencia (por ejemplo: "escribiendo...")
  onParticipantsChanged: false, // ❌ No escucha cambios en participantes de grupos
  onReactionMessage: true,    // ❌ No escucha reacciones (emojis)
  onPollResponse: true,        // ✅ Escucha respuestas a encuestas
  onRevokedMessage: true,      // ✅ Escucha cuando un mensaje se borra para todos
  onLabelUpdated: false,        // ✅ Escucha cambios de etiquetas
  onSelfMessage: false,        // ❌ No procesa mensajes enviados por el propio bot
  ignore: ['status@broadcast'] // Ignora mensajes del estado de WhatsApp
},
   websocket: {
    autoDownload: true,
    uploadS3: false,
  },
  chatwoot: {
    sendQrCode: false,
    sendStatus: false,
  },
  archive: {
    enable: false,
    waitTime: 10,
    daysToArchive: 45,
  },
  log: {
      level: 'silly', // Cambiado temporalmente para debug
      logger: ['console'],
    },
  createOptions: {
   browserArgs: [
    '--no-sandbox',
    '--disable-web-security',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-sync',
    '--disable-translate',
    '--hide-scrollbars',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-first-run',
    '--ignore-certificate-errors',
    '--ignore-ssl-errors',
    '--ignore-certificate-errors-spki-list',
    '--disable-background-networking',
    '--disable-gpu',
    '--disable-dev-shm-usage',           
    '--disable-setuid-sandbox',          
    '--no-zygote',                       
    '--single-process',                  
    '--disable-background-timer-throttling', 
    '--disable-renderer-backgrounding',  
    '--disable-backgrounding-occluded-windows',
    '--disable-features=TranslateUI',    // ✅ NUEVO: Desactiva traducción
    '--disable-ipc-flooding-protection', // ✅ NUEVO: Mejor comunicación IPC
    '--disable-features=VizDisplayCompositor', // ✅ NUEVO: Mejor rendimiento
    '--aggressive-cache-discard',        // ✅ NUEVO: Libera memoria
    '--max_old_space_size=4096'          // ✅ NUEVO: Más memoria para Node.js
  ],
    executablePath: '/usr/bin/chromium-browser',
    userDataDir: envConfig.customUserDataDir,
    keepAlive: true,
    keepAliveInterval: 300000,  
    linkPreviewApiServers: null,
    // ✅ AGREGAR: Configuraciones específicas para QR más rápido
    puppeteerOptions: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 60000,  // ✅ NUEVO: 60 segundos timeout
    },
    // ✅ AGREGAR: Configuración de página para acelerar carga
    browserWaitForActiveProcess: 30000,  // ✅ NUEVO: Espera 30 segundos
    waitForLogin: 60000,                 // ✅ NUEVO: Espera 60 segundos para login
  },
  mapper: {
    enable: false,
    prefix: 'tagone-',
  },
  db: {
    mongodbDatabase: 'tokens',
    mongodbCollection: '',
    mongodbUser: '',
    mongodbPassword: '',
    mongodbHost: '',
    mongoIsRemote: true,
    mongoURLRemote: '',
    mongodbPort: 27017,
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: '',
    redisDb: 0,
    redisPrefix: 'docker',
  },
  aws_s3: {
    region: 'sa-east-1' as any,
    access_key_id: null,
    secret_key: null,
    defaultBucketName: null,
    endpoint: null,
    forcePathStyle: null,
  },
} as unknown as ServerOptions;
