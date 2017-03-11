var atomw = document.getElementsByTagName("atom-workspace")[0];
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
