import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faBars } from '@fortawesome/pro-regular-svg-icons';

import classes from './NavToggleButton.module.scss';

export interface INavToggleButtonProps {
    navVisible: boolean;
    onClick: () => void;
}

export const NavToggleButton = (props: INavToggleButtonProps): React.ReactElement<INavToggleButtonProps> => {
    if (props.navVisible) {
        return (
            <button type='button' className={classes.navCloseButton}
                onClick={props.onClick}><FontAwesomeIcon icon={faTimesCircle} size={"3x"} />
            </button>);
    } else {
        return (
            <button type='button' className={classes.navOpenButton}
                onClick={props.onClick}><FontAwesomeIcon icon={faBars} size={"3x"} />
            </button>);
    }
}
