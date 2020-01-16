declare interface IConfig {
    intranetBaseUrl: string;
    handshakeBaseUrl: string;
  }
  
  declare module 'config' {
    const config: IConfig;
    export = config;
  }
  