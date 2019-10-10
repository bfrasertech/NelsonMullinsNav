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
      subMenuTop: 0
    };
  }

  componentDidMount() {
    NavServices.fetchTeams(this.props.context).then(res => {
      console.log(res);
    });
  }

  private menuRefs: any[] = [];

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
              {this.props.navItems.map((navItem: INavItem) => {
                return (
                  <li ref={(el) => this.menuRefs[navItem.id] = el}
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
                      className={classes.subMenu} style={{top: `${(this.state.subMenuTop - 180).toString()}px`}}
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
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}
