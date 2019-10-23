import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';

import classes from './SearchBox.module.scss';

export interface ISearchBoxProps {
    onSearch: (searchTerm: string) => void;
}

export interface ISearchBoxState {
    searchTerm: string;
}

export class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
    constructor(props: ISearchBoxProps) {

        super(props);

        this.state = {
            searchTerm: ''
        };
    }

    public render(): React.ReactElement<ISearchBoxProps> {
        return (
            <div className={classes.searchContainer}>
                <input
                    type='text'
                    className={classes.searchBox}
                    onChange={(event: any) => this.setState({ searchTerm: event.target.value })}
                    onFocus={() => this.setState({ searchTerm: '' })}
                    onKeyDown={(e) => { if (e.key === 'Enter') this.props.onSearch(this.state.searchTerm) }}
                    value={this.state.searchTerm}>
                </input>
                <button type='button' className={classes.searchButton} onClick={() => this.props.onSearch(this.state.searchTerm)}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
        );
    }
}