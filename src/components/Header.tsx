import * as React from 'react';

import { AlertBanner } from './AlertBanner';
import { NavToggleButton } from './NavToggleButton';
import { Logo } from './Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/pro-regular-svg-icons';

import classes from './Header.module.scss';

export interface IHeaderProps {
    handleToggleGuidedSearch: (searchTerm: string) => void;
    onNavButtonClicked: () => void;
    onLogoClicked: () => void;
    onCloseAlert: () => void;
    leftNavVisible: boolean;
    showAlert: boolean;
}
export interface IHeaderState {
    searchTerm: string;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {

        super(props);

        this.state = {
            searchTerm: ''
        };
    }

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div>
                <AlertBanner
                    show={this.props.showAlert}
                    message={`Alert: System will be down for maintenance Saturday 3/14/19 from 7 PM to 9 PM EST`}
                    onClose={this.props.onCloseAlert} />

                <div className={classes.headerContainer}>
                    <NavToggleButton onClick={this.props.onNavButtonClicked} navVisible={this.props.leftNavVisible} />
                    <Logo onClick={this.props.onLogoClicked} />
                    <div className={classes.searchContainer}>
                        <input
                            type='text'
                            className={classes.searchBox}
                            onChange={(event: any) => this.setState({ searchTerm: event.target.value })}
                            onFocus={() => this.setState({ searchTerm: '' })}
                            onKeyDown={(e) => { if (e.key === 'Enter') this.props.handleToggleGuidedSearch(this.state.searchTerm) }}
                            value={this.state.searchTerm}>
                        </input>
                        <button type='button' className={classes.searchButton} onClick={() => this.props.handleToggleGuidedSearch(this.state.searchTerm)}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </div>
        );
    }
}