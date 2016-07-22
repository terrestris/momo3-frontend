Ext.define('MoMo.client.view.window.rbma.RbmaPdfUploadController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.window.rbma.rbmapdfupload',

    /**
     *
     */
    onUploadBtnClick: function() {

        var me = this,
            form = me.getView().down('form').getForm(),
            nodeRecord = me.getView().rec,
            nodeId = nodeRecord.get('id'),
            targetUrl = nodeRecord.getProxy().getUrl() + '/' + nodeId + '/doc';

        if(form.isValid() && targetUrl){
            form.submit({
                url: targetUrl,
                waitMsg: 'Upload in progress...',
                success: function(fp, response) {
                    if (response.result && response.result.success === true) {
                        BasiGX.info("Document upload was successful.");
                        me.getView().close();
                    } else {
                        BasiGX.error("Upload failed. Please try again.");
                    }
                },
                failure: function() {
                    BasiGX.error("Upload failed. Please try again.");
                }
            });
        }
    }
});
