// Get references to page elements
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

var SignUpUsername = $("#SignUpUsername");
var SignUpPassword = $("#SignUpPassword");
var ReSignUpPassword = $("#ReSignUpPassword");
var LoginUsername = $("#InputUsername");
var LoginPassword = $("#InputPassword");

// The API object contains methods for each kind of request we'll make
var API = {
  checkUserCredentials: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/login",
      type: "POST",
      data: JSON.stringify(user)
    });
  },
  checkUserExists: function (username) {
    return $.ajax({
      url: "api/users/" + username,
      type: "GET"
    });
  },
  // getUsers: function () {
  //   return $.ajax({
  //     url: "api/users",
  //     type: "GET"
  //   });
  // },
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleSignUpFormSubmit = function (event) {
  clearErrorMessages();

  event.preventDefault();

  clearErrorMessages();

  if (SignUpPassword.val() === ReSignUpPassword.val()) {
    if (SignUpPassword.val().length !== 0) {
      if (SignUpUsername.val().length !== 0) {
        clearErrorMessages();
        contactBackEndSignUp();
        clearInputFields();

      } else {
        clearErrorMessages();
        document.getElementById("UsernameNull").style.display = "block";
        clearInputFields();
      }
    } else {
      clearErrorMessages();
      document.getElementById("PasswordNull").style.display = "block";
      clearInputFields();
    }
  } else {
    clearErrorMessages();
    document.getElementById("PasswordsNotMatch").style.display = "block";
    clearInputFields();
  }
};

var handleLoginFormSubmit = function (event) {

  event.preventDefault();

  if (LoginPassword.val().length !== 0) {
    if (LoginUsername.val().length !== 0) {
      contactBackEndLogin();
    }
    else {
      document.getElementById("UsernameEmpty").style.display = "block";
    }
  }
  else {
    document.getElementById("PasswordEmpty").style.display = "block";
  }
};

function contactBackEndSignUp() {
  let user = {
    username: SignUpUsername.val(),
    password: SignUpPassword.val()
  };
  API.checkUserExists(user.username).then(function (data) {
    if (data) {
      document.getElementById("UsernameAlreadyExists").style.display = "block";
    } else {
      clearErrorMessages();
      document.getElementById("SignUpSuccess").style.display = "block";

      API.saveUser(user).then(function (data) {
        console.log(data);
      });
    }
  });
}

function contactBackEndLogin() {
  let user = {
    username: LoginUsername.val(),
    password: LoginPassword.val()
  };
  API.checkUserCredentials(user).then(function (req, data) {
    console.log("DATA DATA DATA ---------------")
    console.log(data);
    if(data.message === "WrongPassword") {
      document.getElementById("WrongPassword").style.display = "block";
    }
    else if(data.message === "UsernameDoesNotExist") {
      document.getElementById("UsernameDoesNotExist").style.display = "block";
    }
    else if(data.message  === "LoginSucessful") {
      document.getElementById("LoginSuccessful").style.display = "block";
      //LOGIN ---------------------------------------------------------------------------------------------------
    }
  });
}


function clearErrorMessages() {
  document.getElementById("PasswordsNotMatch").style.display = "none";
  document.getElementById("PasswordNull").style.display = "none";
  document.getElementById("UsernameNull").style.display = "none";
  document.getElementById("SignUpSuccess").style.display = "none";
  document.getElementById("UsernameAlreadyExists").style.display = "none";
}

function clearInputFields() {
  SignUpPassword.val("");
  ReSignUpPassword.val("");
  SignUpUsername.val("");
}
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitSignUpBtn.on("click", handleSignUpFormSubmit);
$submitLoginBtn.on("click", handleLoginFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
