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
    'otus.components.DynamicTableSettingsFactory'
  ];

  function Controller(DynamicTableSettingsFactory) {
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
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
      //header, flex, ordinationPriorityIndex
      .addHeader("Arquivo")
      //property, formatType
      .addColumnProperty("file.name")

      //header, flex, ordinationPriorityIndex
      .addHeader("Tipo")
      //property, formatType
      .addColumnProperty("file.type")

      //header, flex, ordinationPriorityIndex
      .addHeader("Tamanho", "", 5)
      //property, formatType
      .addColumnProperty("file.length")

      //header, flex, ordinationPriorityIndex
      .addHeader("Status", "", 3)
      //property, formatType
      .addColumnProperty("file.state")

      //header, flex, ordinationPriorityIndex
      .addHeader("Data", "", 4)
      //property, formatType
      .addColumnProperty("file.nd", "DATE")

      //icon, tooltip, classButton, successMsg,
      //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
      .addColumnIconButton(
        "delete_forever", "Deletar Registro", "md-primary", "Item excluido",
        self.removeElement, true, false, false, true, false
      )
      
      //icon, tooltip, classButton, successMsg,
      //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
      .addColumnIconButton(
        "autorenew", "", "md-primary", "",
        self.updateElement, false, false, true, false, false
      )
      
      .setElementsArray(self.filesArray)
      .setCallbackAfterChange(self.callbackAfterChange)
      .setTableUpdateFunction(self.updateDataTable)
      .setTitle("Lista de Arquivos")
      .setNumberFieldsAlignedLeft(5)
      .setFormatData("MM/yyyy/-Dia-dd")
      //.setSelectUnselectFunction()
      .setCheckbox(true)
      .setFilter(true)
      .setReorder(true)
      .setPagination(true)
      .setSelectedColor()
      .setHoverColor()
    
      .getSettings();


      console.log(self.dynamicTableSettings)

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
