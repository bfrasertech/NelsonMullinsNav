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
    showAlert: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {

        super(props);

        this.state = {
            showGuidedSearch: false,
            showLeftNav: false,
            currentSearchTerm: 'Search for People, Clients, Matters, and Internet Content here...',
            clientResults: [],
            matterResults: [],
            peopleResults: [],
            showAlert: true
        };
    }

    private handleToggleGuidedSearch = (searchTerm: string) => {

        clientSearchServices.searchClients(searchTerm).then(cResults => {
            matterSearchServices.searchMatters(searchTerm).then(mResults => {
                peopleSearchServices.searchPeople(searchTerm).then(pResults => {
                    this.setState({ showGuidedSearch: true, currentSearchTerm: searchTerm, clientResults: cResults, matterResults: mResults, peopleResults: pResults });
                });

            });
        });
    }

    private handleGuidedSearchClose = () => {
        this.setState({ showGuidedSearch: false });
    }

    private handleToggleLeftNav = () => {
        this.setState({ showLeftNav: !this.state.showLeftNav });
    }

    private handleLogoClick = () => {
        this.navigate('/');
    }

    private handleCloseAlert = () => {
        this.setState({ showAlert: false });

    }

    private navigate = (url: string): void => {
        let baseUrl: string = `${window.location.protocol}//${window.location.host}`;

        if (url.indexOf('http') === 0) {
            window.location.href = url;
        } else if (url.indexOf('/') === 0) {
            window.location.href = `${baseUrl}${url}`;
        } else {
            window.location.href = `${baseUrl}/${url}`;
        }
    }

    public render(): React.ReactElement<IAppProps> {
        return (
            <div className={classes.appContainer}>
                <Header
                    showAlert={this.state.showAlert}
                    handleToggleGuidedSearch={this.handleToggleGuidedSearch}
                    onNavButtonClicked={this.handleToggleLeftNav}
                    onLogoClicked={this.handleLogoClick}
                    onCloseAlert={this.handleCloseAlert}
                    leftNavVisible={this.state.showLeftNav} />
                <LeftNav context={this.props.context} top={130} show={this.state.showLeftNav} />
                {this.state.showGuidedSearch && <GuidedSearch peopleResults={this.state.peopleResults} clientResults={this.state.clientResults} matterResults={this.state.matterResults} searchTerm={this.state.currentSearchTerm} handleClose={this.handleGuidedSearchClose} />}
            </div>
        );
    }
}