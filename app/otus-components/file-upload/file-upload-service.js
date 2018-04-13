(function () {
  'use strict';

  angular
    .module('otus.components')
    .service('otus.components.FileUploadService', service);

  service.$inject = [
    '$mdToast',
    'otus.components.FileUploadFactory'
  ];

  function service($mdToast, LotFactory) {
    var self = this;
    var hideDelayTime = 4000;

    self.validation = validation;
    self.validationExtention = validationExtention;

    function _showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(hideDelayTime)
      );
    }

    function processFile(file, extensionArray, individualValidationFunction) {
      files = [];
      var status = {
        fileAccepted: 0,
        fileRejected: 0
      };


    }

    function validationExtention(fileUpload, extensionArray) {
      var array = extensionArray || [];
      var isValid = array.length ? false : true;
      for (var i = 0; i < array.length; i++) {
        var extension = array[i];
        extension = extension.replace('.', '').replace(',', '').trim();
        if (extension === '*' || extension === fileUpload.extension) {
          isValid = true;
          break;
        }
      }
      return isValid;
    }

    function validation(fileUpload, individualValidationFunction) {
      var isValid = false;
      isValid = validationExtention(fileUpload);
      if (isValid && individualValidationFunction) {
        isValid = individualValidationFunction(fileUpload);
      }
      return isValid;
    }

    return self;
  }
}());
