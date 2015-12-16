Ext.define('ShogunClient.util.ApplicationContext', {
    extend: 'BasiGX.util.ConfigParser',

    statics: {

        // i18n
        errorMsgTitle: '٩(͡๏̯͡๏)۶',
        appContextErrorMsg: 'Fehler beim Laden des ApplicationContext:' +
                '<br></br><code>{0}</code><br></br>',
        appContextNoIdGivenErrorMsg: 'No applicationID given!',
        appContextNotLoadedErrorMsg: 'Couldn\'t find the application context.' +
                ' Did you load the context with loadApplicationContext() and ' +
                'did you set it to the main application config?',
        appContextNotSetErrorMsg: 'Couldn\'t set the application context! ' +
                'It\'s very unlike the application will work as expected...',
        // i18n

        /**
         * The path configs needed by this class.
         */
        pathConfig: {
            appContextUrlTpl: '../application/get.action?id={0}'
        },

        /**
         * Returns the application context from the main Ext.Application if
         * already set.
         */
        getApplicationContext: function() {
            var me = this;

            if (ShogunClient.getApplication() &&
                    ShogunClient.getApplication().getApplicationContext()) {
                return ShogunClient.getApplication().getApplicationContext();
            } else {
                Ext.Logger.error(me.appContextNotLoadedErrorMsg);
            }
        },

        /**
         * Sets the provided application context to the main Ext.Application.
         */
        setApplicationContext: function(appCtx) {
            var me = this;

            if (appCtx && ShogunClient.getApplication() &&
                    ShogunClient.getApplication().setApplicationContext()) {
                ShogunClient.getApplication().setApplicationContext(appCtx);
            } else {
                Ext.Logger.error(me.appContextNotSetErrorMsg);
            }
        },

        /**
         * Load the application context by the provided appContextUrl.
         *
         * This method should be called on application initialization only. When
         * called it loads the context via AJAX and sets the provided response
         * object to the application itself. Afterwards it can be accessed using
         * the getApplicationContext() method.
         *
         * @param {String} appId The application ID to load.
         * @param {Function} [cbFn] The callback function to be called on
         *     success.
         */
        loadApplicationContext: function(appId, cbFn) {
            var me = this;

            if (!appId) {
                Ext.Msg.alert(
                    me.errorMsgTitle,
                    Ext.String.format(me.appContextErrorMsg,
                            me.appContextNoIdGivenErrorMsg)
                );
                return false;
            }

            // load the application context
            Ext.Ajax.request({
                url: Ext.String.format(me.pathConfig.appContextUrlTpl, appId),
                method: 'GET',
                success: function(response) {
                    if (response && response.responseText) {
                        try {
                            var reponseObj = Ext.JSON.decode(
                                    response.responseText);
                        } catch(err) {
                            Ext.Msg.alert(
                                me.errorMsgTitle,
                                Ext.String.format(me.appContextErrorMsg, err)
                            );
                            return false;
                        }

                        // set the application context to the application to be
                        // accessed easily later
                        me.setApplicationContext(reponseObj);

                        // if we were called with a callback function as single
                        // argument call this function with the application
                        // context as parameter as the initiator wants to deal
                        // with it maybe
                        if (cbFn && Ext.isFunction(cbFn)) {
                            cbFn(reponseObj);
                        }
                    } else {
                        Ext.Msg.alert(
                            me.errorMsgTitle,
                            Ext.String.format(me.appContextErrorMsg)
                        );
                    }
                },
                failure: function(response) {
                    var errorMsg;
                    if (response && response.responseText) {
                        errorMsg = response.responseText;
                    }
                    Ext.Msg.alert(
                        me.errorMsgTitle,
                        Ext.String.format(me.appContextErrorMsg, errorMsg)
                    );
                }
            });
        },

        /**
         * Returns the `viewport` configuration object.
         *
         * @return {Object} The viewport configuration.
         */
        getViewport: function() {
            var me = this;
            return me.getValue('viewport');
        },

        /**
         * Returns the `mapConfig` configuration object.
         *
         * @return {Object} The map configuration.
         */
        getMapConfig: function() {
            var me = this;
            return me.getValue('mapConfig');
        },

        /**
         * Returns the `mapControls` configuration object.
         *
         * @return {Object} The map controls configuration.
         */
        getMapControls: function() {
            var me = this;
            return me.getValue('mapControls');
        },

        /**
         * Method may be used to return a value of a given input object by a
         * provided query key. The query key can be used in two ways:
         *   * Single-value: Find the first matching key in the provided object
         *     (Use with caution as the object/array order may not be as
         *     expected and/or deterministic!).
         *   * Backslash ("/") separated value: Find the last (!) matching key
         *     in the provided object.
         *
         * @param {String} queryKey The key to be searched.
         * @param {Object} [queryObject] The object to be searched on. If not
         *     provided the global application context (on root-level) will
         *     be used.
         *
         * @return The target value or undefined if the given couldn't be found.
         */
        getValue: function(queryKey, queryObject) {
            var me = this,
                queryMatch;

            // if weren't called with an queryObject, get the global application
            // context as input value
            if (!queryObject) {
                queryObject = me.getApplicationContext();
            }

            if (!Ext.isObject(queryObject)) {
                Ext.Logger.error('Missing input parameter ' +
                        'queryObject <Object>!');
                return false;
            }

            if (!Ext.isString(queryKey)) {
                Ext.Logger.error('Missing input parameter queryKey <String>!');
                return false;
            }

            // if the queryKey contains backslashes we understand this as the
            // path in the object-hierarchy and will return the last matching
            // value
            if (queryKey.split('\/').length > 1) {
                Ext.each(queryKey.split('\/'), function(key) {
                    if (queryObject[key]) {
                        queryObject = queryObject[key];
                    } else {
                        // if the last entry wasn't found return the last match
                        return queryObject;
                    }
                });
                return queryObject;
            }

            // iterate over the input object and return the first matching
            // value
            for (var key in queryObject) {

                // get the current value
                var value = queryObject[key];

                // if the given key is the queryKey, let's return the
                // corresponding value
                if (key === queryKey) {
                    return value;
                }

                // if the value is an object, let's call ourself recursively
                if (Ext.isObject(value)) {
                    queryMatch = me.getValue(queryKey, value);
                    if (queryMatch) {
                        return queryMatch;
                    }
                }

                // if the value is an array and the array contains an object as
                // well, let's call ourself recursively for this object
                if (Ext.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        var val = value[i];
                        if (Ext.isObject(val)) {
                            queryMatch = me.getValue(queryKey, val);
                            if (queryMatch) {
                                return queryMatch;
                            }
                        }
                    }
                }
            }

            // if we couldn't find any match, return false
            return undefined;
        }
    }
});
