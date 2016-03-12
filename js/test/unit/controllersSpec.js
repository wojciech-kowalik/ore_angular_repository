describe('CategoriesController', function () {

    beforeEach(module('visualnetRepositoryApp'));

    it('should create model with 3 elements', inject(function ($controller) {
        var scope = {},
                ctrl = $controller('CategoriesController', {$scope: scope});

        expect(scope.categories.length).toBe(3);
    }));

});