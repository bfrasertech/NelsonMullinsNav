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
    onCloseAlert: () => void;
    leftNavVisible: boolean;
    showAlert: boolean;
    alertMessage: string;
    alertTitle: string;
}
export interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {

        super(props);

    }

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div>
                <AlertBanner
                    show={this.props.showAlert}
                    title={this.props.alertTitle}
                    message={this.props.alertMessage}
                    onClose={this.props.onCloseAlert} />

                <div className={classes.headerContainer}>
                    <NavToggleButton onClick={this.props.onNavButtonClicked} navVisible={this.props.leftNavVisible} />
                    <Logo onClick={this.props.onLogoClicked} />
                    <SearchBox onSearch={this.props.handleToggleGuidedSearch} />
                </div>
            </div>
        );
    }
}