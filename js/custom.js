(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  var notifyBtn = document.querySelector('.subscribe');
  notifyBtn.addEventListener('click', function() {
    if (true) {
      var msg = document.createElement("p");
      msg.textContent = 'We will inform you!';
      notifyBtn.closest('.box').appendChild(msg);
    }
  })
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

var tabs = [...document.querySelectorAll("#nav button")];

tabs.forEach(function(navEl) {
  var tabPanel = navEl.getAttribute('aria-controls');

  if (navEl.closest('li').classList.contains('is-active')) {
    navEl.setAttribute('tabIndex', 0);
    navEl.setAttribute('aria-selected', "true");
    document.getElementById(tabPanel).setAttribute('tabIndex', 0);
    
  } else {
    navEl.setAttribute('tabIndex', -1);
    document.getElementById(tabPanel).setAttribute('tabIndex', -1);
    navEl.setAttribute('aria-selected', "false");
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
  var active = tabs[[tabs.indexOf(tab) === 0 ? tabs.length - 1 : tabs.indexOf(tab) - 1]];
  manageFocus(active);
  toggleTab(active.closest('li').id, active.closest('li').dataset.target);
}
function showNextTab(tab) {
  var active = tabs[[tabs.indexOf(tab) === tabs.length - 1 ? 0 : tabs.indexOf(tab) + 1]];
  manageFocus(active);
  toggleTab(active.closest('li').id, active.closest('li').dataset.target);
}
function showFirstTab(e) {
  e.preventDefault();
  var active = tabs[0];
  manageFocus(active);
  toggleTab(active.closest('li').id, active.closest('li').dataset.target);
}
function showLastTab(e) {
  e.preventDefault();
  var active = tabs[tabs.length - 1];
  manageFocus(active);
  toggleTab(active.closest('li').id, active.closest('li').dataset.target);
}

function manageFocus(activeTab) {
  tabs.forEach(function(tab) {
    if (activeTab === tab) {
      tab.setAttribute('tabIndex', 0);
      tab.focus();
      tab.setAttribute('aria-selected', "true");
      document.getElementById(tab.getAttribute('aria-controls')).setAttribute('tabIndex', 0);
    } else {
      tab.setAttribute('tabIndex', -1);
      document.getElementById(tab.getAttribute('aria-controls')).setAttribute('tabIndex', -1);
      tab.setAttribute('aria-selected', "false");
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
