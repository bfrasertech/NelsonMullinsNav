import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import TopNav from './TopNav';
import GuidedSearch from './GuidedSearch';

export interface IAppProps { }
export interface IAppState { 
    showGuidedSearch: boolean;
}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {

        super(props);

        this.state = {
            showGuidedSearch: false
        };
    }

    private handleToggleGuidedSearch = () => {
        this.setState({showGuidedSearch: !this.state.showGuidedSearch});
    }

    public render(): React.ReactElement<IAppProps> {
        return (
            <div className={classes.appContainer}>
                <Header handleToggleGuidedSearch={this.handleToggleGuidedSearch} />
                <TopNav />
                {this.state.showGuidedSearch && <GuidedSearch />}
            </div>
        );
    }
}