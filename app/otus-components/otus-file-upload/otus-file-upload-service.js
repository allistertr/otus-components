(function () {
  'use strict';

  angular
    .module('otus.components')
    .service('otus.components.OtusFileUploadService', Service);

  Service.$inject = [
    '$mdToast',
    'otus.components.OtusFileUploadFactory'
  ];

  function Service($mdToast, FileUploadFactory) {
    var self = this;
    var hideDelayTime = 4000;

    self.showMsg = showMsg;
    self.getStatus = getStatus;
    self.validation = validation;
    self.validationExtention = validationExtention;
    self.processFiles = processFiles;
    self.getAcceptByExtensionArray = getAcceptByExtensionArray;

    function showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(hideDelayTime)
      );
    }

    function processFiles(filesArray, scope) {
      var status = {};
      var acceptedFiles = [];
      var fileUploadArray = [];
      
      var multipleFiles = scope.multipleFiles;
      var extensionArray = scope.extensionArray;
      var individualValidationFunction = scope.individualValidationFunction;

      for (var i = 0; i < filesArray.length; i++) {
        var file = filesArray[i];
        var fileUpload = FileUploadFactory.createWithFile(file);
        if(validation(fileUpload, scope)){
          fileUpload.isValid = true;
        }
        fileUploadArray.push(fileUpload);
      }
      status = getStatus(fileUploadArray);
      acceptedFiles = status.acceptedFiles;
      showMsg(status.msg || "Nehnum arquivo selecionado.");
      return acceptedFiles;
    }

    function getStatus(fileUploadArray) {
      var status = {
        fileAccepted: 0,
        fileRejected: 0,
        acceptedFiles: [],
        msg: ''
      };
      fileUploadArray.forEach(function(fileUpload) {
        if(fileUpload.isValid){
          status.fileAccepted++;
          status.acceptedFiles.push(fileUpload);
        } else {
          status.fileRejected++;
        }
      });
      if(status.fileAccepted) status.msg+= status.fileAccepted + ' arquivo(s) selecionado(s). \n';
      if(status.fileRejected) status.msg+= status.fileRejected + ' arquivo(s) rejeitado(s). \n';
      return status;
    }

    function validationExtention(fileUpload, scope) {
      var array = scope.extensionArray || [];
      var isValid = array.length ? false : true;
      for (var i = 0; i < array.length; i++) {
        var extension = array[i];
        extension = extension.replace('.', '').replace(',', '').trim();
        if (extension === '*' || extension.toUpperCase() === fileUpload.extension.toUpperCase()) {
          isValid = true;
          break;
        }
      }
      return isValid;
    }

    function validation(fileUpload, scope) {
      var isValid = false;
      isValid = validationExtention(fileUpload, scope);
      if (isValid && scope.individualValidationFunction) {
        isValid = scope.individualValidationFunction(fileUpload);
      }
      return isValid;
    }

    function getAcceptByExtensionArray(extensionArray) {
      var accept = '';
      var array = extensionArray || [];
      for (var i = 0; i < array.length; i++) {
        var extension = array[i];
        extension = extension.replace('.','').replace(',','').trim();
        accept = accept + (i ? ', .' : '.') + extension;
      }
      return accept.toLowerCase();
    }

    return self;
  }
}());
