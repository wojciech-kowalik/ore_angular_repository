
'use strict';

var vraDirectives = angular.module('vraDirectives', []);

vraDirectives.directive('ngModelBlur', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elm, attr, ngModelCtrl) {
      if (attr.type === 'radio' || attr.type === 'checkbox') { return; }

      elm.unbind('input').unbind('keydown').unbind('change');
      elm.bind('blur keydown', function (e) {
        if (e.type === 'keydown' && e.which !== 13) { return; }

        scope.$apply(function () {
          ngModelCtrl.$setViewValue(elm.val());
        });         
      });
    }
  };
});

