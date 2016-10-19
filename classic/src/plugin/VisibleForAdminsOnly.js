Ext.define('MoMo.client.plugin.VisibleForAdminsOnly', {
    extend : 'Ext.plugin.Abstract',
    alias : 'plugin.visibleforadminsonly',

    pluginId: 'visibleforadminsonly',

    init : function(cmp) {
        this.setCmp(cmp);

        var currentUserIsAdmin = MoMo.client.util.User.currentUserIsAdmin();

        if(!currentUserIsAdmin) {
            // hide the component if the current user is not an admin
            cmp.hide();
        }
    }
});
