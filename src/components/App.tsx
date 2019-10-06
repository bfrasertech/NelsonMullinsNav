import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import TopNav from './TopNav';
import GuidedSearch from './GuidedSearch';
import { NavData } from '../data/topnav';
import { PeopleData } from '../data/people';
import { ClientData } from '../data/clients';
import { MatterData } from '../data/matters';

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IAppProps {
    context: ApplicationCustomizerContext;
}
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
        this.setState({ showGuidedSearch: !this.state.showGuidedSearch });
    }

    public render(): React.ReactElement<IAppProps> {
        return (
            <div className={classes.appContainer}>
                <Header handleToggleGuidedSearch={this.handleToggleGuidedSearch} />
                <TopNav navItems={NavData.menuItems} context={this.props.context} />
                {this.state.showGuidedSearch && <GuidedSearch peopleResults={PeopleData.people} clientResults={ClientData.clients} matterResults={MatterData.matters} />}
            </div>
        );
    }
}