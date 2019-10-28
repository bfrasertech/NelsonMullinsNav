import * as React from 'react';

import classes from './SearchTypeList.module.scss';

export interface ISearchTypeListProps { 
    onIntranetClick: () => void;
}

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
                    <li><button className={classes.linkButton} type="button" onClick={() => props.onIntranetClick()}>Intranet</button></li>
                    <li>Google</li>
                </ul>
            </div>
        </div>);
}
