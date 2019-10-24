import * as React from 'react';

import classes from './IntranetResultSummary.module.scss';

export interface IIntranetResultSummaryProps {}

export const IntranetResultSummary = (props: IIntranetResultSummaryProps): React.ReactElement<IIntranetResultSummaryProps> => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>Intranet Search Results</div>
            <div className={classes.inner}>
                <ul>
                    <li>
                        <div>
                            <a href="#">Jones file name from intranet</a>
                        </div>
                        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
                    </li>
                    <li>
                        <div>
                            <a href="#">Jones file name from intranet</a>
                        </div>
                        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
                    </li>
                    <li>
                        <div>
                            <a href="#">Jones file name from intranet</a>
                        </div>
                        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
                    </li>
                    <li>
                        <div>
                            <a href="#">Jones file name from intranet</a>
                        </div>
                        <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. </div>
                    </li>
                </ul>
            </div>
        </div>);
}
