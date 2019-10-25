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
        this.debounce(this.props.onSearch(this.state.searchTerm), 3000);
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