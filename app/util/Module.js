Ext.define('ShogunClient.util.Module', {

    statics: {

        //i18n

        //i18n

        /**
         * Blacklisted module properties to be ignored while parsing.
         */
        modulePropertyBlackList: [
            'id',
            'created',
            'modified'
        ],

        /**
         * Creates the viewport for the main application by parsing the given
         * applicationContext `viewport` configuration.
         *
         * @param {String} viewportName The class name for the viewport.
         */
        createViewport: function(viewportName) {
            var me = this;
            var appCtxUtil = ShogunClient.util.ApplicationContext;
            var appViewport = appCtxUtil.getValue('viewport');
            var appViewportType = appCtxUtil.getValue('type', appViewport);
            var appViewportPlacements = appCtxUtil.getValue('regions',
                    appViewport);
            var appViewportModules = appCtxUtil.getValue('subModules');
            var items = [];

            // iterate over each placement property and find the corresponding
            // viewport modules
            Ext.Array.each(appViewportPlacements, function(placement, idx) {
                // get the subModule for the given placement
                var item = appViewportModules[idx];

                // if we could find any module...
                if (item) {

                    // create the subModules for this item
                    me.createAppModule(item);

                    // check the given item properties and respond with a simple
                    // log message if no appropriate property is set
                    me.checkModuleProperties(item, appViewport);

                    items.push(item);

                } else {
                    // ...show warning otherwise
                    Ext.Logger.warn('Could not find any item for placement ' +
                            'property: ' + placement);
                }
            });

            // create the viewport
            Ext.create(viewportName, {
                layout: appViewportType,
                items: items
            });

        },

        /**
         * Returns a valid module to be used in the viewport of the main
         * application. A valid module contains no invalid properties and has
         * set all needed properties. If the input module contains any further
         * submodules we will be called recursively.
         *
         * @param {Object} module The module to create.
         * @return {Object} The valid module object.
         */
        createAppModule: function(module) {
            var me = this;
            var subModules = [];

            // remove invalid module properties
            me.removeInvalidModuleProperties(module);

            // set all given module properties
            me.setModuleProperties(module);

            // call ourself recursively if we could find any submodule in the
            // current module
            if (module.subModules) {
                Ext.each(module.subModules, function(subModule) {
                    // check the given item properties and respond with a simple
                    // log message if no appropriate property is set
                    me.checkModuleProperties(subModule, module);
                    subModules.push(me.createAppModule(subModule));
                });
                module.items = subModules;
            }

            return module;
        },

        /**
         * Each module may contain an object `properties` which in turn
         * includes a set of any given ExtJS component config properties. By
         * the use of this method, these properties will be set to the module
         * object root node. As the object `properties` isn't needed
         * afterwards, we will delete it after completion.
         *
         * Note: At this stage of development, SHOGun2 returns the module
         *       properties as string-string pairs always. To be fully
         *       compatible with ExtJS (and JavaScript of course), we try to
         *       convert the property values to primitive data types
         *       (Number, String, Boolean).
         *
         * @param {Object} module The module object to work on.
         * @return {Object} The manipulated module object.
         */
        setModuleProperties: function(module) {

            if (module.properties) {
                Ext.iterate(module.properties, function(key, val) {
                    // try to transform the value to a Boolean
                    val = val === 'true' ? true :
                            (val === 'false' ? false : val);
                    // try to transform the value to a Number
                    val = !isNaN(val) ? parseFloat(val) : val;
                    // and set the pair to the root object
                    module[key] = val;
                });
                // remove the properties object as not needed anymore
                delete module.properties;
            }

            return module;
        },

        /**
         * Iterate over all given item key-value pairs and remove any key
         * that didn't contain any value or is black listed.
         *
         * @param {Object} module The module object to work on.
         * @return {Object} The cleaned module object.
         */
        removeInvalidModuleProperties: function(module) {
            var me = this;

            Ext.iterate(module, function(key, val) {
                if (!val || Ext.Array.contains(
                        me.modulePropertyBlackList, key)) {
                    delete module[key];
                }
            });

            return module;
        },

        /**
         * Returns an info or warning message if the given module is missing a
         * recommended or required property. These properties are defined by the
         * composite parentModule containing the layout.
         *
         * @param {Object} subModule The module object to check.
         * @param {Object} parentModule The parent module to get the validations
         *                              from.
         */
        checkModuleProperties: function(subModule, parentModule) {
            var appCtxUtil = ShogunClient.util.ApplicationContext;
            var appViewportPropHints = appCtxUtil.getValue('propertyHints',
                    parentModule);
            var appViewportPropMusts = appCtxUtil.getValue('propertyMusts',
                    parentModule);

            Ext.each(appViewportPropMusts, function(prop) {
                if (!Ext.Array.contains(Ext.Object.getKeys(subModule), prop)) {
                    Ext.Logger.warn('Module ' + subModule.name + ' has not ' +
                            'set the required value ' + prop);
                }
            });

            Ext.each(appViewportPropHints, function(prop) {
                if (!Ext.Array.contains(Ext.Object.getKeys(subModule), prop)) {
                    Ext.Logger.log('Module ' + subModule.name + ' has not ' +
                            'set the recommended value ' + prop);
                }
            });
        }
    }
});
