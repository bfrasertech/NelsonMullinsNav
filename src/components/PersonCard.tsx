import * as React from 'react';

import * as peopleSearchServices from '../services/PeopleSearch.Service';
import { trimWithEllipsis } from '../services/Utilities';
import { navigate } from '../services/Utilities';

import classes from './PersonCard.module.scss';

export interface IPersonCardProps {
  person: peopleSearchServices.IPerson;
}

const PERSON_PROFILE_PREFIX: string = 'https://people.nmrs.com/';

export const PersonCard = (props: IPersonCardProps): React.ReactElement<IPersonCardProps> => {
  return (
    <div className={classes.card}>
      <div className={classes.photo} style={{ backgroundImage: `url(${props.person.photoUrl}), url('../images//person.png')` }}>

      </div>
      <div className={classes.dataContainer}>
        <div className={classes.header}>
          <div className={classes.name}>
            <a href={`${PERSON_PROFILE_PREFIX}${props.person.networkid}`} target="_blank" title={props.person.name}>
              {trimWithEllipsis(props.person.name, 26)}
            </a>
          </div>
          <div className={classes.phoneContainer}>
            <span className={classes.phonePrefix}>Phone:</span>
            <span>{props.person.extension}</span>
          </div>
        </div>
        <div title={props.person.title} className={classes.title}>{trimWithEllipsis(props.person.title, 34)}</div>
        <div className={classes.department}>{props.person.department}</div>
        <div className={classes.rate}>Standard Rate: $000</div>
        <div className={classes.assistant}>
          <span className={classes.assistantPrefix}>Assistant:</span>
          <span className={classes.assistantName}>
            <a href="#">{props.person.assistantName ? props.person.assistantName : 'N/A'}</a>
          </span>
          <span>{`x${props.person.assistantExtension ? props.person.assistantExtension : '0000'}`}</span>
        </div>
        <div className={classes.floorPlan}>
          {' '}
          <button
            type='button'
            className={classes.linkButton}
            onClick={() => navigate(props.person.floorPlanUrl)}>Floor Plan</button>
        </div>
      </div>
    </div>);
}
