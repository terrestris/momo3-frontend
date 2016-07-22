Ext.define('MoMo.client.view.button.RbmaController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.rbma',

    /**
    *
    */
    onClick: function() {
        var win = Ext.create('MoMo.client.window.rbma.RbmaWindow', {});
        win.show();
    }
});
