import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
//import styles from './Note.css';
import { withStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

const styles = {
  card: {
    background: '#2D2D2D',
    border: 0,
    borderRadius: 3,
    borderBottom: '6px solid #3D3D3D',
    color: 'white',
    width: '220px',
    height: '190px',
    padding: '0',
    marginTop: '45px',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
      height: '220px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  },
  content: {
    height: '135px',
    [theme.breakpoints.down('xs')]: {
      height: '165px',
    },
  },
  date: {
    color: '#ACACAC',
    position: 'absolute',
    top: 168,
    right: 10,
    fontSize: '12px',
    [theme.breakpoints.down('xs')]: {
      top: 198
    },
  },
  info: {
    fontSize: '1.3rem',
    marginLeft: '18px',
  },
  header: {},
};

/*
  IN NOTES NEWEST IS LAST, SO ADDING NEW ONES IS EZ IN FRONTEND
*/

export class Note extends Component {
  state = {};

  parseDate = d => {
    const date = new Date(d);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  render() {
    const { classes, note, date, info, openEdit, index, editOpen } = this.props;
    return (
      <Grid item xs={12} sm={6}>
        <Card className={classes.card}>
          <CardActionArea disabled={editOpen} onClick={() => openEdit(index)}>
            <CardHeader
              title={note}
              titleTypographyProps={{ variant: 'h3' }}
              className={classes.header}
            />
            <Grid className={classes.content}>
              <Typography className={classes.info}>{info}</Typography>
              <Typography className={classes.date}>
                {this.parseDate(date)}
              </Typography>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Note);
