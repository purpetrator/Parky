const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
  findAll: function(req, res) {
    db.Listing.find({ _id: req.query.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findReserved: function(req, res) {
    db.Availability.find({renter:{$ne:null}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findReservedById: function(req, res) {
    db.Availability.find({renter: req.query.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createListing: function(req, res) {
    db.Listing.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createAvailability: function(req, res) {
    console.log("++++++++++++++++++++" + req.body + "++++++++++++++++++++++");
    db.Availability.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllAvailable: function(req, res) {
    console.dir("req.params is" + req.params);
    console.log("this is line 22: " + req.query);
    console.log("=======================");
    console.dir(JSON.stringify(req.query));
    console.log("=======================");
    let dates = req.query.dates;
    console.log("Searched dates: ", dates);
    let startDay = dates[0];
    let endDay;
    console.log("Dates length", dates.length);

    if (dates.length == 1) {
      endDay = startDay;
    } else {
      endDay = dates[req.query.dates.length - 1];
    }

    console.log("startDay is", startDay);
    console.log("endDay is", endDay);

    db.Availability.find({
      date: {
        $gte: startDay,
        $lte: endDay
      },
      renter: null
    })
      .then(dbModel => {
        res.json(dbModel);
        // dbModel.map(item => {
        //   db.Listing.find(item.listing).then(response => res.json(response));
        // });
      })
      .catch(err => res.status(422).json(err));
  },
  findAllProfListing: function(req, res) {
    db.Listing.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  editListing: function(req, res) {
    console.dir(req.body);
    console.dir(req.body.listing.currentModalId);
    db.Listing.findOneAndUpdate({ _id: req.body.listing.currentModalId },
      {
        $set: {
         title: req.body.listing.title,
         address: req.body.listing.address,
         city: req.body.listing.city,
         state: req.body.listing.state,
         zipcode: req.body.listing.zipcode
        } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  updateAvailabilityUser: function(req, res) {
    console.log("UPDATE USER", req.body.userId);
    db.Availability.findOneAndUpdate(
      {
        listing: req.body.listing,
        date: req.body.date
      },
      {
        $set: {
          renter: mongoose.Types.ObjectId(req.body.userId)
        }
      }
    )
    // .then(function(dbAvailability) {
    //   db.Listing.findOneAndUpdate(
    //     {
    //       _id: req.body.listing
    //     },
    //     {
          // $set: {
            // reserved: true,
            // renter: mongoose.Types.ObjectId(req.body.userId)
          // }
      //   }
      // )
      .then(function(dbListing) {
        res.json(dbListing);
      });
    // });
  }
};
