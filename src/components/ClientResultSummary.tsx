import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import { trimWithEllipsis } from '../services/Utilities';

import { IClient } from '../services/ClientSearch.Service';
import { navigate } from '../services/Utilities';

import classes from './ClientResultSummary.module.scss';

export interface IClientResultSumaryProps {
  onClientMoreClick: () => void;
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
          <button
            type="button"
            className={classes.moreLinkButton}
            onClick={() => props.onClientMoreClick()}
          >
            <span className={classes.moreText}>More</span>{' '}
            <FontAwesomeIcon className={classes.moreIcon} icon={faExternalLink} />
          </button>
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
                    <span title={client.name}>{trimWithEllipsis(client.name, 45)}</span>
                    <span className={classes.clientNumber}>{`(${client.clientCode})`}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {!props.clientResults ||
          (props.clientResults.length <= 0 && (
            <div className={classes.noResults}>No results to display...</div>
          ))}
      </div>
    </div>
  );
};
