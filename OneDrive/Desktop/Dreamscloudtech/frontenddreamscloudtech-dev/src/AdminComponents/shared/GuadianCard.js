
import React from 'react';
import Card from '@material-ui/core/Card';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(3),
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: theme.spacing(2),
        maxWidth: '400px',
        margin: '10px auto',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
        marginBottom: "35px"
    },
    deleteIcon: {
        float: 'right',
        marginTop: theme.spacing(-2),
        marginRight: theme.spacing(-1),
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        rowGap: theme.spacing(2),
        columnGap: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginLeft: "65px"
    },
    field: {
        fontWeight: 'bold',
        color: '#555',
        fontSize: '14px',

    },
    value: {
        color: '#333',
        fontSize: '14px',
        wordBreak: 'break-word',
    },
}));

function GuadianCard({ guadian, handleDeleteGuadian, noEdit }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {!noEdit && (
                <div className={classes.deleteIcon}>
                    <IconButton onClick={() => handleDeleteGuadian(guadian.id)}>
                        <HighlightOffIcon />
                    </IconButton>
                </div>
            )}
            <div className={classes.container}>
                {[
                    { label: 'Name', value: guadian?.name || 'N/A' },
                    { label: 'Surname', value: guadian?.lastname || 'N/A' },
                    { label: 'Occupation', value: guadian?.occupation || 'N/A' },
                    { label: 'Contact', value: guadian?.mobile || 'N/A' },
                    { label: 'Email', value: guadian?.email || 'N/A' },
                    { label: 'Relationship', value: guadian?.relationship || 'N/A' },
                    { label: 'Address', value: guadian?.address || 'N/A' },
                ].map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={classes.field}>{item.label}:</div>
                        <div className={classes.value}>{item.value}</div>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}

export default GuadianCard;
