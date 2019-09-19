import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import '../styles/style.css';

export interface ILeftNavProps { }
export interface ILeftNavState {}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class Header extends React.Component<ILeftNavProps, ILeftNavState> {
    constructor(props: ILeftNavProps) {

        super(props);

        this.state = {
            
        };

    }

    public render(): React.ReactElement<ILeftNavProps> {
        const searchElements: any = document.getElementsByClassName('ms-searchux-searchbox');
        if (searchElements && searchElements.length > 0){
            searchElements[0].style.display = 'none';
        }

        const leftNavElements: any = document.getElementsByClassName('ms-Nav');
        if (leftNavElements && leftNavElements.length > 0){
            leftNavElements[0].style.display = 'none';
        }

        const pageContainer: any = document.getElementsByClassName('pageContainer_787f4038 container_787f4038');
        if (pageContainer && pageContainer.length > 0){
           // pageContainer[0].style.display = 'none';
        }

        return (
            <div className='nmrs-nav-menu-container'>
            <ul>
                <li>Homex</li>
                <li>Firm</li>
                <li>Management Groups</li>
                <li>Teams</li>
                <li>Committees</li>
                <li>Offices</li>
                <li>Administration</li>
                <li>How Do I?</li>
            </ul>
        </div>
        );
    }
}