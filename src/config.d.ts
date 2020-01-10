declare interface IConfig {
    url: string;
  }
  
  declare module 'config' {
    const config: IConfig;
    export = config;
  }
  