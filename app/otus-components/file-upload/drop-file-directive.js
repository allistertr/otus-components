(function () {
  'use strict';

  angular
    .module('otus.components')
    .directive('dropFile', Directive);

  Directive.$inject = [
    '$mdToast',
    '$timeout'
  ];

  function Directive($mdToast, $timeout) {
    return {
      scope: {
        changeParent: '<',
        propagateToChildren: '<'
      },
      restrict: 'A',
      link: function (scope, element, attr) {
        function onDragleave(e) {
          FileDragHover(e);
        };

        function onDragover(e) {
          FileDragHover(e);
        };

        function onDrop(e) {
          FileDrop(e);
        };


        function getRoundedAndUnitSize(size) {
          var multiplier = 1024;          
          var dividedSize = size;
          var unitIndex = 0;
          var unitList = [
            'Byte',
            'KB',
            'mb',
            'GB',
            'TB',
            'PB',
            'EB',
            'ZB',
            'YB'
          ];
          
          if(size > multiplier){
            while (dividedSize > multiplier) {
              unitIndex++;
              dividedSize = dividedSize / multiplier;
            }
          }
          
          return {
            size: dividedSize.toFixed(1),
            unit: unitList[unitIndex]
          };
        }

        function getNameAndExtension(fullName){
          var extensionIndex = fullName.lastIndexOf('.');
          var extension = extensionIndex > 0 ? fullName.substring(extensionIndex + 1) : undefined;
          var name = extensionIndex > 0 ? fileName.substring(0,28) : fullName;
          
          return {
            name: name,
            extension: extension
          };
        }

        function FileDrop(e) {
          FileDragHover(e);
          console.log(e)
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropogation) e.stopPropogation();

          // fetch FileList object
          var files = e.target.files || e.dataTransfer.files;
          console.log("files", files)
          // process all File objects
          for (var i = 0, f; f = files[i]; i++) {
            //ParseFile(f);
            console.log(f);
          }

        }

        scope.$$postDigest(function () {
          console.log('scope.propagateToChildren', scope.propagateToChildren)
          if (scope.propagateToChildren) {
            var children = element.children()

            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              console.log("child", { a: child })
            }
          }
        });


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
