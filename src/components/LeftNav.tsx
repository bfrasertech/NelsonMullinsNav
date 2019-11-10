import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardListCheck, faHome, faQuestionSquare, faTachometerAlt, faGavel, faUsers, faBalanceScale, faBuilding } from '@fortawesome/pro-solid-svg-icons';

import classes from './LeftNav.module.scss';

import * as NavServices from '../services/Navigation.Service';
import { navigate } from '../services/Utilities';

export interface INavChildGroup {
  id: string;
  displayOrder: number;
  items: INavItem[];
}

export interface INavItem {
  id: string;
  title: string;
  displayOrder: number;
  childGroups: INavChildGroup[];
}

export interface ILeftNavProps {
  context: ApplicationCustomizerContext;
  top: number;
  show: boolean;
}

export interface ILeftNavState {
  showManagementGroups: boolean;
  showTeams: boolean;
  showCommittees: boolean;
  showOffices: boolean;
  showAdministration: boolean;
  idToShow: string | null;
  subMenuTop: number;
  managementGroups: NavServices.IManagementGroup[];
  teams: NavServices.ITeamEntry[];
  committees: NavServices.ICommittee[];
  offices: NavServices.IOffice[];
  administration: NavServices.IAdministration[];
}

/* tslint:disable no-any */

export default class LeftNav extends React.Component<
  ILeftNavProps,
  ILeftNavState
  > {
  constructor(props: ILeftNavProps) {
    super(props);

    this.state = {
      showManagementGroups: false,
      showTeams: false,
      showCommittees: false,
      showOffices: false,
      showAdministration: false,
      idToShow: null,
      subMenuTop: 0,
      managementGroups: [],
      teams: [],
      committees: [],
      offices: [],
      administration: []
    };
  }

  private chunkArray = (arr: any[], size: number): any[] => {
    let index: number = 0;
    let arrayLength: number = arr.length;
    const tempArray: any[] = [];

    for (index = 0; index < arrayLength; index += size) {
      let chunk: any[] = arr.slice(index, index + size);
      tempArray.push(chunk);
    }

    return tempArray;
  }

  componentDidMount(): void {

    NavServices.fetchManagementGroups().then(mgmtGroups => {
      NavServices.fetchTeams().then(teams => {

        NavServices.fetchCommittees().then(committees => {
          NavServices.fetchOffices().then(offices => {
            NavServices.fetchAdministration().then(admins => {
              this.setState({
                managementGroups: mgmtGroups,
                teams: teams,
                committees: committees,
                offices: offices,
                administration: admins
              });
            });
          });
        });
      });
    });
  }

  private menuRefs: any[] = [];
  private chunks: any[];

  private showSubMenu = (idToShow: string) => {
    this.setState({ idToShow: idToShow, subMenuTop: this.menuRefs[idToShow].getBoundingClientRect().top });
  }

  private hideSubMenu = () => {
    this.setState({ idToShow: undefined });
  }

  public render(): React.ReactElement<ILeftNavProps> {
    if (this.props.show) {
      return (
        <div className={classes.leftNav} style={{ top: `${this.props.top.toString()}px` }}>

          <div className={classes.menuContainer}>
            <ul className={classes.leftMenu}>
              <li ref={(el) => this.menuRefs['home'] = el}
                onMouseEnter={() => this.showSubMenu('home')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faTachometerAlt} /> <span className={classes.leftMenuText}>
                  <button type='button' className={classes.linkButton} onClick={() => navigate('/')}>Home</button></span>
              </li>
              <li ref={(el) => this.menuRefs['firm'] = el}
                onMouseEnter={() => this.showSubMenu('firm')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faHome} /><span className={classes.leftMenuText}>Firm</span>
              </li>
              <li ref={(el) => this.menuRefs['managementGroups'] = el}
                onMouseEnter={() => this.showSubMenu('managementGroups')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faGavel} /><span className={classes.leftMenuText}>Management Groups</span>
              </li>
              <li ref={(el) => this.menuRefs['teams'] = el}
                onMouseEnter={() => this.showSubMenu('teams')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faUsers} /><span className={classes.leftMenuText}>Teams</span>
              </li>
              <li ref={(el) => this.menuRefs['committees'] = el}
                onMouseEnter={() => this.showSubMenu('committees')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faBalanceScale} /><span className={classes.leftMenuText}>Committees</span>
              </li>
              <li ref={(el) => this.menuRefs['offices'] = el}
                onMouseEnter={() => this.showSubMenu('offices')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faBuilding} /><span className={classes.leftMenuText}>Offices</span>
              </li>
              <li ref={(el) => this.menuRefs['administration'] = el}
                onMouseEnter={() => this.showSubMenu('administration')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <FontAwesomeIcon icon={faClipboardListCheck} /><span className={classes.leftMenuText}>Administration</span>
              </li>
              <li
              >
                <FontAwesomeIcon icon={faQuestionSquare} /><span className={classes.leftMenuText}>How Do I?</span>
              </li>
            </ul>
            {this.state.idToShow === 'managementGroups' &&
              <div
                className={classes.subMenu} style={{ top: `${(this.state.subMenuTop - 180).toString()}px` }}
                onMouseEnter={() => this.showSubMenu('managementGroups')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <div className={classes.heading}>
                  <span className={classes.headerText}>Management Groups</span>{' '}
                </div>
                <ul>
                  {this.state.managementGroups.map((navItem: NavServices.IManagementGroup) => {
                    return <li key={navItem.id}><a href="#">{navItem.name}</a> </li>;
                  })}
                </ul>
              </div>
            }
            {this.state.idToShow === 'teams' &&
              <div
                className={classes.subMenu} style={{ top: `${(this.state.subMenuTop - 180).toString()}px` }}
                onMouseEnter={() => this.showSubMenu('teams')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <div className={classes.heading}>
                  <span className={classes.headerText}>Teams</span>{' '}
                </div>
                {
                  this.chunkArray(this.state.teams, 21).map(group => {
                    return (
                      <ul>
                        {group.map((navItem: NavServices.ITeamEntry) => {
                          return <li><a href="#">{navItem.name}</a> </li>;
                        })}
                      </ul>
                    );
                  })

                }
              </div>
            }
            {this.state.idToShow === 'committees' &&
              <div
                className={classes.subMenu} style={{ top: `${(this.state.subMenuTop - 180).toString()}px` }}
                onMouseEnter={() => this.showSubMenu('committees')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <div className={classes.heading}>
                  <span className={classes.headerText}>Committees</span>{' '}
                </div>
                {
                  this.chunkArray(this.state.committees, 10).map(group => {
                    return (
                      <ul>
                        {group.map((navItem: NavServices.ICommittee) => {
                          return <li><button type='button' className={classes.linkButton} onClick={() => navigate(`/sitepages/committee.aspx?committee_uno=${navItem.id}`)}>{navItem.name}</button></li>;
                        })}
                      </ul>
                    );
                  })

                }
              </div>
            }
            {this.state.idToShow === 'offices' &&
              <div
                className={classes.subMenu} style={{ top: `${(this.state.subMenuTop - 180).toString()}px` }}
                onMouseEnter={() => this.showSubMenu('offices')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <div className={classes.heading}>
                  <span className={classes.headerText}>Offices</span>{' '}
                </div>
                {
                  this.chunkArray(this.state.offices, 10).map(group => {
                    return (
                      <ul>
                        {group.map((navItem: NavServices.IOffice) => {
                          return <li><button type='button' className={classes.linkButton} onClick={() => navigate(`/sitepages/office.aspx?office_uno=${navItem.id}`)}>{navItem.name}</button></li>;
                        })}
                      </ul>
                    );
                  })

                }
              </div>
            }
            {this.state.idToShow === 'administration' &&
              <div
                className={classes.subMenu} style={{ top: `${(this.state.subMenuTop - 180).toString()}px` }}
                onMouseEnter={() => this.showSubMenu('administration')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                <div className={classes.heading}>
                  <span className={classes.headerText}>Administration</span>{' '}
                </div>
                {
                  this.chunkArray(this.state.administration, 10).map(group => {
                    return (
                      <ul>
                        {group.map((navItem: NavServices.IAdministration) => {
                          return <li><a href="#">{navItem.name}</a> </li>;
                        })}
                      </ul>
                    );
                  })

                }
              </div>
            }

          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
