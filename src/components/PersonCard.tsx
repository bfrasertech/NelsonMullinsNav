import * as React from 'react';

import * as peopleSearchServices from '../services/PeopleSearch.Service';

import classes from './PersonCard.module.scss';

export interface IPersonCardProps {
  person: peopleSearchServices.IPerson;
}

const PERSON_PROFILE_PREFIX: string = 'https://people.nmrs.com/';

export const PersonCard = (props: IPersonCardProps): React.ReactElement<IPersonCardProps> => {
  return (
    <div className={classes.card}>
      <div className={classes.photo} style={{ backgroundImage: `url(${props.person.photoUrl})` }}>
      </div>
      <div className={classes.dataContainer}>
        <div className={classes.header}>
          <span className={classes.name}><a href={`https://people.nmrs.com/${props.person.networkid}`} target="_blank">{props.person.name}</a></span>
          <span className={classes.extension}>Ext: x{props.person.extension}</span>
        </div>
        <div className={classes.title}>{props.person.title}</div>
        <div className={classes.department}>{props.person.department}</div>
        <div className={classes.rate}>Standard Rate: $000</div>
        <div className={classes.assistant}>
          <span className={classes.assistantPrefix}>Assistant:</span>
          <span className={classes.assistantName}><a href="#">{props.person.assistantName ? props.person.assistantName : 'N/A'}</a></span>
          <span>{`x${props.person.assistantExtension ? props.person.assistantExtension : '0000'}`}</span>
        </div>
        <div className={classes.floorPlan}>
          {' '}
          <button type='button' className={classes.linkButton} onClick={() => this.navigate(props.person.floorPlanUrl)}>Floor Plan</button>
        </div>
      </div>
    </div>);
}
