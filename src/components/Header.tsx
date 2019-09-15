import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import '../styles/style.css';

export interface IHeaderProps {}
export interface IHeaderState {}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class Header extends React.Component<IHeaderProps> {
    constructor(props: IHeaderProps) {

        super(props);
    }

    public render(): React.ReactElement<IHeaderProps> {
        return (<div className='nmrs-nav-header-container'>
            <div className='nmrs-nav-alert-container'></div>
            <img src={nmLogo} alt='Logo' />
            <div className='nmrs-nav-search-container'>
                <input type="text" className='nmrs-nav-search-box' value="Search for People, Clients, Matters and Internet Content here…"></input>
                <button type='button' className='nmrs-nav-advanced-search-button'>Advanced Search</button>
                <button type='button' className='nmrs-nav-search-button'><FontAwesomeIcon icon={faSearch} /></button>
            </div>
        </div>);
    }
}