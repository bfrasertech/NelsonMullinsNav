import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './LeftNav.module.scss';

export interface ILeftNavProps { }
export interface ILeftNavState {}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class Header extends React.Component<ILeftNavProps, ILeftNavState> {
    constructor(props: ILeftNavProps) {

        super(props);

        this.state = {};

    }

    public render(): React.ReactElement<ILeftNavProps> {

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