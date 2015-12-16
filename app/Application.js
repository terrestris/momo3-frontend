/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('ShogunClient.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'ShogunClient.util.ApplicationContext',
        'ShogunClient.util.URL',
        'ShogunClient.util.Module'
    ],

    name: 'ShogunClient',

    stores: [],

    config: {
        applicationContext: null
    },

    /**
     *
     */
    init: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var moduleUtil = ShogunClient.util.Module;
        var urlUtil = ShogunClient.util.URL;

        // get the current application ID
        var appId = urlUtil.getUrlQueryParameter('id');

        // load the application context and build the application on success
        appCtxUtil.loadApplicationContext(appId, function() {
            var viewportName = 'ShogunClient.view.container.Viewport';
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
