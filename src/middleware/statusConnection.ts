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

import { NextFunction, Request, Response } from 'express';

import { contactToArray } from '../util/functions';
import CreateSessionUtil from '../util/createSessionUtil'; // ✅ AGREGAR+
import { clientsArray } from '../util/sessionUtil'; // ✅ AGREGAR

export default async function statusConnection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const numbers: any = [];

  if (!req.client) {
      // Si no hay cliente, intentar recargar la sesión
      try {
        console.log(`🔄 No client found for session: ${req.session}, attempting reload...`);
        const util = new CreateSessionUtil();
        await util.opendata(req, req.session);
        req.client = clientsArray[req.session];
        console.log(`✅ Session ${req.session} reloaded in statusConnection`);
      } catch (error) {
        console.error(`❌ Error reloading session in statusConnection:`, error);
        return res.status(404).json({
          response: null,
          status: 'Disconnected',
          message: 'A sessão do WhatsApp não está ativa. Favor reconectar.',
        });
      }
    }

// ✅ NUEVO: Verificar conexión y reconectar si es necesario
    if (!req.client) {
      // Si no hay cliente, intentar recargar la sesión
      try {
        console.log(`🔄 No client found for session: ${req.session}, attempting reload...`);
        const util = new CreateSessionUtil();
        await util.opendata(req, req.session);
        req.client = clientsArray[req.session];
        console.log(`✅ Session ${req.session} reloaded in statusConnection`);
      } catch (error) {
        console.error(`❌ Error reloading session in statusConnection:`, error);
        return res.status(404).json({
          response: null,
          status: 'Disconnected',
          message: 'A sessão do WhatsApp não está ativa. Favor reconectar.',
        });
      }
    }

    if (req.client && req.client.isConnected) {
      await req.client.isConnected();

      const localArr = contactToArray(
        req.body.phone || [],
        req.body.isGroup,
        req.body.isNewsletter,
        req.body.isLid
      );
      let index = 0;
      for (const contact of localArr) {
        if (req.body.isGroup || req.body.isNewsletter) {
          localArr[index] = contact;
        } else if (numbers.indexOf(contact) < 0) {
          console.log(contact);
          const profile: any = await req.client
            .checkNumberStatus(contact)
            .catch((error) => console.log(error));
          if (!profile?.numberExists) {
            const num = (contact as any).split('@')[0];
            res.status(400).json({
              response: null,
              status: 'Connected',
              message: `O número ${num} não existe.`,
            });
          } else {
            if ((numbers as any).indexOf(profile.id._serialized) < 0) {
              (numbers as any).push(profile.id._serialized);
            }
            (localArr as any)[index] = profile.id._serialized;
          }
        }
        index++;
      }
      req.body.phone = localArr;
    } else {
      res.status(404).json({
        response: null,
        status: 'Disconnected',
        message: 'A sessão do WhatsApp não está ativa.',
      });
    }
    next();
  } catch (error) {
    req.logger.error(error);
    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do WhatsApp não está ativa.',
    });
  }
}
