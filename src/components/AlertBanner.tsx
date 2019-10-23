import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

import { AlertPopup } from './AlertPopup';

import classes from './AlertBanner.module.scss';

export interface IAlertBannerProps {
    show: boolean;
    title: string;
    message: string;
    showPopup: boolean;
    onClose: () => void;
    onShowPopup: () => void;
    onClosePopup: () => void; 
}

export const AlertBanner = (props: IAlertBannerProps): React.ReactElement<IAlertBannerProps> => {
    if (props.show && props.title) {
        return (
            <div>
                <div className={classes.alertContainer}>
                    <div className={classes.alertMessage}>
                        <button type='button' className={classes.alertCloseButton}
                            onClick={props.onShowPopup}><span>{props.title}</span>
                        </button>
                    </div>
                    <button type='button' className={classes.alertCloseButton}
                        onClick={props.onClose}><FontAwesomeIcon icon={faTimes} size={"2x"} />
                    </button>
                </div>
                <AlertPopup title={props.title} message={props.message} show={props.showPopup} onClose={props.onClosePopup} />
            </div>
        );
    } else {
        return null;
    }
}
