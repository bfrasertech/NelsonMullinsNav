import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './TopNav.module.scss';

export interface ITopNavProps {}
export interface ITopNavState {
    showManagementGroups: boolean;
    showTeams: boolean;
    showCommittees: boolean;
    showOffices: boolean;
    showAdministration: boolean;
}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class TopNav extends React.Component<ITopNavProps, ITopNavState> {
    constructor(props: ITopNavProps) {

        super(props);

        this.state = {
            showManagementGroups: false,
            showTeams: false,
            showCommittees: false,
            showOffices: false,
            showAdministration: false
        };

    }

    private handleManagementToggle = (showManagement: boolean) => { 
        this.setState({
            showManagementGroups: showManagement
        });
    }

    private handleTeamsToggle = (showTeams: boolean) => { this.setState({showTeams: showTeams})}

    private handleCommitteesToggle = (showCommittees: boolean) => { this.setState({showCommittees: showCommittees})}

    private handleOfficesToggle = (showOffices: boolean) => { this.setState({showOffices: showOffices})}

    private handleAdministrationToggle = (showAdministration: boolean) => { this.setState({showAdministration: showAdministration})}

    public render(): React.ReactElement<ITopNavProps> {

        return (
            <div className={classes.menuContainer}>
                <ul className={classes.topMenu}>
                    <li><a onClick={() => alert('click')}>Home</a></li>
                    <li>Firm</li>
                    <li onMouseEnter={() => this.handleManagementToggle(true)} onMouseLeave={() => this.handleManagementToggle(false)}>Management Groups</li>
                    <li onMouseEnter={() => this.handleTeamsToggle(true)} onMouseLeave={() => this.handleTeamsToggle(false)}>Teams</li>
                    <li onMouseEnter={() => this.handleCommitteesToggle(true)} onMouseLeave={() => this.handleCommitteesToggle(false)}>Committees</li>
                    <li onMouseEnter={() => this.handleOfficesToggle(true)} onMouseLeave={() => this.handleOfficesToggle(false)}>Offices</li>
                    <li onMouseEnter={() => this.handleAdministrationToggle(true)} onMouseLeave={() => this.handleAdministrationToggle(false)}>Administration</li>
                    <li>How Do I?</li>
                </ul>
                {
                    this.state.showManagementGroups &&
                <div className={classes.managementMenu} onMouseEnter={() => this.handleManagementToggle(true)} onMouseLeave={() => this.handleManagementToggle(false)}>
                    <div className={classes.heading}>Management Groups</div>
                    <ul>
                        <li>Corporate</li>
                        <li>Litigation</li>
                        <li>Government Relations</li>
                        <li>Intellectual Property</li>
                    </ul>    
                </div>  
                }
                {
                    this.state.showTeams &&
                <div className={classes.teamsMenu} onMouseEnter={() => this.handleTeamsToggle(true)} onMouseLeave={() => this.handleTeamsToggle(false)}>
                    <div className={classes.heading}>Teams</div>
                    <ul>
                        <li>Affordable Housing and Tax Credit</li>
                        <li>Bill Hogan Team</li>
                        <li>Business and Distribution Litigation Team</li>
                        <li>Capital Markets</li>
                    </ul>    
                    <ul>
                        <li>Affordable Housing and Tax Credit</li>
                        <li>Bill Hogan Team</li>
                        <li>Business and Distribution Litigation Team</li>
                        <li>Capital Markets</li>
                    </ul>    
                </div>  
                }
                {
                    this.state.showCommittees &&
                <div className={classes.committeesMenu} onMouseEnter={() => this.handleCommitteesToggle(true)} onMouseLeave={() => this.handleCommitteesToggle(false)}>
                    <div className={classes.heading}>Committees</div>
                    <ul>
                        <li>Associates</li>
                        <li>Counsel</li>
                        <li>Diversity and Inclusion</li>
                        <li>Ethics</li>
                    </ul>    
                </div>  
                }
                {
                    this.state.showOffices &&
                <div className={classes.officesMenu} onMouseEnter={() => this.handleOfficesToggle(true)} onMouseLeave={() => this.handleOfficesToggle(false)}>
                    <div className={classes.heading}>Offices</div>
                    <ul>
                        <li>Atlanta</li>
                        <li>Baltimore</li>
                        <li>Boca Raton</li>
                        <li>Boston</li>
                    </ul>    
                </div>  
                }
                 {
                    this.state.showAdministration &&
                <div className={classes.administrationMenu} onMouseEnter={() => this.handleAdministrationToggle(true)} onMouseLeave={() => this.handleAdministrationToggle(false)}>
                    <div className={classes.heading}>Administration</div>
                    <ul>
                        <li>Accounting</li>
                        <li>Administrative Assistants</li>
                        <li>Business Development</li>
                        <li>Document Services</li>
                    </ul>    
                </div>  
                }
            </div>
        );
    }
}