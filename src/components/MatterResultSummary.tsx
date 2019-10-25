
import * as React from 'react';

import { IMatter } from '../services/MatterSearch.Service';
import { navigate } from '../services/Utilities';

import classes from './MatterResultSummary.module.scss';

export interface IMatterResultSumaryProps {
    matterResults: IMatter[];
}

export const MatterResultSummary = (props: IMatterResultSumaryProps): React.ReactElement<IMatterResultSumaryProps> => {
    return (
        <div className={classes.matterLookupContainer}>
            <div className={classes.header}>Matter Lookup</div>
            <div className={classes.inner}>
                <ul>
                    {props.matterResults.map((matter: IMatter) => {
                        return (
                            <li key={matter.id}>
                                <button type='button'
                                    className={classes.linkButton}
                                    onClick={() => navigate(`/sitepages/matter.aspx?MATTER_UNO=${matter.id}`)}>
                                    {`${matter.name} (${matter.matterNumber})`}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>);
}


