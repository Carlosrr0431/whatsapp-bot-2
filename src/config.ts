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
    '--disable-dev-shm-usage',           // ✅ AGREGADO: Mejor manejo de memoria
    '--disable-setuid-sandbox',          // ✅ AGREGADO: Necesario para contenedores
    '--no-zygote',                       // ✅ AGREGADO: Mejor para contenedores
    '--single-process',                  // ✅ AGREGADO: Evita problemas de memoria
    '--disable-background-timer-throttling', // ✅ AGREGADO: Mejor rendimiento
    '--disable-renderer-backgrounding',  // ✅ AGREGADO: Mantiene procesos activos
    '--disable-backgrounding-occluded-windows' // ✅ AGREGADO: No suspende ventanas
  ],
    executablePath: '/usr/bin/chromium-browser',
    userDataDir: envConfig.customUserDataDir,
    keepAlive: true,
    // interval en ms
    keepAliveInterval: 300000,  // cada 5 minutos
    /**
     * Example of configuring the linkPreview generator
     * If you set this to 'null', it will use global servers; however, you have the option to define your own server
     * Clone the repository https://github.com/wppconnect-team/wa-js-api-server and host it on your server with ssl
     *
     * Configure the attribute as follows:
     * linkPreviewApiServers: [ 'https://www.yourserver.com/wa-js-api-server' ]
     */
    linkPreviewApiServers: null,
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
