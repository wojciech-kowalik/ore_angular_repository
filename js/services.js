
'use strict';

var vraServices = angular.module('vraServices', ['ngResource']);

vraServices.factory('categories', function ($resource, $log, config) {

    return $resource(config.CATEGORY_SERVICE_URL, {}, {
      query: {method: 'GET', isArray: true}
    });
});