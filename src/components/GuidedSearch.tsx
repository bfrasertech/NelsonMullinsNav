import * as React from 'react';

import classes from './GuidedSearch.module.scss';

export interface IGuidedSearchProps { }
export interface IGuidedSearchState { }

export default class GuidedSearch extends React.Component<IGuidedSearchProps, IGuidedSearchState> {
    constructor(props: IGuidedSearchProps) {

        super(props);

        this.state = {};
    }

    public render(): React.ReactElement<IGuidedSearchProps> {
        return (
            <div className={classes.guidedSearchContainer}>
                search
            </div>
        );
    }
}