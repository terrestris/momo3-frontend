/*eslint max-len: [0, 80, 4]*/
Ext.Loader.syncRequire(['momo.view.component.MapController']);

describe('momo.view.component.MapController', function() {
    var mapController;

    beforeEach(function() {
        mapController = Ext.create('momo.view.component.MapController');
    });

    afterEach(function() {
        mapController.destroy();
    });

    describe('Basics', function() {
        it('is defined', function() {
            expect(momo.view.component.MapController).to.not.be(undefined);
        });
        it('can be instantiated', function() {
            expect(mapController).to.be.a(momo.view.component.MapController);
        });
    });

    describe('Methods', function() {
        describe('#setMap', function() {
            it('is defined', function() {
                expect(mapController.setMap).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.setMap).to.be.a('function');
            });
        });
        describe('#createOlMapControls', function() {
            it('is defined', function() {
                expect(mapController.createOlMapControls).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlMapControls).to.be.a('function');
            });
        });
        describe('#createOlMap', function() {
            it('is defined', function() {
                expect(mapController.createOlMap).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlMap).to.be.a('function');
            });
        });
        describe('#createOlMapRenderer', function() {
            it('is defined', function() {
                expect(mapController.createOlMapRenderer).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlMapRenderer).to.be.a('function');
            });
        });
        describe('#createOlMapView', function() {
            it('is defined', function() {
                expect(mapController.createOlMapView).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlMapView).to.be.a('function');
            });
        });
        describe('#createOlLayers', function() {
            it('is defined', function() {
                expect(mapController.createOlLayers).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlLayers).to.be.a('function');
            });
        });
        describe('#createOlLayer', function() {
            it('is defined', function() {
                expect(mapController.createOlLayer).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlLayer).to.be.a('function');
            });
        });
        describe('#createOlLayerSource', function() {
            it('is defined', function() {
                expect(mapController.createOlLayerSource).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlLayerSource).to.be.a('function');
            });
        });
        describe('#createOlLayerTileGrid', function() {
            it('is defined', function() {
                expect(mapController.createOlLayerTileGrid).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlLayerTileGrid).to.be.a('function');
            });
        });
        describe('#createOlLayerAttribution', function() {
            it('is defined', function() {
                expect(mapController.createOlLayerAttribution).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.createOlLayerAttribution).to.be.a('function');
            });
        });
        describe('#getProjectionString', function() {
            it('is defined', function() {
                expect(mapController.getProjectionString).to.not.be(undefined);
            });
            it('is a function', function() {
                expect(mapController.getProjectionString).to.be.a('function');
            });
        });
    });
});
