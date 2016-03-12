
'use strict';

var app = angular.module('visualnetRepositoryApp', ['ui.bootstrap']);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

function PageController($scope, $timeout) {
    $scope.list = [
        {"name":"name 1"},
        {"name":"name 2"},
        {"name":"name 3"},
        {"name":"name 4"},
        {"name":"name 5"},
        {"name":"name 6"},
        {"name":"name 7"},
        {"name":"name 8"},
        {"name":"name 9"},
        {"name":"name 10"},
        {"name":"name 11"},
        {"name":"name 12"},
        {"name":"name 13"},
        {"name":"name 14"},
        {"name":"name 15"},
        {"name":"name 16"},
        {"name":"name 17"},
        {"name":"name 18"},
        {"name":"name 19"},
        {"name":"name 20"},
        {"name":"Peter"},
        {"name":"Frank"},
        {"name":"Joe"},
        {"name":"Ralph"},
        {"name":"Gina"},
        {"name":"Sam"},
        {"name":"Britney"}
    ];

    $scope.currentPage = 1; //current page
    $scope.maxSize = 5; //pagination max size
    $scope.entryLimit = 5; //max rows for data table

    /* init pagination with $scope.list */
    $scope.noOfPages = Math.ceil($scope.list.length/$scope.entryLimit);
    
    $scope.filter = function() {
        $timeout(function() { 
            //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.noOfPages = Math.ceil($scope.filtered.length/$scope.entryLimit);
        }, 10);
    };
};