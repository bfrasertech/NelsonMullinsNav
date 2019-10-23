import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

import classes from './AlertBanner.module.scss';

export interface IAlertBannerProps {
    show: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onShowPopup: () => void;
}

export const AlertBanner = (props: IAlertBannerProps): React.ReactElement<IAlertBannerProps> => {
    if (props.show && props.title) {
        return (
            <div className={classes.alertContainer}>
                <div className={classes.alertMessage}>
                    <button type='button' className={classes.alertCloseButton}
                        onClick={props.onShowPopup}><span>{props.title}</span>
                    </button>

                </div>
                <button type='button' className={classes.alertCloseButton}
                    onClick={props.onClose}><FontAwesomeIcon icon={faTimes} size={"2x"} />
                </button>
            </div>);
    } else {
        return null;
    }
}
