Ext.Loader.syncRequire(['momo.Application']);

describe('momo.Application', function() {
    describe('Basics', function() {
        it('is defined', function() {
            expect(momo.Application).to.not.be(undefined);
        });
    });
});
