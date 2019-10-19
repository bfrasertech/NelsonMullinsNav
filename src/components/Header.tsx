import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimesCircle, faBars, faSearch, faTimes } from '@fortawesome/pro-regular-svg-icons';

import classes from './Header.module.scss';

export interface IHeaderProps {
    handleToggleGuidedSearch: (searchTerm: string) => void;
    handleToggleLeftNav: () => void;
    leftNavVisible: boolean;
}
export interface IHeaderState {
    showAlert: boolean;
    searchTerm: string;
}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {

        super(props);

        this.state = {
            showAlert: true,
            searchTerm: ''
        };

        document.addEventListener('keypress', this.handleKeyPress, false);
    }

    private handleKeyPress = (event: any): void => {
        if (event.keyCode === 49) {
            console.log('f1');
            this.setState({
                showAlert: !this.state.showAlert
            });
        }

        if (event.keyCode === 50) {
            console.log('f2');
        }
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

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div>
                {this.state.showAlert &&
                    <div className={classes.alertContainer}>
                        <div className={classes.alertMessage}>
                            <span>
                                Alert: System will be down for maintenance Saturday 3/14/19 from 7 PM to 9 PM EST
                            </span>
                        </div>
                        <button type='button' className={classes.alertCloseButton}
                            onClick={() => this.setState({ showAlert: false })}><FontAwesomeIcon icon={faTimes} size={"2x"} />
                        </button>
                    </div>}
                <div className={classes.headerContainer}>
                    {!this.props.leftNavVisible && <button type='button' className={classes.menuOpenButton}
                        onClick={this.props.handleToggleLeftNav}><FontAwesomeIcon icon={faBars} size={"3x"} />
                    </button>}
                    {this.props.leftNavVisible && <button type='button' className={classes.menuCloseButton}
                        onClick={this.props.handleToggleLeftNav}><FontAwesomeIcon icon={faTimesCircle} size={"3x"} />
                    </button>}
                    <img src={nmLogo} alt='Logo' className={classes.logoImage} onClick={() => this.navigate('/')} />
                    <span className={classes.titleText}>NM-Connect</span>
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