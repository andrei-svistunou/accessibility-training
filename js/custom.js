(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  var notifyBtn = document.querySelector(".subscribe");
  notifyBtn.addEventListener("click", function() {
    if (true) {
      var msg = document.createElement("p");
      msg.textContent = "We will inform you!";
      notifyBtn.closest(".box").appendChild(msg);
    }
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

var tabs = [...document.querySelectorAll("#nav button")];

tabs.forEach(function(navEl) {
  var tabPanel = navEl.getAttribute("aria-controls");

  if (navEl.closest("li").classList.contains("is-active")) {
    navEl.setAttribute("tabIndex", 0);
    navEl.setAttribute("aria-selected", "true");
    document.getElementById(tabPanel).setAttribute("tabIndex", 0);
  } else {
    navEl.setAttribute("tabIndex", -1);
    document.getElementById(tabPanel).setAttribute("tabIndex", -1);
    navEl.setAttribute("aria-selected", "false");
  }

  navEl.onkeydown = function(e) {
    defineAction(e, this);
  };
});

function defineAction(e, tab) {
  switch (e.keyCode) {
    case 37:
      showPrevTab(tab);
      break;
    case 38:
      showPrevTab(tab);
      break;
    case 39:
      showNextTab(tab);
      break;
    case 40:
      showNextTab(tab);
      break;
    case 36:
      showFirstTab(e);
      break;
    case 35:
      showLastTab(e);
      break;
  }
}

function showPrevTab(tab) {
  var active =
    tabs[[tabs.indexOf(tab) === 0 ? tabs.length - 1 : tabs.indexOf(tab) - 1]];
  manageFocus(active);
  toggleTab(active.closest("li").id, active.closest("li").dataset.target);
}
function showNextTab(tab) {
  var active =
    tabs[[tabs.indexOf(tab) === tabs.length - 1 ? 0 : tabs.indexOf(tab) + 1]];
  manageFocus(active);
  toggleTab(active.closest("li").id, active.closest("li").dataset.target);
}
function showFirstTab(e) {
  e.preventDefault();
  var active = tabs[0];
  manageFocus(active);
  toggleTab(active.closest("li").id, active.closest("li").dataset.target);
}
function showLastTab(e) {
  e.preventDefault();
  var active = tabs[tabs.length - 1];
  manageFocus(active);
  toggleTab(active.closest("li").id, active.closest("li").dataset.target);
}

function manageFocus(activeTab) {
  tabs.forEach(function(tab) {
    if (activeTab === tab) {
      tab.setAttribute("tabIndex", 0);
      tab.focus();
      tab.setAttribute("aria-selected", "true");
      document
        .getElementById(tab.getAttribute("aria-controls"))
        .setAttribute("tabIndex", 0);
    } else {
      tab.setAttribute("tabIndex", -1);
      document
        .getElementById(tab.getAttribute("aria-controls"))
        .setAttribute("tabIndex", -1);
      tab.setAttribute("aria-selected", "false");
    }
  });
}

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

var users = [
  {
    username: "mikki",
    name: "Mike",
    surname: "Bobi",
    address: "Holborn str",
    phoneNumber: "07123456789",
    email: "mike@mail.com"
  },
  {
    username: "roror",
    name: "Rob",
    surname: "Cahil",
    address: "Stera str",
    phoneNumber: "07123099389",
    email: "rob@mail.com"
  }
];
var regForm = document.getElementById("registerForm");
var registratedUser;
function validateForm() {
  var username = document.getElementById('inp0_').value;
  var name = document.getElementById('inp1_').value;
  var surname = document.getElementById('inp2_').value;
  var address = document.getElementById('inp4_').value;
  var phoneNumber = document.getElementById('inp3_').value;
  var email = document.getElementById('eml1').value;
  var year = document.getElementById('inp7_').value;
  registratedUser = {username, name, surname, address, phoneNumber, email};
  document.getElementById('success').textContent = '';
  var isValid = true;
  regForm.querySelectorAll('[aria-required="true"]').forEach(field => {
    if (field.value === '') {
      isValid = false;
      console.log(field);
      field.classList.add('is-danger');
      field.setAttribute('aria-invalid', true);
    } else {
      field.classList.remove('is-danger');
      field.setAttribute('aria-invalid', false);
    }
  });
  console.log(isValid);
  if (!isValid) {
    document.getElementById('error').textContent = 'Fill all required fields!';
    return false;
  }
  var isUniqueUsername = users.every(user => user.username !== username);
  var username = document.getElementById('inp0_');
  if (!isUniqueUsername) {
    document.getElementById('error').textContent = 'This login name exists. Please, change it';
    username.setAttribute('aria-invalid', true);
    username.classList.add('is-danger');
  } else {
    username.setAttribute('aria-invalid', false);
    username.classList.remove('is-danger');
  }
  var isDuplicatedUser = users.some(user => (user.name === name && user.surname === surname && user.address === address && year === ''));
  if (isDuplicatedUser) {
    document.getElementById('inp7_').closest('.field').classList.remove('display-none');
    document.getElementById('error').textContent = 'Need to add more information. Please, fill the year of born';
  }
  var isNumber = (/^\d+$/).test(phoneNumber);
  var number = document.getElementById('inp3_');
  if (!isNumber) {
    document.getElementById('error').textContent = 'Phone number should contain only digitals.';
    number.setAttribute('aria-invalid', true);
    number.classList.add('is-danger');
  } else {
    number.setAttribute('aria-invalid', false);
    number.classList.remove('is-danger');
  }
  
  var isEmail = (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/).test(email);
  var email = document.getElementById('eml1');
  if (!isEmail) {
    document.getElementById('error').textContent = 'Add valid email.';
    email.setAttribute('aria-invalid', true);
    email.classList.add('is-danger');
  } else {
    email.setAttribute('aria-invalid', false);
    email.classList.remove('is-danger');
  }
  
  return isUniqueUsername && isValid && !isDuplicatedUser && isNumber && isEmail;
};

regForm.onsubmit = function(e) {
  e.preventDefault();
  if (validateForm()) {
    users.push(registratedUser);
    console.log(users);
    document.getElementById('error').textContent = '';
    document.getElementById('success').textContent = 'Well done. You\'re registered.';
    regForm.querySelectorAll('input').forEach(inp => inp.value = '');
  } else {
    return;
  }
};
