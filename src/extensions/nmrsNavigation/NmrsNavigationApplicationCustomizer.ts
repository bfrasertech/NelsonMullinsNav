import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from '@microsoft/sp-application-base';

import * as strings from 'NmrsNavigationApplicationCustomizerStrings';
import App, { IAppProps } from '../../components/App';
import {Footer, IFooterProps } from '../../components/Footer';

const LOG_SOURCE: string = 'NmrsNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INmrsNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

const MAX_POLLING_ATTEMPTS: Number = 100;

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NmrsNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<INmrsNavigationApplicationCustomizerProperties> {

  private suiteBarHidden: boolean;
  private footerLoaded: boolean;
  private pollAttempts: number = 0;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const topPlaceholder: PlaceholderContent | undefined =
      this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this.handleDispose });

    /* tslint:disable no-any */

    if (topPlaceholder) {
      const element: React.ReactElement<IAppProps> = React.createElement(App);
      element.props.context = this.context;
      ReactDOM.render(element, topPlaceholder.domElement);
    }

    const pageModeInterval = setInterval(() => {
      this.pollAttempts += 1;
      if (this.pollAttempts >= MAX_POLLING_ATTEMPTS || (this.hideSuiteBar() && this.loadFooter())) {
        clearInterval(pageModeInterval);
      }
    }, 100);

    this.loadChatBot();
    return Promise.resolve();
  }

  private handleDispose(): void {
    console.log('dispose');
  }

  // hide the SharePoint SuiteBar and only return true once it's rendered and we 
  // can find it. 
  private hideSuiteBar = (): boolean => {

    if (this.suiteBarHidden) return true; // short circuit if we've already hidden it.

    const suiteBar: HTMLElement = document.getElementById('SuiteNavPlaceHolder');

    if (!suiteBar) {
      return false;
    }

    suiteBar.style.display = 'none';
    this.suiteBarHidden = true;
    return true;
  }

  private loadFooter = (): boolean => {
    if (this.footerLoaded) return true;

    const footerSection: HTMLElement = document.getElementById('nmrsFooter');

    if (!footerSection) {
      return false;
    }

    const element: React.ReactElement<IFooterProps> = React.createElement(Footer);
    ReactDOM.render(element, footerSection);
    this.footerLoaded = true;
    return true;
  }

  private loadChatBot = (): void => {
          //initialize settings for nelson chatbot
          var settings = {
            secret : "_ioPkPb8Udw.cwA.AqA.2DSiz8ZALuaM2A-Aw067PFGkGuOibonYXWSSMDSUECA",
            additionalParams : {
                custom: {
                    ikaName: "NEMU",
                    ikaOpen: "https://epprodtenants.blob.core.windows.net/tenant-165/11468061-0450-45b9-917c-14f08e36df23",
                    ikaClosed: "https://epprodtenants.blob.core.windows.net/tenant-165/7b1fa933-7658-475c-8e83-1861c20bde65"
                },
                ikaUrl: "https://people.nmrs.com"
            }
          }
      
          /* Add Chatbot js file to document head. Chatbot will be initialized when file loads */
          let s: any = document.createElement("script");
          s.type = "text/javascript";
      
          var callback = function () {
            //When js file loads, add another js block to head with initialization code
            //this js code is appended to head to ensure the chatbot js file is loaded above
            let s2: any = document.createElement("script");
            s2.type = "text/javascript";
            var init = `(function(){ var unikaBotChatLoadCheckInterval = setInterval(function () {
      
              if (typeof BotChat != 'undefined') {
                clearInterval(unikaBotChatLoadCheckInterval);
                BotChat.InitializeApp("${settings.secret}", null, null, ${JSON.stringify(settings.additionalParams)});
              }
            }, 50);})();`
            s2.innerHTML = init;
            var body:any = document.getElementsByTagName("body")[0];
            body.appendChild(s2);    
          }
      
          if (s.readyState) {  //IE
            s.onreadystatechange = function () {
              if (s.readyState == "loaded" ||
                s.readyState == "complete") {
                s.onreadystatechange = null;
                callback();
              }
            };
          } else {  //Others
            s.onload = function () {
              callback();
            };
          }
      
          s.src = "https://ikawebchat.azurewebsites.net/Content/botchat-es5.js";
          document.head.appendChild(s);
      
          /* Add chatbot css to document head */
          var l = document.createElement("link");
          l.rel = "stylesheet";
          l.href = "https://ikawebchat.azurewebsites.net/Content/botchat.css";
          document.head.appendChild(l);
  }
}
