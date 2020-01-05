import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const ranges = [
  {
    value: "Garage",
    label: "Garage"
  },
  {
    value: "Street",
    label: "Street"
  },
  {
    value: "Private Lot",
    label: "Private Lot"
  },
  {
    value: "Driveway",
    label: "Driveway"
  }
];

function AddressForm(props) {
  return (
    <React.Fragment style={{ fontFamily: "Roboto" }}>
      <form noValidate autoComplete="off">
        {console.log(props)}
        {/* //TITLE */}
        <TextField
          id="title"
          label="Title"
          fullWidth={true}
          placeholder="Open driveway on quiet street"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          value={props.title}
          onChange={props.handleInputChange}
          name="title"
        />
        <div style={{ color: "red" }}>{props.titleError}</div>

        {/* // PARKING Type */}
        <TextField
          id="parkingtype"
          select
          label="Select"
          fullWidth={true}
          // className={classes.textField}
          value={props.parkingtype}
          onChange={props.handleInputChange}
          SelectProps={
            {
              // MenuProps: {
              //   className: classes.menu
              // }
            }
          }
          helperText="Select spot type"
          margin="normal"
          name="parkingtype"
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ color: "red" }}>{props.parkingtypeError}</div>

        {/* // PRICE */}
        <TextField
          id="price"
          label="Daily Price"
          value={props.price}
          onChange={props.handleInputChange}
          type="number"
          fullWidth={true}
          // className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          name="price"
          margin="normal"
          variant="outlined"
          placeholder="$"
          name="price"
        />
        <div style={{ color: "red" }}>{props.priceError}</div>

        {/* //ADDRESS */}
        <TextField
          id="address"
          fullWidth={true}
          label="Street Address"
          placeholder="1200 Market Street"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          value={props.address}
          onChange={props.handleInputChange}
          name="address"
        />
        <div style={{ color: "red" }}>{props.addressError}</div>

        {/* //City */}
        <TextField
          id="city"
          label="City"
          fullWidth={true}
          placeholder="Philadelphia"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          value={props.city}
          onChange={props.handleInputChange}
          name="city"
        />
        <div style={{ color: "red" }}>{props.cityError}</div>

        {/* //State */}
        <TextField
          fullWidth={true}
          id="state"
          label="State"
          placeholder="PA"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          value={props.state}
          onChange={props.handleInputChange}
          name="state"
        />
        <div style={{ color: "red" }}>{props.stateError}</div>

        {/* //Zip */}
        <TextField
          id="zipcode"
          label="Zip"
          placeholder="19107"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          value={props.zipcode}
          onChange={props.handleInputChange}
          name="zipcode"
          fullWidth={true}
        />
        <div style={{ color: "red", fontFamily: "Roboto" }}>
          {props.zipcodeError}
        </div>
      </form>
    </React.Fragment>
  );
}

export default AddressForm;
