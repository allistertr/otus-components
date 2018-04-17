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
      self.inputFile.click();
    };

    // function _stopActions(e) {
    //   console.log(e)
    //   if (e.preventDefault) e.preventDefault();
    //   if (e.stopPropogation) e.stopPropogation();
    // };

    // function _stopActionElementAndChildren(element) {
    //   console.log('tttt', element)
    //   element.ondrop = _stopActions;
    //   element.addEventListener("drop",_stopActions);
    //   if(!element.children) return;
    //   console.log('children', element.children)
    //   console.log(element[0].children.length)
    //   for (var i = 0; i < element.children.length; i++) {
    //     console.log('children', element.children)
    //     var childElement = array[i];
    //     _stopActionElementAndChildren(childElement);
    //   }
    // };
    
    function inputChange(event) {
      var filesArray = event.target.files;
      self.files = FileUploadService.processFiles(filesArray, self);
      if(self.functionWhenSelectFiles) self.functionWhenSelectFiles(self.files);
    }

    function onInit() {
      if (!self.dropTitle) self.dropTitle = 'Arraste e solte o(s) arquivo(s).';
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
