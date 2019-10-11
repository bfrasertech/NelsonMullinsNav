import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

import classes from './LeftNav.module.scss';

import * as NavServices from '../services/Navigation.Service';

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
  navItems: INavItem[] | any;
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

  private chunkArray = (arr, size) => {
    var index = 0;
    var arrayLength = arr.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += size) {
      let chunk = arr.slice(index, index + size);

      tempArray.push(chunk);
    }

    return tempArray;
  }

  componentDidMount() {

    NavServices.fetchManagementGroups().then(mgmtGroups => {
      NavServices.fetchTeams().then(teams => {

        NavServices.fetchCommittees().then(committees => {
          NavServices.fetchOffices().then(offices => {
            NavServices.fetchAdministration().then(admins => {
              this.setState({ managementGroups: mgmtGroups, teams: teams, committees: committees, offices: offices, administration: admins })
            });

          })
        });


      });
    });
  }

  private menuRefs: any[] = [];
  private chunks: any[];

  private showSubMenu = (idToShow: string) => {
    this.setState({ idToShow: idToShow, subMenuTop: this.menuRefs[idToShow].getBoundingClientRect().top });
  };

  private hideSubMenu = () => {
    this.setState({ idToShow: null });
  };

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
                Home
                  </li>
              <li ref={(el) => this.menuRefs['firm'] = el}
                onMouseEnter={() => this.showSubMenu('firm')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                Firm
                  </li>
              <li ref={(el) => this.menuRefs['managementGroups'] = el}
                onMouseEnter={() => this.showSubMenu('managementGroups')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                Management Groups
                  </li>
              <li ref={(el) => this.menuRefs['teams'] = el}
                onMouseEnter={() => this.showSubMenu('teams')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                Teams
                  </li>
              <li ref={(el) => this.menuRefs['committees'] = el}
                onMouseEnter={() => this.showSubMenu('committees')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                Committees
                  </li>
              <li ref={(el) => this.menuRefs['offices'] = el}
                onMouseEnter={() => this.showSubMenu('offices')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                Offices
                  </li>
              <li ref={(el) => this.menuRefs['administration'] = el}
                onMouseEnter={() => this.showSubMenu('administration')}
                onMouseLeave={() => this.hideSubMenu()}
              >
                Administration
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
                  this.chunkArray(this.state.teams, 10).map(group => {
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
                          return <li><a href="#">{navItem.name}</a> </li>;
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
                          return <li><a href="#">{navItem.name}</a> </li>;
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
      return (<div></div>);
    }
  }
}
