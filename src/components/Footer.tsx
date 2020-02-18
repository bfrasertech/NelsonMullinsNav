import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import * as moment from 'moment-timezone';

import classes from './Footer.module.scss';

export interface IFooterProps { }
export interface IFooterState {
  utcTime: any;
  timeTimer: any;
}

export class Footer extends React.Component<IFooterProps, IFooterState> {
  constructor(props: IFooterProps) {
    super(props);

    this.state = {
      utcTime: moment.utc(),
      timeTimer: undefined
    }
  }

  public componentDidMount() {
    const timeTimer = setInterval(() => {
      this.setState({ utcTime: moment.utc() })
    }, 60000);
  }

  public componentWillUnmount() {

    if (this.state.timeTimer) {
      clearInterval(this.state.timeTimer);
    }
  }

  public render(): React.ReactElement<IFooterProps> {

    return (
      <div className={classes.outerContainer}>
        <div className={classes.container}>
          <div className={classes.leftPanel}>
            <div className={classes.timeZoneContainer}>
              <p className={classes.header}>West Coast</p>
              <p>
                <span className={classes.time}>{this.state.utcTime.tz('America/Los_Angeles').format('LT')}</span>
                <span className={classes.location}>LAX</span>
              </p>
            </div>
            <div className={classes.timeZoneContainer}>
              <p className={classes.header}>Mountain</p>
              <p>
                <span className={classes.time}>{this.state.utcTime.tz('America/Denver').format('LT')}</span>
                <span className={classes.location}>DEN</span>
              </p>
            </div>
            <div className={classes.timeZoneContainer}>
              <p className={classes.header}>Central</p>
              <p>
                <span className={classes.time}>{this.state.utcTime.tz('America/Chicago').format('LT')}</span>
                <span className={classes.location}>NAS</span>
              </p>
            </div>
          </div>
          <div className={classes.rightPanel}>
            <div className={classes.timeZoneContainer}>
              <p className={classes.header}>East Coast</p>
              <p>
                <span className={classes.time}>{this.state.utcTime.tz('America/New_York').format('LT')}</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>ATL</span>
              </p>
              <p>
                <span>BCT</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>BNA</span>
              </p>
              <p>
                <span>BOS</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>BWI</span>
              </p>
              <p>
                <span>CAE</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>CHS</span>
              </p>
              <p>
                <span>CLT</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>DCA</span>
              </p>
              <p>
                <span>DEN</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>FLL</span>
              </p>
              <p>
                <span>GSP</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>HTS</span>
              </p>
              <p>
                <span>INT</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>JAX</span>
              </p>
              <p>
                <span>JFK</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>LAX</span>
              </p>
              <p>
                <span>MCO</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>MIA</span>
              </p>
              <p>
                <span>MYR</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>PBI</span>
              </p>
              <p>
                <span>RDU</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>TLH</span>
              </p>
              <p>
                <span>TPA</span>
              </p>
            </div>
            <div className={classes.location}>
              <p>
                <span>WPB</span>
              </p>
              <p>
                <span></span>
              </p>
            </div>
          </div>
          <div className={classes.helpPanel}>
            <a href="mailto:d7119680.nelsonmullins.onmicrosoft.com@amer.teams.ms?subject=NMConnect" target="_blank">
              <FontAwesomeIcon icon={faEnvelope} size={'2x'} />
              <span>Help</span>{' '}
              </a>
          </div>
        </div>
      </div>
    );
  }
}

