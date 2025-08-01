# WPPConnect Server - Configuración para Fly.io

## Problema de las sesiones de WhatsApp

Las sesiones de WhatsApp no se mantienen después del despliegue en Fly.io debido a que:

1. **Almacenamiento efímero**: Por defecto, Fly.io usa almacenamiento efímero que se reinicia con cada despliegue
2. **Configuración de directorio de sesiones**: Las sesiones y tokens de WhatsApp se almacenan en archivos locales que se pierden

## Soluciones implementadas

### 1. Volumen persistente configurado

El archivo `fly.toml` está configurado con:
- Volumen persistente montado en `/usr/src/wpp-server/wppconnect_tokens`
- Variable de entorno `CUSTOM_USER_DATA_DIR` configurada

### 2. Comandos para desplegar correctamente

```bash
# 1. Crear el volumen persistente (solo la primera vez)
fly volumes create whatsapp_data --region eze --size 1

# 2. Verificar que el volumen existe
fly volumes list

# 3. Desplegar la aplicación
fly deploy

# 4. Verificar los logs
fly logs
```

### 3. Estructura de directorios en producción

```
/usr/src/wpp-server/wppconnect_tokens/  (volumen persistente)
├── userData/                          (sesiones de WhatsApp)
│   ├── session1/
│   ├── session2/
│   └── ...
└── *.data.json                       (tokens de sesión)
```

## Opciones alternativas (más robustas)

### Usar MongoDB para tokens

1. Obtener una base de datos MongoDB (MongoDB Atlas recomendado)
2. Modificar `src/config.ts`:
```typescript
tokenStoreType: 'mongodb',
```
3. Configurar en `fly.toml`:
```toml
[env]
MONGODB_URL_REMOTE = "mongodb+srv://usuario:password@cluster.mongodb.net/tokens"
```

### Usar Redis para tokens

1. Obtener una instancia de Redis (Upstash recomendado)
2. Modificar `src/config.ts`:
```typescript
tokenStoreType: 'redis',
```
3. Configurar en `fly.toml`:
```toml
[env]
REDIS_HOST = "tu-redis-host"
REDIS_PORT = "6379"
REDIS_PASSWORD = "tu-password"
```

## Verificación post-despliegue

1. **Verificar montaje del volumen**:
```bash
fly ssh console
ls -la /usr/src/wpp-server/wppconnect_tokens/
```

2. **Verificar logs de sesión**:
```bash
fly logs --tail
```

3. **Probar persistencia**:
   - Crear una sesión de WhatsApp
   - Reiniciar la aplicación: `fly apps restart wppconnect-server-polished-grass-7184`
   - Verificar que la sesión persiste

## Notas importantes

- El volumen debe crearse **antes** del primer despliegue
- Las sesiones de WhatsApp pueden tardar unos minutos en reconectarse después de un reinicio
- Para sesiones existentes, considera hacer backup y restaurar los archivos de token
