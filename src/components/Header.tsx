import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './Header.module.scss';


export interface IHeaderProps { }
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
                            onClick={() => this.setState({ showAlert: false })}><FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </div>}
                <div className={classes.headerContainer}>
                    <img src={nmLogo} alt='Logo' />
                    <div className={classes.searchContainer}>
                        <input
                            type='text'
                            className={classes.searchBox}
                            onChange={() => this.setState({ searchTerm: '' })}
                            value='Search for People, Clients, Matters and Internet Content here…'>
                        </input>
                        <button type='button' className={classes.advancedSearchButton}>Advanced Search</button>
                        <button type='button' className={classes.searchButton}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>

            </div>
        );
    }
}