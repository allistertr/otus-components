(function () {
    'use strict';
  
    angular
      .module('otus.conerter')
      .component('converterApp', {
        templateUrl: 'app/app-template.html',
        bindings: {
          teste: '<'
        },
        controller: Controller
      });
  
    Controller.$inject = [
      
    ];
  
    function Controller() {
      var self = this;
    
      self.$onInit = onInit;
      
      function onInit() {
        
      }
    }
  }());
  