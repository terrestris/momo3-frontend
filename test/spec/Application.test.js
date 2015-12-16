Ext.Loader.syncRequire(['ShogunClient.Application']);

describe('ShogunClient.Application', function() {
    describe('Basics', function() {
        it('is defined', function() {
            expect(ShogunClient.Application).to.not.be(undefined);
        });
    });
});
