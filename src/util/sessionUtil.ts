/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Whatsapp } from '@wppconnect-team/wppconnect';
import { EventEmitter } from 'events';

export const chromiumArgs = [
  '--disable-web-security', // Disables web security
  '--no-sandbox', // Disables sandbox
  '--aggressive-cache-discard', // Aggressively discards cache
  '--disable-cache', // Disables cache
  '--disable-application-cache', // Disables application cache
  '--disable-offline-load-stale-cache', // Disables loading stale offline cache
  '--disk-cache-size=0', // Sets disk cache size to 0
  '--disable-background-networking', // Disables background networking activities
  '--disable-default-apps', // Disables default apps
  '--disable-extensions', // Disables extensions
  '--disable-sync', // Disables synchronization
  '--disable-translate', // Disables translation
  '--hide-scrollbars', // Hides scrollbars
  '--metrics-recording-only', // Records metrics only
  '--mute-audio', // Mutes audio
  '--no-first-run', // Skips first run
  '--safebrowsing-disable-auto-update', // Disables Safe Browsing auto-update
  '--ignore-certificate-errors', // Ignores certificate errors
  '--ignore-ssl-errors', // Ignores SSL errors
  '--ignore-certificate-errors-spki-list', // Ignores certificate errors in SPKI list
  // ✅ AGREGAR: Argumentos específicos para Fly.io
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--disable-setuid-sandbox',
  '--disable-background-timer-throttling',
  '--disable-renderer-backgrounding',
  '--disable-backgrounding-occluded-windows',
  '--disable-features=VizDisplayCompositor',
  '--memory-pressure-off',
  '--max_old_space_size=4096',
  '--single-process',
  '--no-zygote'
];

// ✅ CORREGIR: Cambiar de array a object
export const clientsArray: { [key: string]: Whatsapp } = {};
export const sessions: string[] = [];
export const eventEmitter = new EventEmitter();

// ✅ CORREGIR: Función de eliminación de sesión
export function deleteSessionOnArray(session: string): void {
  try {
    if (clientsArray[session]) {
      console.log(`🗑️ Deleting session: ${session}`);
      
      // Intentar cerrar la sesión si tiene el método close
      try {
        if (typeof clientsArray[session].close === 'function') {
          clientsArray[session].close();
        }
      } catch (closeError) {
        console.warn(`⚠️ Error closing session ${session}:`, closeError);
      }
      
      // Eliminar del objeto
      delete clientsArray[session];
      
      // Remover de la lista de sesiones
      const sessionIndex = sessions.indexOf(session);
      if (sessionIndex > -1) {
        sessions.splice(sessionIndex, 1);
      }
      
      console.log(`✅ Session ${session} deleted successfully`);
      console.log(`📊 Active sessions: ${Object.keys(clientsArray).length}`);
    } else {
      console.log(`⚠️ Session ${session} not found in array`);
    }
  } catch (error) {
    console.error(`❌ Error deleting session ${session}:`, error);
  }
}

// ✅ AGREGAR: Función para verificar si una sesión es válida
export function isValidSession(session: string): boolean {
  try {
    const client = clientsArray[session];
    if (!client) {
      console.log(`❌ Session ${session} not found`);
      return false;
    }
    
    // Verificar que tiene los métodos necesarios
    const requiredMethods = ['listChats', 'isConnected', 'sendText'];
    for (const method of requiredMethods) {
      if (typeof client[method] !== 'function') {
        console.log(`❌ Session ${session} missing method: ${method}`);
        return false;
      }
    }
    
    console.log(`✅ Session ${session} is valid`);
    return true;
  } catch (error) {
    console.error(`❌ Error validating session ${session}:`, error);
    return false;
  }
}

// ✅ AGREGAR: Función para obtener estadísticas de sesiones
export function getSessionStats(): { total: number; active: string[]; inactive: string[] } {
  const active: string[] = [];
  const inactive: string[] = [];
  
  for (const [sessionName, client] of Object.entries(clientsArray)) {
    if (isValidSession(sessionName)) {
      active.push(sessionName);
    } else {
      inactive.push(sessionName);
    }
  }
  
  return {
    total: Object.keys(clientsArray).length,
    active,
    inactive
  };
}

// ✅ AGREGAR: Función de limpieza automática
export function cleanupInvalidSessions(): void {
  try {
    console.log('🧹 Starting session cleanup...');
    const stats = getSessionStats();
    
    console.log(`📊 Session stats - Total: ${stats.total}, Active: ${stats.active.length}, Inactive: ${stats.inactive.length}`);
    
    // Eliminar sesiones inactivas
    for (const sessionName of stats.inactive) {
      console.log(`🗑️ Removing inactive session: ${sessionName}`);
      delete clientsArray[sessionName];
    }
    
    console.log(`✅ Cleanup completed. Remaining sessions: ${Object.keys(clientsArray).length}`);
  } catch (error) {
    console.error('❌ Error during session cleanup:', error);
  }
}

// ✅ AGREGAR: Limpieza automática cada 5 minutos
setInterval(() => {
  cleanupInvalidSessions();
}, 5 * 60 * 1000);

// ✅ AGREGAR: Log de sesiones cada minuto para debug
setInterval(() => {
  const stats = getSessionStats();
  if (stats.total > 0) {
    console.log(`📱 Sessions status - Active: ${stats.active.join(', ')} | Inactive: ${stats.inactive.join(', ')}`);
  }
}, 60 * 1000);