import React, { Component } from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  TextField,
  IconButton,
  ClickAwayListener,
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers'
//import styles from './Note.css';
import { withStyles } from '@material-ui/core/styles'
import formatISO from 'date-fns/formatISO'
import { theme } from '../../theme'

const styles = {
  root: {
    width: '100%',
    position: 'relative',
  },
  gridContainer: {
    position: 'fixed',
    top: '-30px',
    zIndex: 9,
    opacity: 0.9,
    maxWidth: '1000px',
    minWidth: '270px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  mouseOn: {
    opacity: 1,
  },
  card: {
    background: '#2D2D2D',
    border: 0,
    borderRadius: 3,
    borderBottom: '6px solid #3D3D3D',
    color: 'white',
    width: '495px',
    height: '220px',
    padding: '0',
    marginTop: '45px',
    marginLeft: '-4px',
    overflowY: 'auto',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '85%',
      marginLeft: '10px',
      maxWidth: '1000px',
      boxSizing: 'border-box',
    },
  },
  headingField: {
    boxSizing: 'border-box',
    padding: '0 20px 0 15px',
    width: '100%',
  },
  headingText: {
    fontSize: '2.2rem',
  },
  infoField: {
    boxSizing: 'border-box',
    padding: '0px 20px 0 15px',
    marginTop: '18px',
    width: '100%',
    height: '100%',
  },
  actions: {
    width: '50px',
    position: 'absolute',
    top: 52,
    right: -40,
    height: '215px',
    zIndex: 11,
    [theme.breakpoints.down('xs')]: {
      right: '4%',
    },
  },
  buttonDisabled: {
    color: '#373737',
  },
  check: {
    transform: 'scale(2)',
    color: '#36752F',
    marginTop: '90px',
  },
  trash: {
    transform: 'scale(2)',
    marginTop: '20px',
    color: '#762E2E',
  },
  icon: {
    width: '25px',
    height: '25px',
    marginLeft: '25px',
  },
  date: {
    position: 'absolute',
    zIndex: 11,
    bottom: 0,
    right: 5,
    width: '100px',
  },
}

export class NoteEdit extends Component {
  state = {
    mouseOn: true,
    note: '',
    info: '',
    date: formatISO(new Date()),
    noteError: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { date, note, id, info } = this.props
    if (
      prevProps.date !== date ||
      prevProps.note !== note ||
      prevProps.id !== id
    ) {
      this.setState({
        note: note,
        info: info,
        date: date || formatISO(new Date()),
      })
    }
  }

  validateSubmit = () => {
    const { submitNote, id } = this.props
    const { note, date, info } = this.state
    if (!note) {
      this.setState({
        noteError: true,
      })
    } else {
      submitNote({ note, date, info, id })
    }
  }

  changeNoteValue(e) {
    this.setState({ note: e.target.value, noteError: false })
  }

  handleThrowAway() {
    const { closeEdit, deleteNote, isNewNote } = this.props
    this.setState({ noteError: false })
    isNewNote ? closeEdit() : deleteNote()
  }

  handleClose() {
    const { closeEdit } = this.props
    closeEdit()
    this.setState({ noteError: false })
  }

  render() {
    const { mouseOn, date, noteError } = this.state
    const {
      classes,
      open,
      note,
      info,
      closeEdit,
      deleteNote,
      isNewNote,
    } = this.props
    return (
      <div className={classes.root}>
        {open ? (
          <ClickAwayListener onClickAway={() => this.handleClose()}>
            <Grid
              item
              xs={12}
              className={`${classes.gridContainer} ${
                mouseOn ? classes.mouseOn : ''
              }`}
              onMouseEnter={() => this.setState({ mouseOn: true })}
              onMouseLeave={() =>
                setTimeout(() => this.setState({ mouseOn: false }), 100)
              }
            >
              <Grid container className={classes.actions}>
                <Grid item xs={12}>
                  <IconButton
                    onClick={() => this.validateSubmit()}
                    className={`fas fa-check ${classes.icon} ${classes.check}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    onClick={() => this.handleThrowAway()}
                    className={`fas fa-trash-alt ${classes.icon} ${classes.trash}`}
                  />
                </Grid>
              </Grid>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      error={noteError}
                      className={classes.headingField}
                      defaultValue={note}
                      onChange={e => this.changeNoteValue(e)}
                      placeholder='What to remember?'
                      InputProps={{
                        classes: {
                          root: classes.headingText,
                        },
                      }}
                      inputProps={{ maxLength: 40 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={e => this.setState({ info: e.target.value })}
                      defaultValue={info}
                      multiline
                      rows={6}
                      className={classes.infoField}
                      placeholder='Add more info...'
                      InputProps={{ disableUnderline: true }}
                    />
                  </Grid>

                  <DatePicker
                    className={classes.date}
                    onChange={date => this.setState({ date: formatISO(date) })}
                    //disableToolbar
                    variant='inline'
                    format='dd.MM.yyyy'
                    margin='normal'
                    value={date}
                  />
                </Grid>
              </Card>
            </Grid>
          </ClickAwayListener>
        ) : null}
      </div>
    )
  }
}

export default withStyles(styles)(NoteEdit)
