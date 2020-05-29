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
  },
  content: {
    height: '135px',
    position: 'relative',
  },
  date: {
    color: '#ACACAC',
    position: 'absolute',
    bottom: 4,
    right: 10,
    fontSize: '1.1rem',
  },
  info: {
    fontSize: '1.3rem',
    marginLeft: '18px',
  },
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
    const { classes, note, date, info, openEdit, index } = this.props;
    return (
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea onClick={() => openEdit(index)}>
            <CardHeader title={note} titleTypographyProps={{ variant: 'h3' }} />
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
