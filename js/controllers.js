
'use strict';

var vraControllers = angular.module('vraControllers', []);

/**
 * Categories controller
 * 
 * @param $scope
 * @param $http
 * @param $modal
 * @param categories
 * @param config
 */
vraControllers.controller('CategoriesController', function ($scope, $http, $route, $modal, $timeout, categories, config) {

    $scope.categories = [];
    $scope.checkedElements = [];
    $scope.categories = categories.query();
    $scope.isShowPagination = false;

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.order = 'id';
    $scope.alerts = [{type: 'info', msg: 'Kategorie plików'}];    

    $scope.categories.$promise.then(function () {
        $scope.totalItems = $scope.categories.length;
        $scope.$watch('currentPage + itemsPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;

            $scope.filteredCategories = $scope.categories.slice(begin, end);
        });
        
        if($scope.totalItems >= $scope.itemsPerPage + 1){
            $scope.isShowPagination = true;
        }
        
    });

    /**
     * Page count action
     * 
     * @return {Number}
     */
    $scope.pageCount = function () {
        return Math.ceil($scope.categories.length / $scope.itemsPerPage);
    };
    
   
    /**
     * Close alert action
     * 
     * @param index
     * @return void
     */
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    /**
     * Open modal action
     * 
     * @param size
     * @param element
     * @return void
     */
    $scope.openModal = function (size, element) {

        if(element === null){
            element = {'id': 0, 'name': '', state: false};
        }

        var modalInstance = $modal.open({
            templateUrl: config.CATEGORY_FORM_TEMPLATE,
            controller: 'CategoryModalController',
            size: size,
            resolve: {
              element: function () {
                return element;
              }
            }
        });
    };
       
    /**
     * Get checkbox values action
     * @param {Array} element
     * @return void
     */   
    $scope.toggleCheck = function (element) {
        
        if ($scope.checkedElements.indexOf(element) === -1) {
            $scope.checkedElements.push(element);
        } else {
            $scope.checkedElements.splice($scope.checkedElements.indexOf(element), 1);
        }
        
    };       
       
    /**
     * Delete category action
     * @return void
     */ 
    $scope.deleteCategory = function () {
              
        var elementsId = [], msg = '';      
                      
        if($scope.checkedElements.length === 0){
            $scope.alerts.push({type: 'error', msg: 'Proszę wybrać element do usunięcia'}); 
            return;
        }        
                
        angular.forEach($scope.checkedElements, function(element, key) {
          elementsId.push(element.id);
        });
      
        $http({
            url: config.CATEGORY_DELETE_URL,
            data: elementsId,
            params: {'id': elementsId.join(',')},
            method: 'GET'

        }).success(function (data) {
            
            if(angular.isArray(data.monit)){
                msg = data.monit.join('<br />');
            }else{
                msg = data.monit;
            }
            
            if(data.type === 'error'){
                $scope.alerts.push({type: data.type, msg: msg}); 
            }else{
                $route.reload();
            }
            
        }).error(function (err) {
            console.err('Error: ' + err);
        });      
      
    };
    
});

/**
 * Category modal controller
 * 
 * @param $scope
 * @param $http
 * @param $route
 * @param $modalInstance
 * @param config
 * @param element
 */
vraControllers.controller('CategoryModalController', function ($scope, $http, $route, $log, $modalInstance, config, element) {

    $scope.isShowAlert = false;
    $scope.form = element;
    $scope.form.state = +$scope.form.state;
    $scope.title = (element.id === 0) ? 'Nowa kategoria' : 'Edycja kategorii';
    $scope.loading = false;
    
    /**
     * Save data action
     * 
     * @return void
     */
    $scope.saveData = function () {

        if (!$scope.form.name) {
            $scope.nameRequired = 'pole wymagane';
            return;
        }

        $scope.loading = true;

        $http({
            url: config.CATEGORY_SAVE_URL,
            data: $scope.form,
            method: 'POST',
            transformRequest: $scope.utilities.transformRequest,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}

        }).success(function (data) {

            $scope.isShowAlert = true;
            $scope.alert = {type: data.type, msg: data.monit};
            $scope.loading = false;
            $route.reload();
                    
        }).error(function (err) {

            $scope.isShowAlert = true;
            $scope.loading = false;
            $scope.alert = {type: 'error', msg: 'Błąd zapisu do bazy'};
            console.err('Error: ' + err);

        }).then(function (response){
            
            $scope.loading = false;
            $scope.utilities.calculateTime(response);
            
        });

    };

    /**
     * Ok button action
     * 
     * @return void
     */
    $scope.ok = function () {
        $modalInstance.close();
    };

    /**
     * Cancel button action
     * 
     * @return void
     */
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

vraControllers.controller('FilesController', function ($scope) {

    $scope.url = 'content.json';
    $scope.content = [];

    $scope.fetchContent = function () {

    };

    $scope.fetchContent();

});