import * as React from 'react';

import * as peopleSearchServices from '../services/PeopleSearch.Service';
import { trimWithEllipsis } from '../services/Utilities';
import { navigate } from '../services/Utilities';

import classes from './PersonCard.module.scss';

const personPlaceholder: any = require('../images/person.png');

export interface IPersonCardProps {
  person: peopleSearchServices.IPerson;
}

const PERSON_PROFILE_PREFIX: string = 'https://people.nmrs.com/';

export const PersonCard = (props: IPersonCardProps): React.ReactElement<IPersonCardProps> => {
  return (
    <div className={classes.card}>
      <div className={classes.photo} onError={() => alert('no image')} style={{ backgroundImage: `url(${props.person.photoUrl}), url(${personPlaceholder})` }}>

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
            <span>{props.person.phoneNumber}</span>
          </div>
        </div>
        <div title={props.person.title} className={classes.title}>{trimWithEllipsis(props.person.title, 34)}</div>
        <div className={classes.department}>{props.person.department}</div>
        <div className={classes.rate}>Standard Rate: $000</div>
        <div className={classes.assistant}>
          <span className={classes.assistantPrefix}>AA:</span>
          <span className={classes.assistantName}>
            <a href="#">{props.person.assistantName ? props.person.assistantName : 'N/A'}</a>
          </span>
        </div>
        <div className={classes.assistant}>
          <span className={classes.assistantPrefix}>AA Phone:</span>
          <span className={classes.assistantName}>{`${props.person.assistantExtension ? props.person.assistantExtension : '0000'}`}</span>
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
