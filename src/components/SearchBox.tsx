import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';

import { navigate } from '../services/Utilities';

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

    private debounce = (fn, delay) => {
        var timer = null;
        return function () {
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    private handleTermChange = (newTerm: string) => {
        this.setState({ searchTerm: newTerm }, () => {
            this.handleSearch();
        })
    }

    private handleSearch = (): void => {
        let fn = this.debounce(() => {
            this.props.onSearch(this.state.searchTerm);
        }, 2000);
        fn();
    }

    private handleAdvancedSearchClick = (): void => {
        navigate(`/sitepages/search.aspx`);
    }

    public render(): React.ReactElement<ISearchBoxProps> {
        return (
            <div className={classes.searchContainer}>
                <input
                    type='text'
                    className={classes.searchBox}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => (this.handleTermChange(event.target.value))}
                    onFocus={() => this.setState({ searchTerm: '' })}
                    onKeyDown={(e) => { if (e.key === 'Enter') { this.handleSearch(); } }}
                    value={this.state.searchTerm}>
                </input>
                <button type='button' className={classes.advancedSearchButton} onClick={this.handleAdvancedSearchClick}>Advanced Search</button>
                <button
                    type='button'
                    className={classes.searchButton}
                    onClick={() => this.props.onSearch(this.state.searchTerm)}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        );
    }
}