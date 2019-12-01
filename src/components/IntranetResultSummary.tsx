import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';

import { IIntranetSearchResult } from '../services/spdata.service';
import { navigate } from '../services/Utilities';

import classes from './IntranetResultSummary.module.scss';

export interface IIntranetResultSummaryProps {
  intranetSearchResults: IIntranetSearchResult[];
  searchTerm: string;
  onMoreClick: () => void;
  onResultClick: (url: string) => void;
}

export const IntranetResultSummary = (
  props: IIntranetResultSummaryProps
): React.ReactElement<IIntranetResultSummaryProps> => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Intranet Search Results</div>
        <div>
          <button
            type="button"
            className={classes.moreLinkButton}
            onClick={() =>
              navigate(`/sitepages/search.aspx?s=Intranet&i1=${props.searchTerm}`)
            }
          >
            <span className={classes.moreText}>More</span>{' '}
            <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
          </button>
        </div>
      </div>
      <div className={classes.inner}>
        {props.intranetSearchResults && props.intranetSearchResults.length > 0 &&
          <ul>
            {props.intranetSearchResults.map((result: IIntranetSearchResult, index: number) => (
              <li key={index}>
                <button className={classes.linkButton} type="button" onClick={() => props.onResultClick(result.url)}>
                  <div>
                    <a href="#">{result.title}</a>
                  </div>
                  <div>{result.description}</div>
                </button>
              </li>
            ))}
          </ul>}
        {!props.intranetSearchResults ||
          (props.intranetSearchResults.length <= 0 && (
            <div className={classes.noResults}>No results to display...</div>
          ))}
      </div>
    </div>
  );
};
