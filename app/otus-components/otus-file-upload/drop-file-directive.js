(function () {
  'use strict';

  angular
    .module('otus.components')
    .directive('dropFile', Directive);

  Directive.$inject = [
    '$mdToast',
    '$timeout',
    'otus.components.OtusFileUploadService'
  ];

  function Directive($mdToast, $timeout, FileUploadService) {
    return {
      scope: {
        files: '=',
        disable: '<',
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

        function FileDrop(e) {
          FileDragHover(e);
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropogation) e.stopPropogation();
          if(scope.disable) return;
          var files = e.target.files || e.dataTransfer.files;
          if(!scope.multipleFiles && files.length > 1){
            FileUploadService.showMsg('Selecione apenas um arquivo por vez.');
          } else {
            scope.files = FileUploadService.processFiles(files, scope);
            if(scope.functionWhenSelectFiles) scope.functionWhenSelectFiles(scope.files);
          }
        }

        function FileDragHover(e) {
          var currentElement = element[0];
          e.preventDefault();
          if(scope.disable) return;
          if (e.type == "dragover") {
            if (!currentElement.classList.contains('draghover')) currentElement.classList.add("draghover")
          } else {
            currentElement.classList.remove('draghover')
          }
        }
        element.on('dragleave', onDragleave);
        element.on('dragover', onDragover);
        element[0].ondrop = FileDrop;
      }
    };
  }

}());
