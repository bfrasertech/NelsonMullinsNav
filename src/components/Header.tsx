import * as React from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

import { AlertBanner } from './AlertBanner';
import { NavToggleButton } from './NavToggleButton';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { GuidedSearch } from './GuidedSearch';

import { searchClients, IClient } from '../services/ClientSearch.Service';
import { searchMatters, IMatter } from '../services/MatterSearch.Service';
import { searchPeople, IPerson } from '../services/PeopleSearch.Service';
import { searchSite, IIntranetSearchResult } from '../services/spdata.service';

import classes from './Header.module.scss';

export interface IHeaderProps {
    context: ApplicationCustomizerContext;
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
    clientResults: IClient[];
    matterResults: IMatter[];
    peopleResults: IPerson[];
    intranetSearchResults: IIntranetSearchResult[];
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
            peopleResults: [],
            intranetSearchResults: []
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

        if (searchTerm.length < 3) {
            return;
        }
        searchSite(this.props.context, searchTerm).then((searchResults: any) => {
            searchClients(searchTerm).then(cResults => {
                searchMatters(searchTerm).then(mResults => {
                    searchPeople(searchTerm).then(pResults => {

                        this.setState({ showGuidedSearch: true, currentSearchTerm: searchTerm, clientResults: cResults, matterResults: mResults, peopleResults: pResults, intranetSearchResults: searchResults });
                    });
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
                        intranetSearchResults={this.state.intranetSearchResults}
                        searchTerm={this.state.currentSearchTerm}
                        handleClose={this.handleCloseGuidedSearch} />
                }
            </div>
        );
    }
}