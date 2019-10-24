import * as React from 'react';

import classes from './SearchTypeList.module.scss';

export interface ISearchTypeListProps { }

export const SearchTypeList = (props: ISearchTypeListProps): React.ReactElement<ISearchTypeListProps> => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>Select a Search</div>
            <div className={classes.inner}>
                <ul className={classes.searchTypes}>
                    <li>People</li>
                    <li>Library Catalog</li>
                    <li>Clients</li>
                    <li>Matters</li>
                    <li>Intranet</li>
                    <li>Google</li>
                </ul>
            </div>
        </div>);
}
