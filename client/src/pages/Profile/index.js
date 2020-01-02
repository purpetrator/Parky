import React, { Component } from "react";
import ListingCard from "../../components/ListingCard";
import API from "../../utils/API";
import "./style.css";
import Nav from "../../components/Nav";

class Profile extends Component {
  state = {
    listing: [],
    reserved: [],
    user: {},
    userId: ""
  };
  componentDidMount() {
    this.userInfo();
  }

  userInfo = () => {
    API.getUser()
      .then(res => {
        console.log("=======");
        this.setState({ user: res.data });
        this.setState({ userId: res.data.user._id });
        console.log(res.data.user._id);
        console.log(this.state.user);
        console.log("=======");
        this.loadListings();
        this.loadReserved();
      })
      .catch(err => console.log(err));
  };

  tester() {
    console.log("testing user");
    console.log(this.state);
  }

  handleEditListing = event => {
    event.preventDefault();

    console.log("This is edit message!");
  };

  handleAvailListing = event => {
    event.preventDefault();

    console.log("this is availability message!");
  };

  //  handleOpen = () => {
  //   setOpen(true);
  // };

  //  handleClose = () => {
  //   setOpen(false);
  // };

  //  handleOpen2 = () => {
  //   setOpen(true);
  // };

  loadListings = () => {
    API.getListingsForProf()
      .then(res => {
        console.log("xxxxxxxx");
        this.setState({ listing: res.data });
        console.log(this.state.listing);
        console.log(this.state.user);
        console.log("xxxxx");
        console.log("State User");
        console.log(this.state.user.user._id);
      })
      .catch(err => console.log(err));
  };
  loadReserved = () => {
    API.getReservForProf()
      .then(res => {
        this.setState({ reserved: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log("##################");
    console.log(this.state.listing.length);
    console.log(
      this.state.listing.filter(item =>
        console.log(item.user === this.state.userId)
      )
    );
    console.log(this.state.userId);
    return (
      <div>
        <Nav />

        {this.state.listing
          // .filter(listing => listing.user._id === this.state.user.user._id)
          .map(listing => {
            if (listing.user === this.state.userId) {
              return (
                <div>
                  <h1>LISTINGS</h1>
                  <ListingCard
                    key={listing._id}
                    id={listing._id}
                    title={listing.title}
                    photo={listing.photo}
                    address={listing.address}
                    city={listing.city}
                    state={listing.username}
                    zipcode={listing.zipcode}
                    handleEditListing={this.handleEditListing}
                    handleAvailListing={this.handleAvailListing}
                  />
                </div>
              );
            }
          })}

        {this.state.reserved.map(reserved => {
          if (reserved.user === this.state.userId)
            return (
              <div>
                <h1>RESERVATIONS</h1>
                <ListingCard
                  key={reserved._id}
                  id={reserved._id}
                  title={reserved.title}
                  photo={reserved.photo}
                  address={reserved.address}
                  city={reserved.city}
                  state={reserved.username}
                  zipcode={reserved.zipcode}
                />
              </div>
            );
        })}
      </div>
    );
  }
}

export default Profile;
