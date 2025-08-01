# 🚀 COMANDOS PARA FLY.IO - WPPConnect Server

## 📋 PASOS OBLIGATORIOS (ejecutar en orden):

### 1. Verificar que tienes el volumen creado
```bash
fly volumes list
```

### 2. Si NO tienes volumen, crearlo:
```bash
fly volumes create whatsapp_data --region eze --size 2
```

### 3. IMPORTANTE: Configurar a una sola instancia
```bash
fly scale count 1 --max-per-region 1
```

### 4. Verificar configuración de escalado
```bash
fly scale show
```

### 5. Desplegar la aplicación
```bash
fly deploy --force
```

### 6. Verificar estado del despliegue
```bash
fly status
```

### 7. Ver logs en tiempo real
```bash
fly logs
```

## 🔍 COMANDOS DE DIAGNÓSTICO:

### Conectarse por SSH y ejecutar diagnóstico
```bash
fly ssh console
# Una vez dentro:
/diagnostic.sh
```

### Ver logs específicos
```bash
fly logs --app wppconnect-server-polished-grass-7184
```

### Verificar volumen específico
```bash
fly volumes show whatsapp_data
```

### Reiniciar aplicación si es necesario
```bash
fly apps restart wppconnect-server-polished-grass-7184
```

## 🚨 SOLUCIÓN DE PROBLEMAS:

### Si la sesión se sigue perdiendo:

1. **Verificar que solo hay 1 instancia:**
   ```bash
   fly scale show
   # Debe mostrar: Count: 1, Max Per Region: 1
   ```

2. **Verificar que el volumen está montado:**
   ```bash
   fly ssh console
   ls -la /data/
   ```

3. **Verificar logs de inicialización:**
   ```bash
   fly logs | grep -E "(🚀|📁|✅|❌)"
   ```

4. **Si nada funciona, recrear volumen:**
   ```bash
   fly volumes destroy whatsapp_data
   fly volumes create whatsapp_data --region eze --size 2
   fly deploy --force
   ```

## ✅ VERIFICACIÓN FINAL:

### Para confirmar que todo funciona:

1. **Crear sesión de WhatsApp:**
   - Hacer petición POST a `/api/[session]/start-session`
   - Escanear QR code

2. **Verificar persistencia:**
   ```bash
   fly apps restart
   # Después del reinicio, la sesión debe mantenerse
   ```

3. **Probar funcionalidades:**
   - Enviar mensaje
   - Obtener chats
   - Obtener historial

## 🎯 CONFIGURACIÓN OPTIMIZADA:

Tu configuración actual incluye:
- ✅ Volumen persistente en `/data`
- ✅ Chromium optimizado para contenedores
- ✅ Variables de entorno correctas
- ✅ Script de inicialización robusto
- ✅ Argumentos de Puppeteer optimizados para Fly.io

¡Con estos comandos, WPPConnect debería funcionar como Railway! 🎉
