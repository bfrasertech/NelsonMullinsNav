import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import { trimWithEllipsis } from '../services/Utilities';

import { IMatter } from '../services/MatterSearch.Service';
import { navigate } from '../services/Utilities';

import classes from './MatterResultSummary.module.scss';

export interface IMatterResultSumaryProps {
  matterResults: IMatter[];
}

export const MatterResultSummary = (
  props: IMatterResultSumaryProps
): React.ReactElement<IMatterResultSumaryProps> => {
  return (
    <div className={classes.matterLookupContainer}>
      <div className={classes.header}>
        <div>Matter Lookup</div>
        <div>
          <span className={classes.moreText}>More</span>{' '}
          <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
        </div>
      </div>
      <div className={classes.inner}>
        <ul>
          {props.matterResults.map((matter: IMatter) => {
            return (
              <li key={matter.id}>
                <button
                  type="button"
                  className={classes.linkButton}
                  onClick={() =>
                    navigate(`/sitepages/matter.aspx?MATTER_UNO=${matter.id}`)
                  }
                >
                  <span title={matter.name}>${trimWithEllipsis(matter.name, 45)}</span>
                  <span className={classes.matterNumber}>{`(${matter.matterNumber})`}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
