import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExternalLink} from '@fortawesome/pro-solid-svg-icons';


import * as peopleSearchServices from '../services/PeopleSearch.Service';
import { PersonCard } from './PersonCard';

import classes from './PeopleResultSummary.module.scss';

export interface IPeopleResultSummaryProps {
    peopleResults: peopleSearchServices.IPerson[];
}

export const PeopleResultsSummary = (props: IPeopleResultSummaryProps): React.ReactElement<IPeopleResultSummaryProps> => {
    return (
        <div className={classes.container}>
          <div className={classes.header}>
            <div>People Directory</div> 
            <div>
              <span>More</span> <FontAwesomeIcon icon={faExternalLink} />
            </div>
          </div>

          {props.peopleResults.map((person: peopleSearchServices.IPerson) => {
            return (
              <PersonCard person={person} />
            );
          })}
        </div>);
}
