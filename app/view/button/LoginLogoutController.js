Ext.define('MoMo.client.view.button.LoginLogoutController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.button.loginlogout',

    /**
    *
    */
    onClick: function() {
        var me = this;
        var viewModel = me.getViewModel();

        var isLogin = viewModel.get('isLoginButton');

        if(isLogin) {
            me.doLogin();
        } else {
            BasiGX.confirm('Do you really want to log out?', {
                fn: function(decision) {
                    if (decision === 'yes') {
                        // logout
                        me.doLogout();
                    }
                },
                scope: me
            });
        }

    },

    /**
     *
     */
    doLogin: function() {
        var baseUrl = BasiGX.util.Url.getWebProjectBaseUrl();
        var clientId = MoMo.client.util.ApplicationContext
                .getApplicationContext().id;

        location.href = baseUrl + 'login/?clientId=' + clientId;
    },

    /**
    *
    */
    doLogout: function() {
        var baseUrl = BasiGX.util.Url.getWebProjectBaseUrl();

        Ext.Ajax.request({
            url: baseUrl + 'logout',
            method: "POST",
            headers: BasiGX.util.CSRF.getHeader(),
            callback: function() {
                location.href = baseUrl + "login/";
            }
        });
    },

    /**
     *
     */
    setCurrentUserAccountName: function(){
        var me = this;
        var viewModel = me.getViewModel();

        // TODO get rid of delayed tasks
        var task = new Ext.util.DelayedTask(function(){
            var loggedInUser = MoMo.client.app.getUser();
            var buttonText;
            var isLoginButton;

            if(loggedInUser) {
                var accountName = loggedInUser.get('accountName');

                buttonText = 'Logout (' + accountName + ')';
                isLoginButton = false;
            } else {
                buttonText = 'Login';
                isLoginButton = true;
            }

            viewModel.set('text', buttonText);
            viewModel.set('tooltip', buttonText);
            viewModel.set('isLoginButton', isLoginButton);
        });
        task.delay(500);
    }
});
