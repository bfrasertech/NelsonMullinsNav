import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import LeftNav from './LeftNav';

import * as spdataservices from '../services/spdata.service';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IAppProps {
    context: ApplicationCustomizerContext;
}
export interface IAppState {
    
    showLeftNav: boolean;
    alertMessage: string;
    alertTitle: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {

        super(props);

        this.state = {
            
            showLeftNav: false,
           
            alertTitle: undefined,
            alertMessage: undefined
        };
    }

    componentDidMount() {
        spdataservices.fetchActiveAlert(this.props.context).then((alert: spdataservices.IAlert) => {
            if (alert) {
                this.setState({ alertTitle: alert.title, alertMessage: alert.body })
            }
        });
    }

    private handleToggleLeftNav = () => {
        this.setState({ showLeftNav: !this.state.showLeftNav });
    }

    private handleLogoClick = () => {
        this.navigate('/');
    }

    private navigate = (url: string): void => {
        let baseUrl: string = `${window.location.protocol}//${window.location.host}`;

        if (url.indexOf('http') === 0) {
            window.location.href = url;
        } else if (url.indexOf('/') === 0) {
            window.location.href = `${baseUrl}${url}`;
        } else {
            window.location.href = `${baseUrl}/${url}`;
        }
    }

    public render(): React.ReactElement<IAppProps> {
        return (
            <div className={classes.appContainer}>
                <Header
                    alertTitle={this.state.alertTitle}
                    alertMessage={this.state.alertMessage}
                    onNavButtonClicked={this.handleToggleLeftNav}
                    onLogoClicked={this.handleLogoClick}
                    leftNavVisible={this.state.showLeftNav} />
                <LeftNav context={this.props.context} top={130} show={this.state.showLeftNav} />
            </div>
        );
    }
}