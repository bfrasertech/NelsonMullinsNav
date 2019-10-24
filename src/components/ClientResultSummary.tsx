import * as React from 'react';

import * as clientSearchServices from '../services/ClientSearch.Service';

import classes from './ClientResultSummary.module.scss';

export interface IClientResultSumaryProps {
    clientResults: clientSearchServices.IClient[];
}

export const ClientResultSummary = (props: IClientResultSumaryProps): React.ReactElement<IClientResultSumaryProps> => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>Client Directory</div>
            <div className={classes.inner}>
                {props.clientResults && props.clientResults.length > 0 &&
                    <ul>
                        {props.clientResults.map((client: clientSearchServices.IClient) => {
                            return (
                                <li key={client.id}>
                                    <button 
                                        type='button' 
                                        className={classes.linkButton} 
                                        onClick={() => this.navigate(`/sitepages/client.aspx?CLIENT_UNO=${client.id}`)}>
                                        {`${client.name} (${client.clientNumber})`}</button>
                                </li>
                            );
                        })}
                    </ul>
                }
                {
                    !props.clientResults || props.clientResults.length <= 0 && <span className={classes.noResults}>No results to display...</span>
                }
            </div>
        </div>);
}
