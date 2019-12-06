import * as React from 'react';
import * as ReactDom from 'react-dom';

import { IClient } from '../services/ClientSearch.Service';
import { IMatter } from '../services/MatterSearch.Service';
import { IPerson } from '../services/PeopleSearch.Service';
import { IIntranetSearchResult } from '../services/spdata.service';

import { ClientResultSummary } from './ClientResultSummary';
import { MatterResultSummary } from './MatterResultSummary';
import { SearchTypeList } from './SearchTypeList';
import { IntranetResultSummary } from './IntranetResultSummary';
import { PeopleResultsSummary } from './PeopleResultSummary';
import { navigate } from '../services/Utilities';

import classes from './GuidedSearch.module.scss';

export interface IGuidedSearchProps {
  peopleResults: IPerson[];
  clientResults: IClient[];
  matterResults: IMatter[];
  intranetSearchResults: IIntranetSearchResult[];
  searchTerm: string;
  top: number;
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

  public handlePeopleMoreClick = () => {
    navigate(`/sitepages/search.aspx?s=People&d1=*${this.props.searchTerm}*`)
  }

  public handleClientMoreClick = () => {
    navigate(`/sitepages/search.aspx?s=Clients&${isNaN( this.props.searchTerm as any)? 'c2' : 'c1'}=*${this.props.searchTerm}*`) // c1 = client number, c2 = client name
  }

  public handleMatterMoreClick = () => {
    navigate(`/sitepages/search.aspx?s=Matters&${isNaN( this.props.searchTerm as any)? 'm2' : 'm1'}=*${this.props.searchTerm}*`) // m1 = matter number, m2 = matter name
  }

  public handleIntranetMoreClick = () => {
    navigate(`/sitepages/search.aspx?s=Intranet&k=${this.props.searchTerm}`)
  }

  public handleIntranetResultClick = (url: string) => {
    navigate(url);
  }

  public handleGoogleClick = () => {
    navigate(`https://www.google.com?q=${this.props.searchTerm}`);
  }

  public render(): React.ReactElement<IGuidedSearchProps> {
    return (
      <div ref={this.setWrapperRef} className={classes.container} style={{top: `${this.props.top}px`}}>

        <PeopleResultsSummary peopleResults={this.props.peopleResults} onPeopleMoreClick={this.handlePeopleMoreClick} />
        <ClientResultSummary clientResults={this.props.clientResults} onClientMoreClick={this.handleClientMoreClick} />
        <MatterResultSummary matterResults={this.props.matterResults} onMatterMoreClick={this.handleMatterMoreClick} />
        <SearchTypeList onPeopleClick={this.handlePeopleMoreClick} onClientClick={this.handleClientMoreClick}  onMatterClick={this.handleMatterMoreClick} onIntranetClick={this.handleIntranetMoreClick} onGoogleClick={this.handleGoogleClick} />
        <IntranetResultSummary 
          intranetSearchResults={this.props.intranetSearchResults} 
          onMoreClick={this.handleIntranetMoreClick}
          onResultClick={this.handleIntranetResultClick} />

        <div className={classes.footer}>
          <button type="button" onClick={this.props.handleClose}>Close Search</button>
        </div>
      </div>
    );
  }
}
