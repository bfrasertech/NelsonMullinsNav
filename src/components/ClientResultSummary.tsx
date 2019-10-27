import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';

import { IClient } from '../services/ClientSearch.Service';
import { navigate } from '../services/Utilities';

import classes from './ClientResultSummary.module.scss';

export interface IClientResultSumaryProps {
  clientResults: IClient[];
}

export const ClientResultSummary = (
  props: IClientResultSumaryProps
): React.ReactElement<IClientResultSumaryProps> => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Client Directory</div>
        <div>
          <span className={classes.moreText}>More</span>{' '}
          <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
        </div>
      </div>
      <div className={classes.inner}>
        {props.clientResults && props.clientResults.length > 0 && (
          <ul>
            {props.clientResults.map((client: IClient) => {
              return (
                <li key={client.id}>
                  <button
                    type="button"
                    className={classes.linkButton}
                    onClick={() =>
                      navigate(`/sitepages/client.aspx?CLIENT_UNO=${client.id}`)
                    }
                  >
                    {`${client.name} (${client.clientNumber})`}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {!props.clientResults ||
          (props.clientResults.length <= 0 && (
            <span className={classes.noResults}>No results to display...</span>
          ))}
      </div>
    </div>
  );
};
