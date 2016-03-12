
'use strict';

var vraFilters = angular.module('vraFilters', ['ngSanitize']);

vraFilters.filter('check', function () {
    return function (input) {
        return +input ? '<i class="icon-publish"></i>' : '<i class="icon-unpublish"></i>';
    };
});

vraFilters.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    };
});
