Ext.define("MoMo.client.view.panel.RbmaPdfPreview",{
    extend: "Ext.panel.Panel",
    xtype: "momo-rbma-pdf-preview",

    controller: 'panel.rbmapdfpreview',

    viewModel: 'panel.rbmapdfpreview',

    collapsible: false,

    collapsed: false,

    layout: 'fit',

    items: [{
        xtype: 'component',
        bind: {
            html : '<iframe src="./resources/' + '{pdfFileName}' + '" width="100%" height="100%"></iframe>'
        }
     }],

     bbar: [
         '->',
      {
         xtype: 'button',
         bind: {
             text: '{downloadBtnText}'
         },
         handler: 'onDownloadBtnClick'
     }],

   /**
    *
    */
    initComponent: function() {
        var me = this;
//        var ctrl = me.getController();

        // call parent
        me.callParent();
    }
});
