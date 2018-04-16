(function () {
  'use strict';

  angular
    .module('otus.components')
    .component('otusFileUpload', {
      templateUrl: 'app/otus-components/otus-file-upload/otus-file-upload-template.html',
      bindings: {
        files: '=',
        disable: '<',
        subtitle: '<',
        dropTitle: '<',
        acceptArray: '<',
        buttonTooltip: '<',
        multipleFiles: '<',
        extensionArray: '<',
        functionWhenSelectFiles: '=',
        individualValidationFunction: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    '$mdDialog',
    'otus.components.OtusFileUploadService',
    'otus.components.DynamicTableSettingsFactory'
  ];

  function Controller($mdDialog, FileUploadService, DynamicTableSettingsFactory) {
    var self = this;
    var _confirmAction;

    self.$onInit = onInit;
    self.accept = '';
    self.inputFile;

    self.upload = function(){
      self.inputFile.click();
    };
    
    function inputChange(event) {
      var filesArray = event.target.files;
      self.files = FileUploadService.processFiles(filesArray, self);
      if(self.functionWhenSelectFiles) self.functionWhenSelectFiles(self.files);
    }

    function onInit() {
      if (!self.dropTitle) self.dropTitle = 'Arraste e solte aqui o arquivo.';
      if (!self.subtitle) self.subtitle = 'ou clique';
      if (!self.buttonTooltip) self.buttonTooltip = 'Adicionar Arquivo';
      self.accept = FileUploadService.getAcceptByExtensionArray(self.extensionArray);
      self.inputFile = angular.element('<input id="fileInput" type="file" class="ng-hide">');
      self.inputFile.attr('accept', self.accept);
      self.inputFile.attr('multiple', self.multipleFiles);
      self.inputFile.on('change', function(e){
        inputChange(e);
      });
    }
  }
}());
