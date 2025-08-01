FROM node:22.17.1-alpine AS base
WORKDIR /usr/src/wpp-server
ENV NODE_ENV=production PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Instalar dependencias del sistema necesarias para WPPConnect
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    dbus \
    && rm -rf /var/cache/apk/*

# Configurar Chromium para Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROMIUM_PATH=/usr/bin/chromium-browser

COPY package.json ./
RUN yarn install --production --pure-lockfile && \
    yarn add sharp --ignore-engines && \
    yarn cache clean

FROM base AS build
WORKDIR /usr/src/wpp-server
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
COPY package.json  ./
RUN yarn install --production=false --pure-lockfile
RUN yarn cache clean
COPY . .
RUN yarn build

FROM base
WORKDIR /usr/src/wpp-server/

# Copiar archivos compilados
COPY --from=build /usr/src/wpp-server/dist ./dist
COPY --from=build /usr/src/wpp-server/package.json ./package.json
COPY --from=build /usr/src/wpp-server/node_modules ./node_modules

# Copiar script de inicialización
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Crear directorios base
RUN mkdir -p /usr/src/wpp-server/wppconnect_tokens

EXPOSE 21465

# Verificar que Chromium funciona
RUN /usr/bin/chromium-browser --version && \
    which chromium-browser && \
    ls -la /usr/bin/chromium*

# Verificar también como chromium sin -browser
RUN ln -sf /usr/bin/chromium-browser /usr/bin/chromium 2>/dev/null || true

ENTRYPOINT ["/entrypoint.sh", "node", "dist/server.js"]
