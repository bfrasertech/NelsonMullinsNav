import * as React from 'react';

import classes from './Footer.module.scss';

export interface IFooterProps { }
export interface IFooterState { }

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class Footer extends React.Component<IFooterProps, IFooterState> {
    constructor(props: IFooterProps) {

        super(props);

        this.state = {};
    }

    public render(): React.ReactElement<IFooterProps> {
        return (
            <div className={classes.footerContainer}>
                <div className={classes.footerLeftPanel}>
                    <div className={classes.timeZoneContainer}>
                        <p className={classes.header}>West Coast</p>
                        <p><span className={classes.time}>3:30 pm</span><span className={classes.location}>LAX</span></p>
                    </div>
                    <div className={classes.timeZoneContainer}>
                        <p className={classes.header}>Mountain</p>
                        <p><span className={classes.time}>4:30 pm</span><span className={classes.location}>DEN</span></p>
                    </div>
                    <div className={classes.timeZoneContainer}>
                        <p className={classes.header}>Central</p>
                        <p><span className={classes.time}>5:30 pm</span><span className={classes.location}>NAS</span></p>
                    </div>
                </div>
                <div className={classes.footerRightPanel}>
                    <div className={classes.timeZoneContainer}>
                        <p className={classes.header}>East Coast</p>
                        <p><span className={classes.time}>6:30 pm</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>ATL</span></p>
                        <p><span>BAL</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>BOC</span></p>
                        <p><span>BOX</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>CHS</span></p>
                        <p><span>CHT</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>PGH</span></p>
                        <p><span>CRN</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>HUN</span></p>
                        <p><span>JAX</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>MIA</span></p>
                        <p><span>MRT</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>NYC</span></p>
                        <p><span>ORL</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>PMB</span></p>
                        <p><span>RAL</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>TAL</span></p>
                        <p><span>TAM</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>WDC</span></p>
                        <p><span>WPB</span></p>
                    </div>
                    <div className={classes.location}>
                        <p><span>WIN</span></p>
                    </div>
                </div>
            </div>
        );
    }
}