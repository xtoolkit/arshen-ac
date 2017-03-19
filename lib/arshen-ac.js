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

function xminClicked() {
    atom.minimize();
    return false;
}
module.exports = {
    activate: function(state) {
        return require('atom-package-deps').install('arshen-ac');
    },
    deactivate: function() {
        var ref;
        return (ref = this.toolBar) != null ? ref.removeItems() : void 0;
    },
    serialize: function() {},
    consumeToolBar: function(toolBar) {
        this.toolBar = toolBar('arshen-tb');
        this.toolBar.addButton({
            icon: 'chromebox',
            callback: '',
            iconset: 'aac'
        });
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
            icon: 'navicon-round',
            callback: 'command-palette:toggle',
            tooltip: 'Toggle Command Palette',
            iconset: 'ion'
        });
        var list = document.getElementsByClassName("tool-bar")[0];
        var list2 = list.getElementsByTagName("button")[0];
        var chdiv = document.createElement("div");
        chdiv.classList.add("chromebox");
        chdiv.innerHTML = '<div class="chromecbox"><div class="prefixc"></div><a class="ccbitem xclose" id="xclose" href="#"><i class="ion ion-close-round"></i></a><a class="ccbitem xmin" id="xmin" href="#"><i class="ion ion-minus-round"></i></a><a class="ccbitem xmax" id="xmax" href="#"><i class="ion ion-arrow-expand"></i></a></div>';
        list2.parentNode.replaceChild(chdiv, list2);
        document.getElementById("xclose").addEventListener("click", xcloseClicked);
        document.getElementById("xmin").addEventListener("click", xminClicked);
        document.getElementById("xmax").addEventListener("click", xmaxClicked);
        return this.toolBar.addButton({
            icon: 'gear-a',
            callback: 'settings-view:open',
            tooltip: 'Open Settings View',
            iconset: 'ion'
        });
    }
};
atom.config.set('tool-bar.position', 'Left');
atom.config.set('tool-bar.iconSize', '24px');
atom.config.set('markdown-preview.openPreviewInSplitPane', false);
atom.config.set('core.forceHideTitleBar', true);
