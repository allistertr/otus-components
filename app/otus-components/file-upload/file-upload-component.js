(function () {
  'use strict';

  angular
    .module('otus.components')
    .component('fileUpload', {
      templateUrl: 'app/otus-components/file-upload/file-upload-template.html',
      bindings: {
        teste: '<',
        title: '<',
        subtitle: '<',
        buttonTooltip: '<'

      },
      controller: Controller
    });

  Controller.$inject = [

  ];

  function Controller() {
    var self = this;

    self.$onInit = onInit;

    self.fileTitle = '';
    self.date = new Date();
    self.filesArray = []

    self.removeElement = function (element) {
      element.file.state = "Excluido";
      return element;
    }

    self.updateElement = function (element) {
      element.file.state = "Atualizado";
      return element;
    }

    self.callbackAfterChange = function () {

    }

    function onInit() {
      // var DynamicDataTable = {};
      
      // self.dynamicTableSettings = DynamicDataTable.createTableSettings()
      // .setProperty("file.name")
      // .setProperty("file.type")
      // .setProperty("file.length")
      // .setProperty("file.state")
      // .setProperty("file.nd")
      // .setProperty()
      // .setProperty()
      // .setProperty()
      
      
      
      if (!self.title) self.title = 'Arraste e solte aqui o arquivo.';
      if (!self.subtitle) self.subtitle = 'ou clique';
      if (!self.buttonTooltip) self.buttonTooltip = 'Adicionar Arquivo';


      for (var i = 1; i < 11; i++) {
        self.filesArray.push(
          {
            file: {
              name: 'Resultados de exames - ' + i,
              type: 'CSV',
              length: (14 * i) + 'kbs',
              state: '',
              nd: self.date
            }
          }
        )
      }

      console.log("file-upload-onInit");
    }
  }
}());
