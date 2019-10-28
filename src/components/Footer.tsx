import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import * as moment from 'moment-timezone';

import classes from './Footer.module.scss';

export interface IFooterProps {}
export interface IFooterState {}

export const Footer = (
  props: IFooterProps
): React.ReactElement<IFooterProps> => {
    const utcTime = moment.utc();
  return (
    <div className={classes.container}>
      <div className={classes.leftPanel}>
        <div className={classes.timeZoneContainer}>
          <p className={classes.header}>West Coast</p>
          <p>
            <span className={classes.time}>{moment.utc().tz('America/Los_Angeles').format('LT')}</span>
            <span className={classes.location}>LAX</span>
          </p>
        </div>
        <div className={classes.timeZoneContainer}>
          <p className={classes.header}>Mountain</p>
          <p>
            <span className={classes.time}>{moment.utc().tz('America/Denver').format('LT')}</span>
            <span className={classes.location}>DEN</span>
          </p>
        </div>
        <div className={classes.timeZoneContainer}>
          <p className={classes.header}>Central</p>
          <p>
            <span className={classes.time}>{moment.utc().tz('America/Chicago').format('LT')}</span>
            <span className={classes.location}>NAS</span>
          </p>
        </div>
      </div>
      <div className={classes.rightPanel}>
        <div className={classes.timeZoneContainer}>
          <p className={classes.header}>East Coast</p>
          <p>
            <span className={classes.time}>{moment.utc().tz('America/New_York').format('LT')}</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>ATL</span>
          </p>
          <p>
            <span>BAL</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>BOC</span>
          </p>
          <p>
            <span>BOX</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>CHS</span>
          </p>
          <p>
            <span>CHT</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>PGH</span>
          </p>
          <p>
            <span>CRN</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>HUN</span>
          </p>
          <p>
            <span>JAX</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>MIA</span>
          </p>
          <p>
            <span>MRT</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>NYC</span>
          </p>
          <p>
            <span>ORL</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>PMB</span>
          </p>
          <p>
            <span>RAL</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>TAL</span>
          </p>
          <p>
            <span>TAM</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>WDC</span>
          </p>
          <p>
            <span>WPB</span>
          </p>
        </div>
        <div className={classes.location}>
          <p>
            <span>WIN</span>
          </p>
        </div>
      </div>
      <div className={classes.helpPanel}>
        <button type="button">
          <FontAwesomeIcon className={classes.moreIcon} icon={faEnvelope} size={'2x'} />
          <span className={classes.moreText}>Help</span>{' '}
        </button>
      </div>
    </div>
  );
};
