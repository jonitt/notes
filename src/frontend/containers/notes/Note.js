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
    fontSize: '1.2rem',
    marginLeft: '18px',
  },
};

export class Note extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardHeader
            title='Shopping list'
            titleTypographyProps={{ variant: 'h3' }}
          />
          <Grid className={classes.content}>
            <Typography className={classes.info}>
              buy the carrots and potato
            </Typography>
            <Typography className={classes.date}>
              22.05.2020
            </Typography>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Note);
