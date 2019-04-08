const TitleBarReplacerView = require('./tbrv.js');
const remote = require('electron').remote;
const CompositeDisposable = require('atom').CompositeDisposable;
var fs = require("fs");
var $ = jQuery = require("jquery");
var _this;
var closeOnDispatch = true;
var altOn = false;
var packageReady = false;

module.exports = {
  config: {},
  activate: function(state) {
    _this = this;
    atom.config.set('tool-bar.position', 'Left');
    atom.config.set('tool-bar.iconSize', '24px');
    atom.config.set('markdown-preview.openPreviewInSplitPane', false);
    atom.config.set('tree-view.hideVcsIgnoredFiles', false);
    atom.config.set('script-runner.clearBeforeExecuting', false);
    atom.config.set('platformio-ide-terminal.core.autoRunCommand', 'bash');
    atom.config.set('platformio-ide-terminal.style.defaultPanelHeight', '150px');
    atom.config.set('platformio-ide-terminal.style.theme', 'linux');
    atom.config.set('platformio-ide-terminal.toggles.autoClose', true);
    this.titleBarReplacerView = new TitleBarReplacerView({
      state: state.titleBarReplacerViewState,
      TitleBarReplacer: this
    });
    this.titleBarPanel = this.titleBarReplacerView.getElement();
    var chdiv = document.createElement("div");
    chdiv.classList.add("xmenu");
    chdiv.innerHTML = '<div class="xsmenu"></div><button class="xsmbutton btn icon icon-grabber"></button></div>';
    var ad = document.getElementsByTagName("atom-dock")[0];
    ad.appendChild(chdiv);
    var xsm = document.getElementsByClassName("xsmenu")[0];
    xsm.appendChild(this.titleBarPanel);
    $('.xmenu button').click(function(e) {
      $('.xmenu .xsmenu').fadeToggle(100);
      e.stopPropagation();
    });
    $(document).click(function() {
      $('.xmenu .xsmenu').fadeOut(100);
    });
    this.titleBarReplacerView.spawnTemp();
      if ($("atom-pane-container.panes").css("display") == "flex") {
        _this.titleBarReplacerView.deserializeLabels();
        _this.titleBarReplacerView.initMenuBar();
        _this.titleBarReplacerView.updateMenu();
        packageReady = true;
      }
    return require('atom-package-deps').install('arshen-ac');
  },
  deactivate: function() {
    this.titleBarReplacerView.destroy();
    var ref;
    return (ref = this.toolBar) != null ? ref.removeItems() : void 0;
  },
  serialize() {
    return {
      titleBarReplacerViewState: this.titleBarReplacerView.serialize()
    };
  },
  consumeToolBar: function(toolBar) {
    mainWindow = remote.getCurrentWindow();
    this.toolBar = toolBar('arshen-tb');
    this.toolBar.addButton({
      icon: 'chromebox',
      callback: '',
      iconset: 'aac'
    });
    var list = document.getElementsByClassName("tool-bar")[0];
    var list2 = list.getElementsByTagName("button")[0];
    var chdiv = document.createElement("div");
    chdiv.classList.add("chromebox");
    chdiv.innerHTML = '<div class="chromecbox"><div class="prefixc"></div><a class="ccbitem xclose" id="xclose" href="#"><i class="ion ion-close-round"></i></a><a class="ccbitem xmin" id="xmin" href="#"><i class="ion ion-minus-round"></i></a><a class="ccbitem xmax" id="xmax" href="#"><i class="ion ion-arrow-expand"></i></a></div>';
    list2.parentNode.replaceChild(chdiv, list2);
    $(".xclose").click(function() {
      xcloseClicked();
    });
    $(".xmin").click(function() {
      mainWindow.minimize();
    });
    $(".xmax").click(function() {
      xmaxClicked();
    });
    var subscriptions = new CompositeDisposable;
    div1 = document.getElementsByClassName('xclose')[0];
    div2 = document.getElementsByClassName('xmin')[0];
    div3 = document.getElementsByClassName('xmax')[0];
    div4 = document.getElementsByClassName('xsmbutton')[0];
    subscriptions.add(atom.tooltips.add(div1, {
      title: 'Close Window',
      delay: {show: 200, hide: 100}
    }));
    subscriptions.add(atom.tooltips.add(div2, {
      title: 'Minimize Window',
      delay: {show: 200, hide: 100}
    }));
    subscriptions.add(atom.tooltips.add(div3, {
      title: 'Toggle Window Size',
      delay: {show: 200, hide: 100}
    }));
    subscriptions.add(atom.tooltips.add(div4, {
      title: 'Menu',
      delay: {show: 200, hide: 100},
      placement: 'auto left'
    }));
    this.toolBar.addButton({
      icon: 'arrows-alt',
      callback: 'window:toggle-full-screen',
      tooltip: 'Toggle Fullscreen',
      iconset: 'fa'
    });
    this.toolBar.addButton({
      icon: 'document',
      callback: 'application:new-file',
      tooltip: 'New File',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'folder',
      callback: 'application:open-file',
      tooltip: 'Open...',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'archive',
      callback: 'core:save',
      tooltip: 'Save',
      iconset: 'ion'
    });
    this.toolBar.addSpacer();
    this.toolBar.addButton({
      icon: 'search',
      callback: 'find-and-replace:show',
      tooltip: 'Find in Buffer',
      iconset: 'ion'
    });
    this.toolBar.addButton({
      icon: 'shuffle',
      callback: 'find-and-replace:show-replace',
      tooltip: 'Replace in Buffer',
      iconset: 'ion'
    });
    this.toolBar.addSpacer();
    this.toolBar.addButton({
      icon: 'git-plain',
      callback: 'git-plus:menu',
      tooltip: 'Git plus',
      iconset: 'devicon'
    });
    this.toolBar.addButton({
      icon: 'markdown',
      callback: 'markdown-preview:toggle',
      tooltip: 'Markdown Preview',
      iconset: 'icon'
    });
    this.toolBar.addSpacer();
    this.toolBar.addButton({
      icon: 'star',
      callback: 'atom-beautify:beautify-editor',
      tooltip: 'Beautify',
      iconset: 'fa'
    });
    this.toolBar.addButton({
      icon: 'terminal',
      callback: 'command-palette:toggle',
      tooltip: 'Toggle Command Palette',
      iconset: 'icon'
    });
    return this.toolBar.addButton({
      icon: 'gear-a',
      callback: 'settings-view:open',
      tooltip: 'Open Settings View',
      iconset: 'ion'
    });
  },
  setAltOn(bool) {
    altOn = bool;
  }
};

function xcloseClicked() {
  atom.close();
  return false;
}

function xmaxClicked() {
  if (atom.isFullScreen()) {
    atom.toggleFullScreen();
    return false;
  }
  if (atom.isMaximized()) {
    atom.setSize(screen.width, screen.height);
    var newpos = screen.height / 2;
    atom.setPosition(0, newpos);
  } else {
    atom.maximize();
  }
  return false;
}

function initKeyListeners() {

  var switchCategory = function(direction) {

    var target = $(".app-menu .menu-label.hovered, .app-menu .menu-label.open");

    var focusCategory = function() {
      if (target.length == 0) {
        switch (direction) {
          case "right":
            $(".app-menu .menu-label").first().addClass("hovered");
            break;
          case "left":
            $(".app-menu .menu-label").last().addClass("hovered");
        }
        return true;
      }
      return false;
    }

    if (!focusCategory()) {
      switch (direction) {
        case "right":
          target = target.next();
          break;
        case "left":
          target = target.prev();
      }
      _this.titleBarReplacerView.hideAll();
      target.addClass("hovered");
    }

  }

  //Keyboard navigation
  $("atom-workspace").keydown(function(e) {

    if (altOn && $(".app-menu .menu-label.open").length == 0) {

      if (e.which == 39) { //arrow right
        intercept(e);
        switchCategory("right");
      } else if (e.which == 37) { //arrow left
        intercept(e);
        switchCategory("left");
      } else if (e.which == 27) { //escape
        intercept(e);
        $(window).trigger("click");
      }
    }

    //Alt shortcuts
    if (altOn && e.originalEvent.repeat == false) {
      if (e.which == 18 && !(e.altKey && e.ctrlKey)) {
        menuToggleAllowed = false;
        $(window).trigger("click");
        return;
      }

      var key = e.key.toLowerCase();
      var targets;

      if ($(".app-menu .menu-label.open").length == 0) {
        targets = $(".app-menu .menu-label");
      } else {
        targets = $(".app-menu span.open > .menu-box, .app-menu div.open > .menu-box").last().children();
      }

      var dispatched = false;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i].altTrigger == key) {
          dispatched = true;
          $(targets[i]).trigger("click");
          break;
        }
      }

      if (dispatched) {
        intercept(e);
        return;
      }

      var target = $(".app-menu .menu-label.hovered");
      if ((e.which == 32 || e.which == 13 || e.which == 40) && target.length > 0) { //space || enter || arrow down
        target.trigger("click");
        _this.titleBarReplacerView.cleanHovered();
      }
      // Disable alt mode if no command was dispatched and the pressed key was irrelevant
      else if (!dispatched && e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 &&
        e.which != 32 && e.which != 13 && e.which != 27 && e.which != 18) { // arrow left | arrow up | arrow right | arrow down | space | enter | escape | alt
        $(window).trigger("click");
        menuToggleAllowed = false;
      }
    } else if (e.which == 18 && !(e.altKey && e.ctrlKey) && !e.shiftKey && e.originalEvent.repeat == false) { //alt, disable altGraph
      _this.setAltOn(true);
      $(".app-menu").addClass("alt-down");
    }

    //Close menu if open and alt is pressed
    if ((e.which == 18 && !(e.altKey && e.ctrlKey) && e.originalEvent.repeat == false) && $(".app-menu .menu-label.open").length != 0) {
      menuToggleAllowed = false;
      $(window).trigger("click");
    }



    if ($(".title-bar-replacer .menu-label.open").length > 0) {
      var target;

      var selectFirst = function() {
        if ($(".app-menu .menu-label.open .menu-item.selected").length == 0) {
          target = $(".app-menu .menu-label.open .menu-item").first();
          target.trigger("mouseenter");
          target.removeClass("open");
          return true;
        }
        return false;
      }

      target = $(".app-menu .menu-label.open .menu-item.selected").last();

      if (e.which == 38) { //arrow up
        intercept(e);
        if (selectFirst()) return;
        parent = target.parent().parent();
        target = target.prev();
        if (target.length == 0 && parent.hasClass("menu-label")) {
          parent.removeClass("open");
          parent.addClass("hovered");
          _this.setAltOn(true);
          $(".app-menu").addClass("alt-down");
          return;
        }
        while (target.length != 0 && target.prop("nodeName") != "DIV") {
          target = target.prev();
        }
        target.trigger("mouseenter");
        target.removeClass("open");
      } else if (e.which == 40) { //arrow down
        intercept(e);
        if (selectFirst()) return;
        target = target.next();
        while (target.length != 0 && target.prop("nodeName") != "DIV") {
          target = target.next();
        }
        target.trigger("mouseenter");
        target.removeClass("open");
      } else if (e.which == 37) { //arrow left
        intercept(e);
        $(".app-menu .menu-item.has-sub.open").last().trigger("mouseenter");
        if (!target.parent().parent().hasClass("menu-label"))
          target.parent().parent().removeClass("open");
        else {
          switchCategory("left");
          _this.setAltOn(true);
          $(".app-menu").addClass("alt-down");
        }
      } else if (e.which == 39) { //arrow right
        intercept(e);
        if (!target.hasClass("has-sub")) {
          switchCategory("right");
          _this.setAltOn(true);
          $(".app-menu").addClass("alt-down");
          return;
        }

        target.addClass("open");
        target = target.find(".menu-item").first();
        target.trigger("mouseenter");
      }

      //Execute command
      else if (e.which == 13) { //enter
        intercept(e);
        target.trigger("click");
      }
      // Bounce
      else if (e.which == 32 && target && !target.hasClass("has-sub")) {
        intercept(e);
        target[0].ignoreHide = true;
        target.trigger("click");

        var duration = parseFloat(target.css("animation-duration")) * 1000;
        target.addClass("bounce");
        setTimeout(function() {
          target.removeClass("bounce");
        }, duration);
      }
      //Close menu
      else if (e.which == 27) { //escape
        intercept(e);
        $(window).trigger("click");
      }
    }
  });
}

function intercept(event) {
  event.stopPropagation();
  event.preventDefault();
}
