import { FileTokenStore as fsTokenStore } from './FileTokenStore/FileTokenStore';
import { getEnvConfig } from '../envConfig';

class FileTokenStore {
  declare client: any;
  constructor(client: any) {
    this.client = client;
  }
  
  tokenStore = new fsTokenStore({
    path: getEnvConfig().sessionFolder,
    encodeFunction: (data) => {
      return this.encodeFunction(data, this.client.config);
    },
    decodeFunction: (text) => {
      return this.decodeFunction(text, this.client);
    },
  });

  public encodeFunction(data: any, config: any) {
    data.config = config;
    return JSON.stringify(data);
  }

  public async decodeFunction(text: string, client: any): Promise<string[]> {
    const object = JSON.parse(text);
    if (object.config && Object.keys(client.config).length === 0)
      client.config = object.config;
    if (object.webhook && Object.keys(client.config).length === 0)
      client.config.webhook = object.webhook;
    return object;
  }
}

export default FileTokenStore;
