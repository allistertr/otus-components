(function () {
  'use strict';

  angular
    .module('otus.components')
    .component('otusFileUpload', {
      templateUrl: 'app/otus-components/otus-file-upload/otus-file-upload-template.html',
      bindings: {
        files: '=',
        disable: '<',
        disableDrop: '<',
        subtitle: '<',
        dropTitle: '<',
        acceptArray: '<',
        buttonOnly: '<',
        buttonIcon: '<',
        buttonClass: '<',
        buttonTooltip: '<',
        multipleFiles: '<',
        extensionArray: '<',
        formatInfoLabel: '<',
        buttonTooltipDirection: '<',
        functionWhenSelectFiles: '=',
        individualValidationFunction: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    '$element',
    '$mdDialog',
    'otus.components.OtusFileUploadService',
    'otus.components.DynamicTableSettingsFactory'
  ];

  function Controller($element, $mdDialog, FileUploadService, DynamicTableSettingsFactory) {
    var self = this;
    var _confirmAction;

    self.$onInit = onInit;
    self.accept = '';
    self.inputFile;

    self.upload = function(){
      if(!self.disable) self.inputFile.click();
    };
    
    function inputChange(event) {
      var filesArray = event.target.files;
      self.files = FileUploadService.processFiles(filesArray, self);
      if(self.functionWhenSelectFiles) self.functionWhenSelectFiles(self.files);
    }

    function onInit() {
      if (self.dropTitle === undefined) self.dropTitle = 'Arraste e solte o(s) arquivo(s)';
      if (self.subtitle === undefined) self.subtitle = 'ou clique';
      if (self.formatInfoLabel === undefined) self.formatInfoLabel = 'Formatos suportados:';
      if (self.buttonTooltipDirection === undefined) self.buttonTooltipDirection = 'right';
      if (self.buttonTooltip === undefined) self.buttonTooltip = 'Selecionar Arquivo(s)';
      if (self.buttonClass === undefined) self.buttonClass = 'md-primary';
      if (self.buttonIcon === undefined) self.buttonIcon = 'file_upload';
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
