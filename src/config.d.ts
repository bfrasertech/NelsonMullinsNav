declare interface IConfig {
    intranetBaseUrl: string;
    handshakeBaseUrl: string;
    showChatBot: boolean;
  }
  
  declare module 'config' {
    const config: IConfig;
    export = config;
  }
  