/**
 *
 */
Ext.define('MoMo.client.view.panel.rbma.RbmaPrfPreviewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.panel.rbma.rbmapdfpreview',

    data: {
        pdfFile: './resources/testPdf.pdf',
        downloadBtnText: 'Download document as PDF'
    }

});
