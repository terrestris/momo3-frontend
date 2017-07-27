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

            var viewport = Ext.ComponentQuery.query('viewport')[0];
            // add custom components without having to customize the
            // XML beans for the different profiles, running manual SQL
            // insert for already running production systems etc. pp.
            Ext.each(viewport.items.items, function(item) {
                if (item.region === 'north') {
                    me.addCustomNorthPanelItems(item);
                } else if (item.region === 'east') {
                    me.addCustomEastPanelItems(item);
                } else if (item.region === 'south') {
                    me.addCustomSouthPanelItems(item);
                } else if (item.region === 'west') {
                    me.addCustomWestPanelItems(item);
                } else if (item.region === 'center') {
                    me.addCustomCenterPanelItems(item);
                }
            });

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
    },

    /**
    *
    */
   addCustomNorthPanelItems: function(cmp) {
       cmp.add([{
           xtype: 'button',
           cls: 'helpbtn',
           bind: {
               text: '{i18n.helpButtonText}'
           },
           handler: function(btn) {
               var lang = btn.up('viewport').getViewModel().get(
                   'currentLanguage').toLowerCase();
               var win = Ext.create('Ext.window.Window', {
                   width: '80%',
                   height: '80%',
                   layout: 'fit',
                   items: {
                       xtype: 'component',
                       autoEl: {
                           tag: 'iframe',
                           style: 'height: 100%; width: 100%; border: none',
                           src: '../userdocs/build/MoMo_doc_' + lang + '.pdf'
                       }
                   },
               });
               win.show();
           }
       }, {
           xtype: 'basigx-button-help',
           cls: 'contexthelpbtn',
           viewModel: {
               data: {
                   tooltip: '{i18n.contextHelpTooltip}'
               }
           },
           bind: {
               helpUrl: '../userdocs/build/MoMo_doc_{currentLanguage}_html.html',
           },
           additonalHelpKeys: [
               /* the north panel */
               'momo-login-logout-button',
               'momo-translation-en-button',
               'momo-translation-de-button',
               'momo-translation-mn-button',
               'momo-list-documents-button',
               'momo-form-field-multisearch',
               /* the center panel */
               'momo-component-map',
               'momo-button-stepback',
               'momo-button-stepforward',
               'momo-button-print',
               'momo-button-showworkstatetoolspanel',
               'momo-button-showmetapanel',
               'momo-button-showmeasuretoolspanel',
               'momo-button-showredliningtoolspanel',
               'momo-button-zoomtoextent',
               'momo-button-addwms',
               'momo-combo-scale',
               /* the west panel */
               'momo-panel-legendtree'
           ]
       }])
   },

   /**
    *
    */
   addCustomEastPanelItems: function(cmp) {

   },

   /**
    *
    */
   addCustomSouthPanelItems: function(cmp) {

   },

   /**
    *
    */
   addCustomWestPanelItems: function(cmp) {

   },

   /**
    *
    */
   addCustomCenterPanelItems: function(cmp) {

   }

});
