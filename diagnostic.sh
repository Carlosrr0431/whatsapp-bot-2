#!/bin/sh

echo "🔍 DIAGNÓSTICO WPPConnect en Fly.io"
echo "=================================="

echo "📋 Información del sistema:"
echo "- OS: $(uname -a)"
echo "- Usuario actual: $(whoami)"
echo "- Node.js: $(node --version)"
echo "- Yarn: $(yarn --version)"

echo ""
echo "🔍 Verificando Chromium:"
if command -v chromium-browser >/dev/null 2>&1; then
    echo "✅ Chromium encontrado: $(chromium-browser --version)"
    echo "📍 Ubicación: $(which chromium-browser)"
else
    echo "❌ Chromium no encontrado"
fi

echo ""
echo "📁 Verificando directorios:"
echo "- Directorio de trabajo: $(pwd)"
echo "- Contenido actual:"
ls -la

echo ""
echo "💾 Verificando volumen persistente:"
if [ -d "/data" ]; then
    echo "✅ Volumen /data existe"
    echo "📋 Contenido de /data:"
    ls -la /data/
    
    echo "📋 Permisos de /data:"
    ls -ld /data/
    
    if [ -d "/data/userData" ]; then
        echo "✅ Directorio userData existe"
        ls -la /data/userData/
    else
        echo "❌ Directorio userData no existe"
    fi
else
    echo "❌ Volumen /data no existe"
fi

echo ""
echo "🔗 Verificando enlaces simbólicos:"
if [ -d "/usr/src/wpp-server/wppconnect_tokens" ]; then
    echo "✅ Directorio wppconnect_tokens existe"
    ls -la /usr/src/wpp-server/wppconnect_tokens/
else
    echo "❌ Directorio wppconnect_tokens no existe"
fi

echo ""
echo "🌐 Verificando variables de entorno:"
echo "- NODE_ENV: ${NODE_ENV}"
echo "- PUPPETEER_EXECUTABLE_PATH: ${PUPPETEER_EXECUTABLE_PATH}"
echo "- SESSION_FOLDER: ${SESSION_FOLDER}"
echo "- CUSTOM_USER_DATA_DIR: ${CUSTOM_USER_DATA_DIR}"

echo ""
echo "📦 Verificando archivos de la aplicación:"
if [ -f "dist/server.js" ]; then
    echo "✅ Archivo server.js compilado existe"
else
    echo "❌ Archivo server.js compilado no existe"
fi

if [ -f "package.json" ]; then
    echo "✅ package.json existe"
    echo "📋 Scripts disponibles:"
    cat package.json | grep -A 10 '"scripts"'
else
    echo "❌ package.json no existe"
fi

echo ""
echo "🔍 Verificando procesos:"
ps aux | grep -E "(node|chromium)" || echo "No hay procesos de Node.js o Chromium ejecutándose"

echo ""
echo "=================================="
echo "✅ Diagnóstico completado"
