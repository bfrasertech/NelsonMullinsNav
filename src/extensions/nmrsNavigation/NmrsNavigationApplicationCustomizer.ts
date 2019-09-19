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
import LeftNav, {ILeftNavProps} from '../../components/LeftNav';

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

      // if (document.readyState === 'complete' || document.readyState !== 'loading') {
      //   this.removeSearchBox();
      // } else{
        document.addEventListener('DOMContentLoaded', () => this.modifyPage);
        setTimeout(this.modifyPage, 1000);
      //}
    }

    return Promise.resolve();
  }

  private handleDispose(): void {
    console.log('dispose');
  }

  private modifyPage = (): void => {
    this.removeSearchBox();
    this.removeLeftNav();
    
  }

  private removeSearchBox = () => {
    const searchBoxElements: NodeListOf<Element> = document.querySelectorAll('.ms-searchux-searchbox');

    for (let i = 0; i < searchBoxElements.length; i++) {
      const element: any = searchBoxElements[i];
      element.style.display = 'none';
    }
  }

  private removeLeftNav = () => {
    const leftNavElements: NodeListOf<Element> = document.querySelectorAll('.ms-Nav');

    for (let i = 0; i < leftNavElements.length; i++) {
      const element: any = leftNavElements[i];
      while(element.firstChild){
        element.removeChild(element.firstChild);
      }
    }

    leftNavElements[0].insertAdjacentHTML('afterbegin', '<div class="nmrs-left-nav">test</div>');
    const element: React.ReactElement<ILeftNavProps> = React.createElement(LeftNav);
    ReactDOM.render(element, leftNavElements[0]);
  }
}
