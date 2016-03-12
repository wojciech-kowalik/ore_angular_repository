
'use strict';

var visualnetRepositoryApp = angular.module('visualnetRepositoryApp', [
    'ngRoute',
    'ui.bootstrap',
    'vraControllers',
    'vraServices',
    'vraFilters',
    'vraDirectives',
    'vraInterceptors'

]).run(function ($rootScope) {

    // helpers functions
    $rootScope.utilities = {
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        },
        calculateTime: function (response) {
            var time = response.config.responseTimestamp - response.config.requestTimestamp;
            console.log('The request took: ' + (time / 1000) + ' seconds.');
        }

    };

}).constant('config', {
    // configuration constans
    CATEGORY_FORM_TEMPLATE: 'components/com_visualnetrepository/assets/partials/category/form.html',
    CATEGORY_SERVICE_URL: '/administrator/index.php?option=com_visualnetrepository&view=categories&format=json',
    CATEGORY_SAVE_URL: '/administrator/index.php?option=com_visualnetrepository&task=categories.saveCategory',
    CATEGORY_DELETE_URL: '/administrator/index.php?option=com_visualnetrepository&task=categories.deleteCategory',
    CATEGORY_GET_URL: '/administrator/index.php?option=com_visualnetrepository&task=categories.getCategory'

}).config(function ($routeProvider, $httpProvider) {

    // routing     
    $routeProvider.
            when('/categories', {
                templateUrl: 'components/com_visualnetrepository/assets/partials/categories.html',
                controller: 'CategoriesController'
            }).
            when('/files', {
                templateUrl: 'components/com_visualnetrepository/assets/partials/files.html',
                controller: 'FilesController'
            }).
            otherwise({redirectTo: '/categories'});

    $httpProvider.interceptors.push('timestampMarker');

});
