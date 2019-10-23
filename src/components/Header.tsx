import * as React from 'react';

import { AlertBanner } from './AlertBanner';
import { NavToggleButton } from './NavToggleButton';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';

import classes from './Header.module.scss';

export interface IHeaderProps {
    handleToggleGuidedSearch: (searchTerm: string) => void;
    onNavButtonClicked: () => void;
    onLogoClicked: () => void;
    leftNavVisible: boolean;
    alertMessage: string;
    alertTitle: string;
}
export interface IHeaderState {
    showAlert: boolean;
    showAlertPopup: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            showAlert: true,
            showAlertPopup: false
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
                    <SearchBox onSearch={this.props.handleToggleGuidedSearch} />
                </div>
            </div>
        );
    }
}