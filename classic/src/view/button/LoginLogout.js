/**
 * LoginLogout Button
 *
 * @class MoMo.client.view.button.LoginLogout
 */
Ext.define('MoMo.client.view.button.LoginLogout', {
    extend: 'Ext.Button',
    xtype: 'momo-login-logout-button',
    requires: [
        'Ext.app.ViewModel',

        'MoMo.client.view.button.LoginLogoutController',
        'MoMo.client.view.button.LoginLogoutModel'
    ],

    controller: 'button.loginlogout',

    viewModel: 'button.loginlogout',

    ui: 'momo-header-tools',

    cls: 'loginlogout',

    scale: 'small',

    /**
     *
     */
    bind: {
        tooltip: '{tooltip}',
        text: '{text}'
    },

    /**
     *
     */
    listeners: {
        click: 'onClick',
        afterrender: 'setCurrentUserAccountName'
    },

    /**
     *
     */
    constructor: function(cfg) {
        var me = this;

        me.callParent([cfg]);
    }

});
