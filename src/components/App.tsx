import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import LeftNav from './LeftNav';
import GuidedSearch from './GuidedSearch';

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';
import * as peopleSearchServices from '../services/PeopleSearch.Service';

export interface IAppProps {
    context: ApplicationCustomizerContext;
}
export interface IAppState {
    showGuidedSearch: boolean;
    showLeftNav: boolean;
    currentSearchTerm: string;
    clientResults: clientSearchServices.IClient[];
    matterResults: matterSearchServices.IMatter[];
    peopleResults: peopleSearchServices.IPerson[];
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
            matterResults: [],
            peopleResults: []
        };
    }

    private handleToggleGuidedSearch = (searchTerm: string) => {
       // if (!this.state.showGuidedSearch){
            clientSearchServices.searchClients(searchTerm).then(cResults => {
                matterSearchServices.searchMatters(searchTerm).then(mResults => {
                    peopleSearchServices.searchPeople(searchTerm).then(pResults => {
                        this.setState({ showGuidedSearch: true, currentSearchTerm: searchTerm, clientResults: cResults, matterResults: mResults, peopleResults: pResults });
                    });
                    
                });
            });
        // }else{
        //     this.setState({ showGuidedSearch: !this.state.showGuidedSearch, currentSearchTerm: searchTerm });
        // }
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
                <LeftNav context={this.props.context} top={130} show={this.state.showLeftNav} />
                {this.state.showGuidedSearch && <GuidedSearch peopleResults={this.state.peopleResults} clientResults={this.state.clientResults} matterResults={this.state.matterResults} searchTerm={this.state.currentSearchTerm} handleClose={this.handleGuidedSearchClose} />}
            </div>
        );
    }
}