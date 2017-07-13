var eventsJson = require('../events.json');
var teamJson = require('../team.json');
var galleryJson = require('../gallery.json');
var upcomingJson = require('../upcoming.json');

// Homepage
exports.home = function(request, response) {
  var events = eventsJson.events;
  var upcoming = upcomingJson.events;
  response.render('index', {
    title: 'E-Cell, VNIT',
    events: events,
    upcoming: upcoming
  });
};

// Viewing episodes
exports.event_single = function(request, response) {
  var episode = request.params.episode_num;
  var events = eventsJson.events;

  if (episode > 0 && episode <= events.length) {
    var event = events[episode - 1];

    response.render('event_single', {
      title: event.title,
      event: event,
      events: events
    });
  } else {
    response.render('not_found', {
      title: 'That event doesn\'t exist yet.',
      events: events,
    });
  }
};

exports.contact = function(request, response) {
  var events = eventsJson.events;
  response.render('contactus', {
    title: 'Contact Us',
    events: events
  });
}

exports.aboutus = function(request, response) {
  var events = eventsJson.events;
  response.render('aboutus', {
    title: 'About Us',
    events: events
  });
}


exports.team = function(request, response) {
  var events = eventsJson.events;
  var team = teamJson.team;
  response.render('team', {
    title: 'Our Team',
    events: events,
    team: team
  });
}

exports.gallery = function(request, response) {
  var events = eventsJson.events;
  var images = galleryJson.images;
  response.render('gallery', {
    title: 'Gallery',
    events: events,
    images: images
  });
}

exports.videos = function(request, response) {
  var events = eventsJson.events;
  response.render('videos', {
    title: 'Gallery',
    events: events,
  });
}

exports.sponsors = function(request, response) {
  var events = eventsJson.events;
  response.render('sponsors', {
    title: 'Sponsors',
    events: events,
  });
}

exports.ca = function(request, response) {
  var events = eventsJson.events;
  response.render('ca', {
    title: 'Campus Ambassador Programme\'17-18',
    events: events,
  });
}

exports.contactform = function(request, response) {
  const nodemailer = require('nodemailer');
  console.log(request.body);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ecellvnit2k17@gmail.com',
      pass: 'jacksparrow1'
    }
  });

  var text = "From: " + request.body.fname + " " + request.body.lname + " email:" + request.body.email + " message: " + request.body.message; // plain text body
    var mailOptions = {
      from: 'ecellvnit2k17@gmail.com',
      to: "meghna.bhave@gmail.com",
      subject: 'Contact Us Form Website',
      text: text
    };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      //console.log('Email sent: ' + info.response);
    }
  });
  response.redirect('/contact');
}
// Not found
exports.not_found = function(request, response) {
  var events = eventsJson.events;

  response.render('not_found', {
    title: 'This is not the page you were looking for.',
    events: events
  });
};
