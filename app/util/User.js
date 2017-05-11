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
                var userRoles = userInfo.get('groupRoles');
                Ext.each(userRoles, function(role) {
                    if (role.indexOf('ROLE_ADMIN') > -1) {
                        userIsAdmin = true;
                        return false;
                    }
                });
            }

            return userIsAdmin;
        },

       /**
        *
        */
       currentUserHasAtLeastEditorRole: function() {
           var currentUserHasAtLeastEditorRole = false;
           var userInfo = this.getUserInfo();

           if(userInfo) {
               var userRoles = userInfo.get('groupRoles');
               Ext.each(userRoles, function(role) {
                   if (role.indexOf('ROLE_ADMIN') > -1) {
                       currentUserHasAtLeastEditorRole = true;
                       return false;
                   }
                   if (role.indexOf('ROLE_SUBADMIN') > -1) {
                       currentUserHasAtLeastEditorRole = true;
                       return false;
                   }
                   if (role.indexOf('ROLE_EDITOR') > -1) {
                       currentUserHasAtLeastEditorRole = true;
                       return false;
                   }
               });
           }

           return currentUserHasAtLeastEditorRole;
       }
    }

});

