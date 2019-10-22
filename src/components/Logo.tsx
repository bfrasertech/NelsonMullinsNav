import * as React from 'react';

import classes from './Logo.module.scss';

export interface ILogoProps {
    onClick: () => void;
}

const nmLogo: any = require('../images/nmconnect_logo_1.jpg');

export const Logo = (props: ILogoProps): React.ReactElement<ILogoProps> => {
    return (
        <img src={nmLogo} alt='Logo' className={classes.logoImage} onClick={props.onClick} />);
}
