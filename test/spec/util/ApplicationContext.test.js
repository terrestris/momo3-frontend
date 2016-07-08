/*eslint max-len: [0, 80, 4]*/
Ext.Loader.syncRequire(['MoMo.client.util.ApplicationContext']);

describe('MoMo.client.util.ApplicationContext', function() {

    var clazz = MoMo.client.util.ApplicationContext;

    describe('Basics', function() {
        it('is defined', function() {
            expect(clazz).to.not.be(undefined);
        });
    });

    describe('All necessary parameters set', function() {
        it('appContextUrl', function() {
            expect(clazz.pathConfig.appContextUrlTpl).to.be.a('string');
        });
    });

    describe('Static methods', function() {
        describe('#loadApplicationContext', function() {
            clazz.pathConfig.appContextUrlTpl = "../" + clazz.pathConfig.appContextUrlTpl;
            it('is defined', function() {
                expect(clazz.loadApplicationContext).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(clazz.loadApplicationContext).to.be.a('function');
            });
            it('returns undefined if no callback function is given', function() {
                expect(clazz.loadApplicationContext(662)).to.be(undefined);
            });
        });
        describe('#getValue', function() {
            it('is defined', function() {
                expect(clazz.getValue).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(clazz.getValue).to.be.a('function');
            });
            it('returns a key by a query key', function() {
                expect(clazz.getValue('key', {'key': 'value'})).to.be('value');
            });
            it('returns a nested key by a query key', function() {
                expect(clazz.getValue('key', {'rootkey': {'key': 'value'}})).to.be('value');
            });
            it('returns a nested key inside an array by a query key', function() {
                expect(clazz.getValue('key2', {'rootkey': [{'key1': 'value1'}, {'key2': 'value2'}]})).to.be('value2');
            });
            it('returns a key by a concatenated query key', function() {
                expect(clazz.getValue('key1/key2', {'key1': {'key2': 'value2'}})).to.be('value2');
            });
        });
    });
});
