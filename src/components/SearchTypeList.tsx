import * as React from 'react';

import classes from './SearchTypeList.module.scss';

export interface ISearchTypeListProps {
    onPeopleClick: () => void;
    onClientClick: () => void;
    onMatterClick: () => void;
    onIntranetClick: () => void;
    onGoogleClick: () => void;
}

export const SearchTypeList = (props: ISearchTypeListProps): React.ReactElement<ISearchTypeListProps> => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>Select a Search</div>
            <div className={classes.inner}>
                <ul className={classes.searchTypes}>
                    <li><button
                        type="button"
                        className={classes.linkButton}
                        onClick={() => props.onPeopleClick()}
                    >People</button></li>
                    <li>Library Catalog</li>
                    <li><button
                        type="button"
                        className={classes.linkButton}
                        onClick={() => props.onClientClick()}
                    >Clients</button></li>
                    <li><button
                        type="button"
                        className={classes.linkButton} style={{backgroundColor: '#f8f8f8'}}
                        onClick={() => props.onMatterClick()}
                    >Matters</button></li>
                    <li><button className={classes.linkButton} type="button" onClick={() => props.onIntranetClick()}>Intranet</button></li>
                    <li><button
                        type="button"
                        className={classes.linkButton} style={{backgroundColor: '#f8f8f8'}}
                        onClick={() => props.onGoogleClick()}
                    >Google</button></li>
                </ul>
            </div>
        </div>);
}
