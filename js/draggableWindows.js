var windows = document.getElementsByClassName("slend_window");
var icons = document.getElementsByClassName("slend_icon");
var merch = document.getElementsByClassName("merch");
var tabs = document.getElementsByClassName("slend_minimized");
var stacking = true;
var webcamOn = false;

$(document).ready(function () {

  // $(".merch_icon").click(loadMerch);
  $(".clean_up").click(cleanUp);
  $(".folder").hide();
  $("#webcam-canvas").hide();

  $(document).on("click", ".slend_icon", function () {
    loadFolder(this);
  });

  $(document).on("click", ".minimize_button", function () {
    console.log(this);
    minimizeWindow(this);
  });

  function loadIcons() {
    for (var i = 0; i < icons.length; i++) {
      if (icons[i].parentElement.parentElement.className.includes("slend_window")) {
        $(icons[i]).addClass("ico_foldered");
        console.log(icons[i].parentElement.className);
      } else {
        if (i == 0) {
          icons[i].style.top = (50 * (i + 1.52)) + "px";
        } else {
          dragElement(icons[i]);
          icons[i].style.top = (120 * (i + 1)) + "px";
        }

        if (i <= 6) {
          icons[i].style.left = 50 + "px";
        } else if (i <= 12) {
          icons[i].style.left = 150 + "px";
          icons[i].style.top = (120 * (i - 1)) - 480 + "px";
        } else if (i <= 18) {
          icons[i].style.left = 250 + "px";
          icons[i].style.top = (120 * (i - 1)) - 1200 + "px";
        }
      }
    }
  }

  function loadWindows() {
    for (var i = 0; i < windows.length; i++) {
      dragElement(windows[i]);
      if (windows[i].parentElement.className == "slend_window") {
        windows[i].style.marginTop = "10px";
      } else {
        windows[i].style.left = 630 + "px";
        windows[i].style.top = (800 * (i + 0.3)) - 20 + "px";
      }

      $(windows[i].children[0].children[0].children[0]).click(function (e) {
        closeWindow(e);
      });

      $(windows[i]).hide();
    }

    // if($(".folder").length > 0)
    // {
    //   loadFolder($(".folder")[0]);
    // }
  }

  function cleanUp() {
    loadIcons();
    loadWindows();
  }

  function loadFolder(elmnt) {
    console.log(elmnt);
    var id = elmnt.id;
    var classN = elmnt.className;

    if (id == null) {
      id = elmnt[0].id;
    }

    if (classN == null) {
      classN = elmnt[0].className;
    }

    console.log(id);

    var data = elmnt.getAttribute("data-windows");

    console.log(data);

    var newWindow = document.getElementById(data);
    if (newWindow == null) {
      newWindow = $("." + data);
    }
    console.log(newWindow);

    for (var i = 0; i < icons.length; i++) {
      $(icons[i]).removeClass("ico_selected");
      $(newWindow).removeClass("in-front");
    }

    //$(newWindow).addClass("in-front");

    var window = $("#" + data);

    if (classN.includes("foldered")) {
      console.log(newWindow);

      window.show();
      setWindowPosition(window[0], $(windows).index(window));
      $(elmnt).addClass("ico_selected");
    } else {
      if (data != "clean") {
        if (!stacking) {
          for (var i = 0; i < windows.length; i++) {
            $(windows[i]).hide();
          }
        }

        $(newWindow).show();
        console.log(newWindow);
        console.log($(windows).index(newWindow));
        setWindowPosition(newWindow, 35 + $(windows).index(window));
        $(elmnt).addClass("ico_selected");
      }
    }

    if (data == "webcam" && !webcamOn) {
      webcamCanvas.parent('webcam-canvas-container');
      console.log(document.getElementById($(".webcam").attr('id')).getBoundingClientRect().width);

      showCamera();
      resize(Math.floor(document.getElementById($(".webcam").attr('id')).getBoundingClientRect().width), Math.floor(document.getElementById($(".webcam").attr('id')).getBoundingClientRect().height));
      // resize(600,400);
      console.log("reee");
      webcamOn = true;
    }
  }

  function setWindowPosition(elmnt, offset) {
    var e = elmnt;
    if ($(elmnt).hasClass('behind')) {
      $(elmnt).removeClass('behind');
    }
    $(elmnt).addClass('in-front');
    console.log(e);
    if (elmnt.length > 0) {
      e = elmnt[0];
      console.log(e);
      e.style.top = "15%";
      e.style.left = offset + $(windows).index(elmnt) + "%";
    }
    console.log(e);
    e.style.top = "15%";
    e.style.left = offset + $(windows).index(elmnt) + "%";
  }

  function deselectWindows(selectedWindowID) {
    for (var i = 0; i < windows.length; i++) {
      if (windows[i].id == selectedWindowID) {
        $(windows[i]).removeClass("behind");
        $(windows[i]).addClass("in-front");
        console.log(windows[i].id + "selected");
      } else {
        $(windows[i]).removeClass("in-front");
        $(windows[i]).removeClass("behind");
        $(windows[i]).addClass('behind');
      }
      //console.log(windows[i].id + "deselected");
    }
  }

  loadIcons();
  loadWindows();
  console.log(document.getElementById("slend_img_1"));
  loadFolder(document.getElementById("slend_img_1"));
  loadFolder(document.getElementById("slend_cd_1"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    $(elmnt).addClass('in-front');


    function dragMouseDown(e) {
      e = e || window.event;
      deselectWindows(elmnt.id);
      $(elmnt).addClass('in-front');

      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function closeWindow(elmnt) {
    $(elmnt.target.parentElement.parentElement.parentElement).hide();
    $(elmnt.target.parentElement.parentElement.parentElement).removeClass("in-front");
    $(elmnt.target.parentElement.parentElement.parentElement).removeClass("behind");
    var parentWindow = $(elmnt.target)[0].parentElement.parentElement.parentElement;
    console.log(parentWindow.className);
    if (parentWindow.className.includes("webcam")) {
      webcamOn = false;
      stopCamera();
    }
  }

  function minimizeWindow(elmnt) {
    var window = elmnt.parentElement.parentElement.parentElement;
    $(elmnt.target.parentElement.parentElement.parentElement).removeClass("in-front");
    $(elmnt.target.parentElement.parentElement.parentElement).removeClass("behind");
    console.log(window);

    console.log($(tabs)[$(tabs).index(window)]);

    if ($(window).hasClass("slend_minimized")) {
      $(window).removeClass("slend_minimized");
      $(window).addClass("absolute");
      $(".slend_desktop").append($(window)[$(tabs).index(window)]);
    } else {
      $(window).addClass("slend_minimized");
    }

    var tabID = $(window).attr('id') + "_tab";
    var contains = false;

    if ($("#" + tabID)[0] != null) {
      contains = true;
    }

    if (contains) {
      console.log("Tab already created");
    } else {
      tabID = $(window).attr('id') + "_tab";
      var tab = '<div' + ' id="' + tabID + '"' + ' class="flex-item">';
      console.log($(tab)[0]);
      $(".slend_bottomTabs").append($(tab));
      $("#" + tabID).append($(window));
    }

    console.log(contains);
  }
});