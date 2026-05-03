// Legacy Express 3.x server with callbacks
var express = require('express');
var app = express();

// Old-style configuration
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static('public'));
});

// Callback-based route
app.get('/api/users', function(req, res) {
  // Simulating async operation with callback
  getUsers(function(err, users) {
    if (err) {
      res.send(500, { error: err.message });
      return;
    }
    res.json(users);
  });
});

// Nested callbacks (callback hell)
app.post('/api/users', function(req, res) {
  validateUser(req.body, function(err, isValid) {
    if (err) {
      res.send(400, { error: err.message });
      return;
    }
    
    if (isValid) {
      saveUser(req.body, function(err, user) {
        if (err) {
          res.send(500, { error: err.message });
          return;
        }
        
        sendEmail(user.email, function(err) {
          if (err) {
            console.log('Email failed but user saved');
          }
          res.json(user);
        });
      });
    }
  });
});

// Helper functions with callbacks
function getUsers(callback) {
  setTimeout(function() {
    callback(null, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]);
  }, 100);
}

function validateUser(user, callback) {
  setTimeout(function() {
    if (!user.name) {
      callback(new Error('Name is required'));
      return;
    }
    callback(null, true);
  }, 50);
}

function saveUser(user, callback) {
  setTimeout(function() {
    callback(null, { id: 3, ...user });
  }, 100);
}

function sendEmail(email, callback) {
  setTimeout(function() {
    callback(null);
  }, 50);
}

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

// Made with Bob
