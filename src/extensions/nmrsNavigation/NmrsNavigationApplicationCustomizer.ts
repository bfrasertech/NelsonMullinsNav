import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';

import {
  BaseApplicationCustomizer, PlaceholderName, PlaceholderContent
} from '@microsoft/sp-application-base';

import * as strings from 'NmrsNavigationApplicationCustomizerStrings';
import Top, { IHeaderProps } from '../../components/Header';

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

    const placeHolder: PlaceholderContent | undefined =
      this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {});
    /* tslint:disable no-any */
    const newDiv: any = document.createElement('div');
    newDiv.innerText = 'OK';

    if (placeHolder) {
      placeHolder.domElement.appendChild(newDiv);

      const element: React.ReactElement<IHeaderProps> = React.createElement(Top);
      ReactDOM.render(element, placeHolder.domElement);


    }

    return Promise.resolve();
  }

  private wrapMainContent(placeHolder: PlaceholderContent | undefined) {
    /////
    const wrapperDiv: any = document.createElement('div');
    wrapperDiv.id = 'wrapper';
    if (placeHolder && placeHolder.domElement && placeHolder.domElement.parentElement && placeHolder.domElement.parentElement.parentElement && placeHolder.domElement.parentElement.parentElement.parentElement) {
      //const elementsToMove = placeHolder.domElement.parentElement.parentElement.parentElement.querySelectorAll('> :not([data-sp-placeholder=Top])');
      let elementsToMove = [];

      let bottomElem: any;

      for (let i = 0; i < placeHolder.domElement.parentElement.parentElement.parentElement.children.length; i++) {
        const e: any = placeHolder.domElement.parentElement.parentElement.parentElement.children[i];

        const ds = e.dataset.spPlaceholder;

        if (ds === 'Bottom') {
          bottomElem = placeHolder.domElement.parentElement.parentElement.parentElement.children[i];
        }

        if (ds !== 'Top' && ds != 'Bottom') {
          elementsToMove.push(placeHolder.domElement.parentElement.parentElement.parentElement.children[i]);
        }
      }

      if (elementsToMove && elementsToMove.length > 0) {
        for (let i = 0; i < elementsToMove.length; i++) {
          // placeHolder.domElement.parentElement.parentElement.parentElement.removeChild(elementsToMove[i]);
          //wrapperDiv.appendChild(elementsToMove[i]);
        }
      }

      // placeHolder.domElement.parentElement.parentElement.parentElement.appendChild(wrapperDiv);
      wrapperDiv.style.display = 'flex';
      wrapperDiv.style.flexFlow = 'row wrap';
      //placeHolder.domElement.parentElement.parentElement.parentElement.insertBefore(wrapperDiv, bottomElem);
    }
    ////////////
  }
}
