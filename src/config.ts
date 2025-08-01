import { ServerOptions } from './types/ServerOptions';
import { getEnvConfig } from './util/envConfig';

const envConfig = getEnvConfig();

export default {
  secretKey: 'THISISMYSECURETOKEN',
  host: 'http://localhost',
  port: '21465',
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',
  startAllSession: false,
  tokenStoreType: envConfig.tokenStoreType,
  maxListeners: 15,
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
    autoDownload: false,
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
    level: 'warn', // Before open a issue, change level to silly and retry a action
    logger: ['console'],
  },
  createOptions: {
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=TranslateUI,VizDisplayCompositor',
      '--disable-ipc-flooding-protection',
      '--enable-features=NetworkService,NetworkServiceLogging',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--safebrowsing-disable-auto-update',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--ignore-certificate-errors-spki-list',
      '--disable-software-rasterizer',
      '--disable-background-tasks',
      '--disable-background-timer-throttling',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-domain-reliability',
      '--disable-hang-monitor',
      '--disable-prompt-on-repost',
      '--disable-background-media-suspend',
      '--force-color-profile=srgb',
      '--memory-pressure-off',
      '--max_old_space_size=4096',
      '--disable-web-security'
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
