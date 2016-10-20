Ext.define('MoMo.client.util.User', {

    statics: {

        //i18n
        //i18n

        /**
         *
         */
        getUserInfo: function() {
            var userInfo = null;
            var appInfo = MoMo.client.getApplication();

            if(appInfo) {
                userInfo = appInfo.getUser();
            }

            return userInfo;
        },

        /**
         *
         */
        currentUserIsAdmin: function() {
            var userIsAdmin = false;
            var userInfo = this.getUserInfo();

            if(userInfo) {
                var userRoles = userInfo.get('roles');

                Ext.each(userRoles, function(role) {
                    if(role.name === 'ROLE_ADMIN') {
                        userIsAdmin = true;
                        return false; // break Ext.each
                    }
                });
            }

            return userIsAdmin;
        }
    }

});

