import * as React from 'react';

import { AlertBanner } from './AlertBanner';
import { NavToggleButton } from './NavToggleButton';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { GuidedSearch } from './GuidedSearch';

import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';
import * as peopleSearchServices from '../services/PeopleSearch.Service';

import classes from './Header.module.scss';

export interface IHeaderProps {
    onNavButtonClicked: () => void;
    onLogoClicked: () => void;
    leftNavVisible: boolean;
    alertMessage: string;
    alertTitle: string;
}
export interface IHeaderState {
    showAlert: boolean;
    showAlertPopup: boolean;
    showGuidedSearch: boolean;
    currentSearchTerm: string;
    clientResults: clientSearchServices.IClient[];
    matterResults: matterSearchServices.IMatter[];
    peopleResults: peopleSearchServices.IPerson[];
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            showAlert: true,
            showAlertPopup: false,
            showGuidedSearch: false,
            currentSearchTerm: 'Search for People, Clients, Matters, and Internet Content here...',
            clientResults: [],
            matterResults: [],
            peopleResults: []
        }
    }

    private handleCloseAlert = () => {
        this.setState({ showAlert: false })
    }

    private handleShowAlertPopup = () => {
        this.setState({ showAlertPopup: true });
    }

    private handleCloseAlertPopup = () => {
        this.setState({ showAlertPopup: false });
    }

    private handleSearch = (searchTerm: string) => {

        if (searchTerm.length < 3){
            return;
        }
        clientSearchServices.searchClients(searchTerm).then(cResults => {
            matterSearchServices.searchMatters(searchTerm).then(mResults => {
                peopleSearchServices.searchPeople(searchTerm).then(pResults => {
                    this.setState({ showGuidedSearch: true, currentSearchTerm: searchTerm, clientResults: cResults, matterResults: mResults, peopleResults: pResults });
                });

            });
        });
    }

    private handleCloseGuidedSearch = () => {
        this.setState({ showGuidedSearch: false });
    }

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div>
                <AlertBanner
                    show={this.state.showAlert}
                    title={this.props.alertTitle}
                    message={this.props.alertMessage}
                    onShowPopup={this.handleShowAlertPopup}
                    onClosePopup={this.handleCloseAlertPopup}
                    showPopup={this.state.showAlertPopup}
                    onClose={this.handleCloseAlert} />
                <div className={classes.headerContainer}>
                    <NavToggleButton onClick={this.props.onNavButtonClicked} navVisible={this.props.leftNavVisible} />
                    <Logo onClick={this.props.onLogoClicked} />
                    <SearchBox onSearch={this.handleSearch} />
                </div>
                {
                    this.state.showGuidedSearch &&
                    <GuidedSearch
                        peopleResults={this.state.peopleResults}
                        clientResults={this.state.clientResults}
                        matterResults={this.state.matterResults}
                        searchTerm={this.state.currentSearchTerm}
                        handleClose={this.handleCloseGuidedSearch} />
                }
            </div>
        );
    }
}