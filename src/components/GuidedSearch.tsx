import * as React from 'react';

import classes from './GuidedSearch.module.scss';

export interface IPerson {
  name: string;
  extension: string;
  title: string;
  department: string;
  rate: string;
  assistant: string;
}

export interface IMatter {
  name: string;
  id: string;
}

export interface IMatter {
  name: string;
  id: string;
}

export interface IGuidedSearchProps {
  peopleResults: IPerson[];
  clientResults: IMatter[];
  matterResults: IMatter[];
}
export interface IGuidedSearchState {}

export default class GuidedSearch extends React.Component<
  IGuidedSearchProps,
  IGuidedSearchState
> {
  constructor(props: IGuidedSearchProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactElement<IGuidedSearchProps> {
    return (
      <div className={classes.guidedSearchContainer}>
        <div className={classes.peopleResultsContainer}>
          <div className={classes.header}>People Directory</div>

          {this.props.peopleResults.map((person: IPerson) => {
            return (
              <div className={classes.peopleCard}>
                <div className={classes.headerContainer}>
                  <span className={classes.personName}>{person.name}</span>
                  <span className={classes.personExtension}>Ext: x45286</span>
                </div>
                <div className={classes.title}>Title</div>
                <div className={classes.department}>Department</div>
                <div className={classes.rate}>Standard Rate: $750</div>
                <div className={classes.assistant}>
                  Assistant: <a href="#">Tom Jones</a>
                  <span>&nbsp;x34758</span>
                </div>
                <div className={classes.floorPlan}>
                  {' '}
                  <a href="#">Floor Plan</a>{' '}
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.clientDirectoryContainer}>
          <div className={classes.header}>Client Directory</div>
          <div className={classes.inner}>
            <ul>
              {this.props.clientResults.map((client: IMatter) => {
                return (
                  <li key={client.id}>
                    <a href={`/sitepages/client.aspx?CLIENT_UNO=${client.id}`} target="_blank">{client.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={classes.matterLookupContainer}>
          <div className={classes.header}>Matter Lookup</div>
          <div className={classes.inner}>
          <ul>
              {this.props.matterResults.map((matter: IMatter) => {
                return (
                  <li key={matter.id}>
                    <a href={`/sitepages/matter.aspx?MATTER_UNO=${matter.id}`} target="_blank">{matter.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={classes.selectASearchContainer}>
          <div className={classes.header}>Select a Search</div>
          <div className={classes.inner}>
            <div>test</div>
            <div>test</div>
          </div>
        </div>
      </div>
    );
  }
}
