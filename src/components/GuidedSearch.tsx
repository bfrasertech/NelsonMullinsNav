import * as React from 'react';

import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';
import * as peopleSearchServices from '../services/PeopleSearch.Service';

import { PersonCard } from './PersonCard';
import { ClientResultSummary } from './ClientResultSummary';
import { MatterResultSummary } from './MatterResultSummary';
import { SearchTypeList } from './SearchTypeList';

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

    this.state = {
    };
  }

  private navigate = (url: string): void => {
    let baseUrl: string = `${window.location.protocol}//${window.location.host}`;

    if (url.indexOf('http') === 0) {
      window.location.href = url;
    } else if (url.indexOf('/') === 0) {
      window.location.href = `${baseUrl}${url}`;
    } else {
      window.location.href = `${baseUrl}/${url}`;
    }
  }

  public render(): React.ReactElement<IGuidedSearchProps> {
    return (
      <div className={classes.guidedSearchContainer}>
        <div className={classes.peopleResultsContainer}>
          <div className={classes.header}>People Directory</div>

          {this.props.peopleResults.map((person: peopleSearchServices.IPerson) => {
            return (
              <PersonCard person={person} />
            );
          })}
        </div>
        <ClientResultSummary clientResults={this.props.clientResults} />
        <MatterResultSummary matterResults={this.props.matterResults} />
        <SearchTypeList />

        <div className={classes.intranetSearchContainer}>
          <div className={classes.header}>Intranet Search Results</div>
          <div className={classes.inner}>
            <ul>
              <li>
                <div>
                  <a href="#">Jones file name from intranet</a>
                </div>
                <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
              </li>
              <li>
                <div>
                  <a href="#">Jones file name from intranet</a>
                </div>
                <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
              </li>
              <li>
                <div>
                  <a href="#">Jones file name from intranet</a>
                </div>
                <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
              </li>
              <li>
                <div>
                  <a href="#">Jones file name from intranet</a>
                </div>
                <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.footer}>
          <button type="button" onClick={this.props.handleClose}>Close Search</button>
        </div>
      </div>
    );
  }
}
