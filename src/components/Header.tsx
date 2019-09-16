import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import '../styles/style.css';

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
                    <div className='nmrs-nav-alert-container'>
                        <div className='nmrs-nav-alert-message'>
                            <span>
                                Alert: System will be down for maintenance Saturday 3/14/19 from 7 PM to 9 PM EST
                            </span>
                        </div>
                        <button type='button' className='nmrs-nav-alert-close-button'
                            onClick={() => this.setState({ showAlert: false })}><FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </div>}
                <div className='nmrs-nav-header-container'>
                    <img src={nmLogo} alt='Logo' />
                    <div className='nmrs-nav-search-container'>
                        <input
                            type='text'
                            className='nmrs-nav-search-box'
                            onChange={() => this.setState({ searchTerm: '' })}
                            value='Search for People, Clients, Matters and Internet Content here…'>
                        </input>
                        <button type='button' className='nmrs-nav-advanced-search-button'>Advanced Search</button>
                        <button type='button' className='nmrs-nav-search-button'><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
                <div className='nmrs-nav-menu-container'>
                    <ul>
                        <li>Home</li>
                        <li>Firm</li>
                        <li>Management Groups</li>
                        <li>Teams</li>
                        <li>Committees</li>
                        <li>Offices</li>
                        <li>Administration</li>
                        <li>How Do I?</li>
                    </ul>
                </div>
            </div>
        );
    }
}