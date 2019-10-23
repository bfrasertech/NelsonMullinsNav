import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

import classes from './AlertPopup.module.scss';

export interface IAlertPopupProps {
    title: string;
    message: string;
    show: boolean;
    onClose: () => void;
}

export const AlertPopup = (props: IAlertPopupProps): React.ReactElement<IAlertPopupProps> => {
    if (props.show && props.title) {
        return (
            <div className={classes.alertPopupContainer}>
                <div className={classes.alertPopupHeader}>
                    <div className={classes.alertPopupTitle}>
                        <span>{props.title}</span>
                    </div>
                    <button type='button' className={classes.alertPopupCloseButton}
                        onClick={props.onClose}><FontAwesomeIcon icon={faTimes} size={"2x"} />
                    </button>
                </div>
                <div className={classes.alertPopupBody}><span className={classes.messageText}>{props.message}</span></div>
            </div>);
    } else {
        return null;
    }
}
