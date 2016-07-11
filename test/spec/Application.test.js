Ext.Loader.syncRequire(['MoMo.client.Application']);

describe('MoMo.client.Application', function() {
    describe('Basics', function() {
        it('is defined', function() {
            expect(MoMo.client.Application).to.not.be(undefined);
        });
    });
});
