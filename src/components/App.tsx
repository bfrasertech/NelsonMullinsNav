import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';

export interface IAppProps { }
export interface IAppState { }

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {

        super(props);

        this.state = {};
    }

    public render(): React.ReactElement<IAppProps> {
        return (
            <div className={classes.appContainer}><Header /></div>
        );
    }
}