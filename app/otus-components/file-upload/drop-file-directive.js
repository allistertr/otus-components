(function () {
  'use strict';

  angular
    .module('otus.components')
    .directive('dropFile', Directive);

  Directive.$inject = [
    '$mdToast',
    '$timeout',
    'otus.components.FileUploadFactory'
  ];

  function Directive($mdToast, $timeout, FileUploadFactory) {
    return {
      scope: {
        files: '=',
        multipleFiles: '<',
        extensionArray: '<',
        functionWhenSelectFiles: '=',
        individualValidationFunction: '=',
      },
      restrict: 'A',
      link: function (scope, element, attr) {
        var hideDelayTime = 5000;
        function onDragleave(e) {
          FileDragHover(e);
        };

        function onDragover(e) {
          FileDragHover(e);
        };

        function onDrop(e) {
          FileDrop(e);
        };

        function _showMsg(msg){
          $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .hideDelay(hideDelayTime)
          );
        }

        function FileDrop(e) {
          FileDragHover(e);
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropogation) e.stopPropogation();
          var files = e.target.files || e.dataTransfer.files;
          scope.files = [];
          var status = {
            fileAccepted: 0,
            fileRejected: 0
          };
          if(!scope.multipleFiles && files.length > 1){
            _showMsg('Selecione apenas um arquivo por vez.');
          } else {
            for (var i = 0, file; file = files[i]; i++) {
              var currentFile = FileUploadFactory.createWithFile(file);
              if(_validation(currentFile)){
                currentFile.isValid = true;
                console.log(currentFile);
                scope.files.push(currentFile);
                status.fileAccepted++;
              } else {
                status.fileRejected++;
              }
            }
            var msg = '';
            if(status.fileAccepted) msg+= status.fileAccepted + ' arquivo(s) selecionado(s). \n'
            if(status.fileRejected) msg+= status.fileRejected + ' arquivo(s) rejeitado(s). \n'
            _showMsg(msg);
            if(scope.functionWhenSelectFiles) scope.functionWhenSelectFiles(scope.files);
          }
        }

        function _validationExtention(currentFile) {
          var array = scope.extensionArray || [];
          var isValid = array.length ? false : true;
          for (var i = 0; i < array.length; i++) {
            var extension = array[i];
            extension = extension.replace('.','').replace(',','').trim();
            if(extension === '*' || extension === currentFile.extension){
              isValid = true;
              break;
            }
          }
          return isValid;
        }

        function _validation(currentFile) {
          var isValid = false;
          isValid = _validationExtention(currentFile);
          if(isValid && scope.individualValidationFunction){
            isValid = scope.individualValidationFunction(currentFile);
          }
          return isValid;
        }

        function FileDragHover(e) {
          var currentElement = element[0];
          e.preventDefault();
          if (e.type == "dragover") {
            if (!currentElement.classList.contains('draghover')) currentElement.classList.add("draghover")
          } else {
            currentElement.classList.remove('draghover')
          }
        }
        element.on('dragleave', onDragleave);
        element.on('dragover', onDragover);
        //element.bind('drop', FileDrop);
        element[0].ondrop = FileDrop;
      }
    };
  }

}());
