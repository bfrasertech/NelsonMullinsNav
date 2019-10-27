import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';

import { IIntranetSearchResult } from '../services/spdata.service';

import classes from './IntranetResultSummary.module.scss';

export interface IIntranetResultSummaryProps {
  intranetSearchResults: IIntranetSearchResult[];
}

export const IntranetResultSummary = (
  props: IIntranetResultSummaryProps
): React.ReactElement<IIntranetResultSummaryProps> => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Intranet Search Results</div>
        <div>
          <span className={classes.moreText}>More</span>{' '}
          <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
        </div>
      </div>
      <div className={classes.inner}>
        <ul>
          {props.intranetSearchResults.map((result: IIntranetSearchResult) => (
            <li key={result.id}>
              <div>
                <a href="#">{result.title}</a>
              </div>
              <div>{result.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
