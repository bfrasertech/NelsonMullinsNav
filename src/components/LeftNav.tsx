import * as React from 'react';
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
      idToShow: null
    };
  }

  componentDidMount() {
    NavServices.fetchTeams(this.props.context).then(res => {
      console.log(res);
    });
  }

  private showSubMenu = (idToShow: string) => {
    this.setState({ idToShow: idToShow });
  };

  private hideSubMenu = () => {
    this.setState({ idToShow: null });
  };

  public render(): React.ReactElement<ILeftNavProps> {
    if (this.props.show){
      return (
        <div className={classes.leftNav} style={{ top: `${this.props.top.toString()}px`}}></div>
      );
    } else {
      return (<div></div>);
    }
  }
}
