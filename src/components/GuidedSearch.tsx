import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';
import * as peopleSearchServices from '../services/PeopleSearch.Service';


import { ClientResultSummary } from './ClientResultSummary';
import { MatterResultSummary } from './MatterResultSummary';
import { SearchTypeList } from './SearchTypeList';
import { IntranetResultSummary } from './IntranetResultSummary';
import { PeopleResultsSummary } from './PeopleResultSummary';

import classes from './GuidedSearch.module.scss';

export interface IGuidedSearchProps {
  peopleResults: peopleSearchServices.IPerson[];
  clientResults: clientSearchServices.IClient[];
  matterResults: matterSearchServices.IMatter[];
  searchTerm: string;
  handleClose: () => void;
}
export interface IGuidedSearchState { }

export class GuidedSearch extends React.Component<
  IGuidedSearchProps,
  IGuidedSearchState
  > {
  constructor(props: IGuidedSearchProps) {
    super(props);

    this.state = {};

    this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  public wrapperRef: any;

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  public setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  public handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleClose();
    }
  }

  public render(): React.ReactElement<IGuidedSearchProps> {
    return (
      <div ref={this.setWrapperRef} className={classes.container}>

        <PeopleResultsSummary peopleResults={this.props.peopleResults} />
        <ClientResultSummary clientResults={this.props.clientResults} />
        <MatterResultSummary matterResults={this.props.matterResults} />
        <SearchTypeList />
        <IntranetResultSummary />

        <div className={classes.footer}>
          <button type="button" onClick={this.props.handleClose}>Close Search</button>
        </div>
      </div>
    );
  }
}
