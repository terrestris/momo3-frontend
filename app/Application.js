/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('MoMo.client.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'MoMo.client.util.ApplicationContext',
        'MoMo.client.util.ApplicationState',
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
        var appStateUtil = MoMo.client.util.ApplicationState;
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

            // get the state token, if given
            var appStateToken = urlUtil.getUrlQueryParameter('state');

            if (!Ext.isEmpty(appStateToken)) {
                appStateUtil.loadApplicationState(appStateToken,
                        me.onLoadAppStateSuccess, me.onLoadAppStateFailure, me);
            }
        });

    },

    /**
     *
     */
    onLoadAppStateSuccess: function(appStateRecord) {

        if (!(appStateRecord instanceof MoMo.client.model.ApplicationState)) {
            return false;
        }

        var appId = parseInt(MoMo.client.util.URL
                .getUrlQueryParameter('id'), 10);
        var appStateId = appStateRecord.get('application');

        // Only proceed if the current application ID matches the
        // assignedWebApp ID of the loaded application state
        if (appId !== appStateId) {
            return false;
        }

        MoMo.client.util.ApplicationState.setState(appStateRecord);
    },

    /**
     *
     */
    onLoadAppStateFailure: function(error) {
        Ext.Logger.error('Error while requesting ApplicationState: ',
                            error);
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
