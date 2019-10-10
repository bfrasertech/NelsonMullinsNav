import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import classes from './Header.module.scss';


export interface IHeaderProps {
    handleToggleGuidedSearch: (searchTerm: string) => void;
    handleToggleLeftNav: () => void;
    leftNavVisible: boolean;
}
export interface IHeaderState {
    showAlert: boolean;
    searchTerm: string;
}

/* tslint:disable no-any */
const nmLogo: any = require('../images/nm_logo.png');

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {

        super(props);

        this.state = {
            showAlert: true,
            searchTerm: ''
        };

        document.addEventListener('keypress', this.handleKeyPress, false);
    }

    private handleKeyPress = (event: any): void => {
        if (event.keyCode === 49) {
            console.log('f1');
            this.setState({
                showAlert: !this.state.showAlert
            });
        }

        if (event.keyCode === 50) {
            console.log('f2');
        }
    }

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div>
                {this.state.showAlert &&
                    <div className={classes.alertContainer}>
                        <div className={classes.alertMessage}>
                            <span>
                                Alert: System will be down for maintenance Saturday 3/14/19 from 7 PM to 9 PM EST
                            </span>
                        </div>
                        <button type='button' className={classes.alertCloseButton}
                            onClick={() => this.setState({ showAlert: false })}><FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </div>}
                <div className={classes.headerContainer}>
                    {!this.props.leftNavVisible && <button type='button' className={classes.menuOpenButton}
                        onClick={this.props.handleToggleLeftNav}><FontAwesomeIcon icon={faAlignJustify} size={"3x"} />
                    </button>}
                    {this.props.leftNavVisible && <button type='button' className={classes.menuCloseButton}
                        onClick={this.props.handleToggleLeftNav}><FontAwesomeIcon icon={faTimesCircle} size={"3x"} />
                    </button>}
                    <img src={nmLogo} alt='Logo' className={classes.logoImage} />
                    <div className={classes.searchContainer}>
                        <input
                            type='text'
                            className={classes.searchBox}
                            onChange={(event: any) => this.setState({ searchTerm: event.target.value })}
                            value={this.state.searchTerm}>
                        </input>
                        <button type='button' className={classes.searchButton} onClick={() => this.props.handleToggleGuidedSearch(this.state.searchTerm)}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </div>
        );
    }
}