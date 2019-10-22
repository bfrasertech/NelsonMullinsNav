import * as React from 'react';

import * as clientSearchServices from '../services/ClientSearch.Service';
import * as matterSearchServices from '../services/MatterSearch.Service';
import * as peopleSearchServices from '../services/PeopleSearch.Service';

import classes from './GuidedSearch.module.scss';

export interface IGuidedSearchProps {
  peopleResults: peopleSearchServices.IPerson[];
  clientResults: clientSearchServices.IClient[];
  matterResults: matterSearchServices.IMatter[];
  searchTerm: string;
  handleClose: () => void;
}
export interface IGuidedSearchState { }

export default class GuidedSearch extends React.Component<
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
              <div className={classes.peopleCard}>
                <div className={classes.photoContainer} style={{ backgroundImage: `url(${person.photoUrl})` }}>
                </div>
                <div className={classes.dataContainer}>
                  <div className={classes.headerContainer}>
                    <span className={classes.personName}><a href={`https://people.nmrs.com/${person.networkid}`} target="_blank">{person.name}</a></span>
                    <span className={classes.personExtension}>Ext: x45286</span>
                  </div>
                  <div className={classes.title}>{person.title}</div>
                  <div className={classes.department}>{person.department}</div>
                  <div className={classes.rate}>Standard Rate: $000</div>
                  <div className={classes.assistant}>
                    <span className={classes.assistantPrefix}>Assistant:</span>
                    <span className={classes.assistantName}><a href="#">{person.assistantName ? person.assistantName : 'N/A'}</a></span>
                    <span>{`x${person.assistantExtension ? person.assistantExtension : '0000'}`}</span>
                  </div>
                  <div className={classes.floorPlan}>
                    {' '}
                    <button type='button' className={classes.linkButton} onClick={() => this.navigate(person.floorPlanUrl)}>Floor Plan</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.clientDirectoryContainer}>
          <div className={classes.header}>Client Directory</div>
          <div className={classes.inner}>
            {this.props.clientResults && this.props.clientResults.length > 0 &&
              <ul>
                {this.props.clientResults.map((client: clientSearchServices.IClient) => {
                  return (
                    <li key={client.id}>
                      <button type='button' className={classes.linkButton} onClick={() => this.navigate(`/sitepages/client.aspx?CLIENT_UNO=${client.id}`)}>{`${client.name} (${client.clientNumber})`}</button>
                    </li>
                  );
                })}
              </ul>
            }
            {
              !this.props.clientResults || this.props.clientResults.length <= 0 && <span className={classes.noResults}>No results to display...</span>
            }
          </div>
        </div>
        <div className={classes.matterLookupContainer}>
          <div className={classes.header}>Matter Lookup</div>
          <div className={classes.inner}>
            <ul>
              {this.props.matterResults.map((matter: matterSearchServices.IMatter) => {
                return (
                  <li key={matter.id}>
                    <button type='button' className={classes.linkButton} onClick={() => this.navigate(`/sitepages/matter.aspx?MATTER_UNO=${matter.id}`)}>{`${matter.name} (${matter.matterNumber})`}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={classes.selectASearchContainer}>
          <div className={classes.header}>Select a Search</div>
          <div className={classes.inner}>
            <ul className={classes.searchTypes}>
              <li>People</li>
              <li>Library Catalog</li>
              <li>Clients</li>
              <li>Matters</li>
              <li>Intranet</li>
              <li>Google</li>
            </ul>
          </div>
        </div>
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
