/**
 *
 */
Ext.define('MoMo.client.view.panel.RbmaPrfPreviewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.panel.rbmapdfpreview',

    data: {
        pdfFile: './resources/testPdf.pdf',
        downloadBtnText: 'Download document as PDF'
    }

});
