import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import LeftNav from './LeftNav';
import GuidedSearch from './GuidedSearch';
import { AlertPopup } from './AlertPopup';

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';
import * as peopleSearchServices from '../services/PeopleSearch.Service';
import * as spdataservices from '../services/spdata.service';

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
    alertMessage: string;
    alertTitle: string;
    showAlertPopup: boolean;
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
            showAlert: true,
            alertTitle: undefined,
            alertMessage: undefined,
            showAlertPopup: false
        };
    }

    componentDidMount() {
        spdataservices.fetchActiveAlert(this.props.context).then((alert: spdataservices.IAlert) => {
            if (alert) {
                this.setState({ alertTitle: alert.title, alertMessage: alert.body })
            }
        });
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

    private handleShowAlertPopup = () => {
        this.setState({ showAlertPopup: true });
    }

    private handleCloseAlertPopup = () => {
        this.setState({ showAlertPopup: false });
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
                    alertTitle={this.state.alertTitle}
                    alertMessage={this.state.alertMessage}
                    handleToggleGuidedSearch={this.handleToggleGuidedSearch}
                    onNavButtonClicked={this.handleToggleLeftNav}
                    onLogoClicked={this.handleLogoClick}
                    onCloseAlert={this.handleCloseAlert}
                    leftNavVisible={this.state.showLeftNav}
                    onShowAlertPopup={this.handleShowAlertPopup} />
                <LeftNav context={this.props.context} top={130} show={this.state.showLeftNav} />
                {this.state.showGuidedSearch && <GuidedSearch peopleResults={this.state.peopleResults} clientResults={this.state.clientResults} matterResults={this.state.matterResults} searchTerm={this.state.currentSearchTerm} handleClose={this.handleGuidedSearchClose} />}
                <AlertPopup title={this.state.alertTitle} message={this.state.alertMessage} show={this.state.showAlertPopup} onClose={this.handleCloseAlertPopup} />
            </div>
        );
    }
}