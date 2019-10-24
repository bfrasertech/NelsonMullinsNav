
import * as React from 'react';

import * as matterSearchServices from '../services/MatterSearch.Service';

import classes from './MatterResultSummary.module.scss';

export interface IMatterResultSumaryProps {
    matterResults: matterSearchServices.IMatter[];
}

export const MatterResultSummary = (props: IMatterResultSumaryProps): React.ReactElement<IMatterResultSumaryProps> => {
    return (
        <div className={classes.matterLookupContainer}>
            <div className={classes.header}>Matter Lookup</div>
            <div className={classes.inner}>
                <ul>
                    {props.matterResults.map((matter: matterSearchServices.IMatter) => {
                        return (
                            <li key={matter.id}>
                                <button type='button'
                                    className={classes.linkButton}
                                    onClick={() => this.navigate(`/sitepages/matter.aspx?MATTER_UNO=${matter.id}`)}>
                                    {`${matter.name} (${matter.matterNumber})`}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>);
}


