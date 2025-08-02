import { ServerOptions } from './types/ServerOptions';
import { getEnvConfig } from './util/envConfig';

const envConfig = getEnvConfig();

export default {
  secretKey: 'THISISMYSECURETOKEN',
  host: 'https://wppconnect-server-polished-grass-7184.fly.dev',
  port: '21465',
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',
  startAllSession: false,
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
  onReactionMessage: false,    // ❌ No escucha reacciones (emojis)
  onPollResponse: false,        // ✅ Escucha respuestas a encuestas
  onRevokedMessage: false,      // ✅ Escucha cuando un mensaje se borra para todos
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
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-web-security',
    '--no-first-run',
    '--mute-audio',
    '--ignore-certificate-errors',
    '--ignore-ssl-errors',
    '--aggressive-cache-discard'
  ],
  executablePath: '/usr/bin/chromium-browser',
    userDataDir: envConfig.customUserDataDir,
    keepAlive: true,
    keepAliveInterval: 300000,  
    linkPreviewApiServers: null,
    puppeteerOptions: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 120000,  // ✅ Aumentado a 2 minutos
    },
    browserWaitForActiveProcess: 60000,  // ✅ Aumentado 
    waitForLogin: 120000,                // ✅ Aumentado a 2 minutos
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
