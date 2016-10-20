/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('MoMo.client.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'MoMo.client.util.ApplicationContext',
        'MoMo.client.util.URL',
        'MoMo.client.util.Module',
        'MoMo.client.util.User'
    ],

    name: 'MoMo.client',

    stores: [],

    config: {
        applicationContext: null,
        user: null
    },

    /**
     *
     */
    init: function() {
        var me = this;
        var appCtxUtil = MoMo.client.util.ApplicationContext;
        var moduleUtil = MoMo.client.util.Module;
        var urlUtil = MoMo.client.util.URL;

        // disable annoying debug messages from WAI-ARIA 1.0 recommendations.
        Ext.enableAriaButtons = false;
        Ext.enableAriaPanels = false;

        // get the current application ID
        var appId = urlUtil.getUrlQueryParameter('id');

        // load the application context and build the application on success
        appCtxUtil.loadApplicationContext(appId, function() {
            var viewportName = 'MoMo.client.view.container.Viewport';
            // create the viewport
            moduleUtil.createViewport(viewportName);
            // and set it to the application
            me.setMainView(viewportName);
        });

    },

    /**
     *
     */
    onAppUpdate: function () {
        Ext.Msg.confirm(
            'Application Update',
            'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }

});
