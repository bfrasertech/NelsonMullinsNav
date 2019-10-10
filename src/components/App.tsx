import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import TopNav from './TopNav';
import LeftNav from './LeftNav';
import GuidedSearch from './GuidedSearch';
import { NavData } from '../data/topnav';
import { PeopleData } from '../data/people';
import { ClientData } from '../data/clients';
import { MatterData } from '../data/matters';

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';

export interface IAppProps {
    context: ApplicationCustomizerContext;
}
export interface IAppState {
    showGuidedSearch: boolean;
    showLeftNav: boolean;
    currentSearchTerm: string;
    clientResults: clientSearchServices.IClient[];
    matterResults: matterSearchServices.IMatter[];
}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {

        super(props);

        this.state = {
            showGuidedSearch: false,
            showLeftNav: false,
            currentSearchTerm: 'Search for People, Clients, Matters, and Internet Content here...',
            clientResults: [],
            matterResults: []
        };
    }

    componentDidMount(){

    }

    private handleToggleGuidedSearch = (searchTerm: string) => {
        if (!this.state.showGuidedSearch){
            clientSearchServices.searchClients(searchTerm).then(cResults => {
                matterSearchServices.searchMatters(searchTerm).then(mResults => {
                    this.setState({ showGuidedSearch: !this.state.showGuidedSearch, currentSearchTerm: searchTerm, clientResults: cResults, matterResults: mResults });
                });
            });
        }else{
            this.setState({ showGuidedSearch: !this.state.showGuidedSearch, currentSearchTerm: searchTerm });
        }
    }

    private handleGuidedSearchClose = () => {
        this.setState({showGuidedSearch: false});
    }

    private handleToggleLeftNav = () => {
        this.setState({ showLeftNav: !this.state.showLeftNav });
    }

    public render(): React.ReactElement<IAppProps> {
        return (
            <div className={classes.appContainer}>
                <Header handleToggleGuidedSearch={this.handleToggleGuidedSearch} handleToggleLeftNav={this.handleToggleLeftNav} leftNavVisible={this.state.showLeftNav} />
                <LeftNav navItems={NavData.menuItems} context={this.props.context} top={130} show={this.state.showLeftNav} />
                {this.state.showGuidedSearch && <GuidedSearch peopleResults={PeopleData.people} clientResults={this.state.clientResults} matterResults={this.state.matterResults} searchTerm={this.state.currentSearchTerm} handleClose={this.handleGuidedSearchClose} />}
            </div>
        );
    }
}