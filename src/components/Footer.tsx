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
                footer goes here
            </div>
        );
    }
}