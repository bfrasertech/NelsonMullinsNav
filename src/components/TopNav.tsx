import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './TopNav.module.scss';

export interface ITopNavProps { }
export interface ITopNavState {}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class TopNav extends React.Component<ITopNavProps, ITopNavState> {
    constructor(props: ITopNavProps) {

        super(props);

        this.state = {};

    }

    public render(): React.ReactElement<ITopNavProps> {

        return (
            <div className={classes.menuContainer}>
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
        );
    }
}