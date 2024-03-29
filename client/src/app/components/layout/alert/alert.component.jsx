import React, { useContext } from 'react';
import AlertContext from '../../../../context/alert/alert.context';

const Alert = () => {

    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        ))
    )
}

export default Alert;
