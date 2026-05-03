// Legacy jQuery code with old patterns
$(document).ready(function() {
    // Load users on page load
    loadUsers();
    
    // Add user button click handler
    $('#add-user-btn').click(function() {
        var name = $('#user-name').val();
        var email = $('#user-email').val();
        
        if (name && email) {
            addUser(name, email);
        } else {
            alert('Please fill in all fields');
        }
    });
});

// Load users using jQuery AJAX
function loadUsers() {
    $.ajax({
        url: '/api/users',
        type: 'GET',
        success: function(users) {
            displayUsers(users);
        },
        error: function(xhr, status, error) {
            console.log('Error loading users:', error);
            $('#users-list').html('<p>Error loading users</p>');
        }
    });
}

// Display users in the DOM
function displayUsers(users) {
    var html = '';
    for (var i = 0; i < users.length; i++) {
        html += '<div class="user">';
        html += '<strong>' + users[i].name + '</strong>';
        html += '</div>';
    }
    $('#users-list').html(html);
}

// Add new user
function addUser(name, email) {
    $.ajax({
        url: '/api/users',
        type: 'POST',
        data: JSON.stringify({ name: name, email: email }),
        contentType: 'application/json',
        success: function(user) {
            alert('User added successfully!');
            $('#user-name').val('');
            $('#user-email').val('');
            loadUsers();
        },
        error: function(xhr, status, error) {
            alert('Error adding user: ' + error);
        }
    });
}

// Global variable (bad practice)
window.currentUser = null;

// Made with Bob
