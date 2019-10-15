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
import Footer, { IFooterProps } from '../../components/Footer';

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
}
