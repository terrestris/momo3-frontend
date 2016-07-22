Ext.define('MoMo.client.view.window.rbma.RbmaPdfUploadController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.window.rbma.rbmapdfupload',

    /**
     *
     */
    onUploadBtnClick: function() {
        var me = this,
            form = me.getView().down('form').getForm(),
            baseUrl = BasiGX.util.Url.getWebProjectBaseUrl(),
            // TODO replace it with the backend interface url
            targetUrl = baseUrl + "ADJUST ME";

        if(form.isValid() && targetUrl){
            form.submit({
                url: targetUrl,
                waitMsg: 'Upload in progress...',
                success: function(fp, response) {
                    if (response.result && response.result.success === true) {
                        // TODO implement logic to handle uploaded pdf files
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
