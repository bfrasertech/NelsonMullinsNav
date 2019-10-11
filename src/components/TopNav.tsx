import * as React from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

import classes from './TopNav.module.scss';

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

export interface ITopNavProps {
  navItems: INavItem[] | any;
  context: ApplicationCustomizerContext;
}

export interface ITopNavState {
  showManagementGroups: boolean;
  showTeams: boolean;
  showCommittees: boolean;
  showOffices: boolean;
  showAdministration: boolean;
  idToShow: string | null;
}

/* tslint:disable no-any */

export default class TopNav extends React.Component<
  ITopNavProps,
  ITopNavState
  > {
  constructor(props: ITopNavProps) {
    super(props);

    this.state = {
      showManagementGroups: false,
      showTeams: false,
      showCommittees: false,
      showOffices: false,
      showAdministration: false,
      idToShow: null
    };
  }

  componentDidMount() {
    // NavServices.fetchTeams(this.props.context).then(res => {
    //   console.log(res);
    // });
  }

  private showSubMenu = (idToShow: string) => {
    this.setState({ idToShow: idToShow });
  };

  private hideSubMenu = () => {
    this.setState({ idToShow: null });
  };

  public render(): React.ReactElement<ITopNavProps> {
    return (
      <div className={classes.menuContainer}>
        <ul className={classes.topMenu}>
          {this.props.navItems.map((navItem: INavItem) => {
            return (
              <li
                onMouseEnter={() => this.showSubMenu(navItem.id)}
                onMouseLeave={() => this.hideSubMenu()}
              >
                {navItem.title}
              </li>
            );
          })}
        </ul>

        {this.props.navItems
          .filter(
            (navItem: INavItem) =>
              navItem.childGroups && navItem.childGroups.length > 0
          )
          .map((navItem: INavItem) => {
            if (this.state.idToShow === navItem.id) {
              return (
                <div
                  className={classes.subMenu}
                  onMouseEnter={() => this.showSubMenu(navItem.id)}
                  onMouseLeave={() => this.hideSubMenu()}
                >
                  <div className={classes.heading}>
                    <span className={classes.headerText}>{navItem.title}</span>{' '}
                  </div>
                  {navItem.childGroups.map((childGroup: INavChildGroup) => {
                    return (
                      <ul>
                        {childGroup.items.map((navItem: INavItem) => {
                          return <li><a href="#">{navItem.title}</a> </li>;
                        })}
                      </ul>
                    );
                  })}
                </div>
              );
            } else {
              return <div></div>;
            }
          })}
      </div>
    );
  }
}
