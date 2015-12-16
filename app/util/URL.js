Ext.define('ShogunClient.util.URL', {

    statics: {

        //i18n
        //i18n

        /**
         *
         */
        getUrlQueryParameters: function() {
            return Ext.urlDecode(location.search.substring());
        },

        /**
         *
         */
        getUrlQueryParameter: function(queryParameter) {
            var me = this;

            if (!queryParameter) {
                Ext.Logger.warn('Missing input parameter \'queryParameter\'');
                return false;
            }

            return me.getUrlQueryParameters()[queryParameter];
        }
    }

});

