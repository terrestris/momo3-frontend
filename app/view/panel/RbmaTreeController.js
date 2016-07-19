/**
 *
 */
Ext.define('MoMo.client.view.panel.RbmaTreeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panel.rbmatree',

    /**
     *
     */
    setRbmaStore: function() {
        var me = this;
        var view = me.getView();

        var rbmaStore = Ext.create('MoMo.client.store.Rbma', {
            autoLoad: true
        });

        view.store = rbmaStore;
    }
});
