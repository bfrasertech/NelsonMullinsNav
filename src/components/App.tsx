import * as React from 'react';

import classes from './App.module.scss';

import Header from './Header';
import LeftNav from './LeftNav';

import {fetchActiveAlert, IAlert} from '../services/spdata.service';
import { navigate } from '../services/Utilities';
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
        fetchActiveAlert(this.props.context).then((alert: IAlert) => {
            if (alert) {
                this.setState({ alertTitle: alert.title, alertMessage: alert.body })
            }
        });
    }

    private handleToggleLeftNav = () => {
        this.setState({ showLeftNav: !this.state.showLeftNav });
    }

    private handleLogoClick = () => {
        navigate('/');
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