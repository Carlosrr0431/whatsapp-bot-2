#!/bin/sh

echo "🚀 Iniciando WPPConnect Server..."

# Create necessary directories in the persistent volume
echo "📁 Creando directorios en volumen persistente..."
mkdir -p /data/userData
mkdir -p /data/tokens
mkdir -p /data/sessions

# Set proper permissions
echo "🔐 Configurando permisos..."
chmod -R 755 /data 2>/dev/null || true

# Create symbolic links to ensure compatibility
echo "🔗 Creando enlaces simbólicos..."
mkdir -p /usr/src/wpp-server/wppconnect_tokens

# Crear enlaces simbólicos solo si no existen
if [ ! -L "/usr/src/wpp-server/wppconnect_tokens/tokens" ]; then
    ln -sf /data /usr/src/wpp-server/wppconnect_tokens/tokens
fi

if [ ! -L "/usr/src/wpp-server/wppconnect_tokens/userData" ]; then
    ln -sf /data/userData /usr/src/wpp-server/wppconnect_tokens/userData
fi

# Verify directories exist
echo "✅ Verificando estructura de directorios..."
ls -la /data/ 2>/dev/null || echo "❌ No se puede acceder a /data/"

# Verificar Chromium
echo "🔍 Verificando Chromium..."
echo "- Path esperado: /usr/bin/chromium-browser"
echo "- Verificando existencia:"
ls -la /usr/bin/chromium* 2>/dev/null || echo "❌ No se encuentran ejecutables de Chromium"

if [ -f "/usr/bin/chromium-browser" ]; then
    echo "✅ chromium-browser encontrado"
    /usr/bin/chromium-browser --version 2>/dev/null || echo "❌ Error ejecutando chromium-browser --version"
    /usr/bin/chromium-browser --no-sandbox --disable-gpu --version 2>/dev/null || echo "❌ Error con argumentos básicos"
else
    echo "❌ chromium-browser no encontrado"
fi

echo "🎯 Iniciando aplicación..."
# Start the application
exec "$@"
