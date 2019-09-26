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

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NmrsNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<INmrsNavigationApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const topPlaceholder: PlaceholderContent | undefined =
      this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this.handleDispose });

    /* tslint:disable no-any */

    if (topPlaceholder) {
      const element: React.ReactElement<IAppProps> = React.createElement(App);
      ReactDOM.render(element, topPlaceholder.domElement);
    }

    document.addEventListener('DOMContentLoaded', () => this.modifyPage);
    const modPage = setInterval(() => {
      if (this.modifyPage()) {
        clearInterval(modPage);
      }

    }, 100);

    setTimeout(this.modifyPage, 1000);

    return Promise.resolve();
  }

  private handleDispose(): void {
    console.log('dispose');
  }

  private modifyPage = (): boolean => {
    return this.hideSuiteBar();
  }


  private hideSuiteBar = () => {
    const suiteBar: HTMLElement = document.getElementById('SuiteNavPlaceHolder');

    if (!suiteBar) {
      return false;
    }

    suiteBar.style.display = 'none';
    return true;
  }
}
