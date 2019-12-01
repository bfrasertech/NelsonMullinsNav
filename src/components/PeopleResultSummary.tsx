import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
import { navigate } from '../services/Utilities';

import * as peopleSearchServices from '../services/PeopleSearch.Service';
import { PersonCard } from './PersonCard';

import classes from './PeopleResultSummary.module.scss';

export interface IPeopleResultSummaryProps {
  onPeopleMoreClick: () => void;
  peopleResults: peopleSearchServices.IPerson[];
}

export const PeopleResultsSummary = (props: IPeopleResultSummaryProps): React.ReactElement<IPeopleResultSummaryProps> => {
  if (props.peopleResults && props.peopleResults.length > 0) {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div>
            <span className={classes.headerText}>People Directory</span>
            <FontAwesomeIcon className={classes.infoIcon} icon={faInfoCircle} />
          </div>
          <div>
            <button
              type="button"
              className={classes.linkButton}
              onClick={() => props.onPeopleMoreClick()}
            >
              <span className={classes.moreText}>More</span> <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
            </button>
          </div>
        </div>
        {
          props.peopleResults.map((person: peopleSearchServices.IPerson) => {
            return (
              <PersonCard person={person} />
            );
          })
        }
      </div>);
  } else {
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <div>
            <span className={classes.headerText}>People Directory</span>
            <FontAwesomeIcon className={classes.infoIcon} icon={faInfoCircle} />
          </div>
          <div>
            <button
              type="button"
              className={classes.linkButton}
              onClick={() => props.onPeopleMoreClick()}
            >
              <span className={classes.moreText}>More</span> <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
            </button>
          </div>
        </div>
        <div className={classes.noResults}>No results to display...</div>
      </div>
    );
  }
}
