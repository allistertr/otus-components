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
    '$mdDialog',
    'otus.components.DynamicTableSettingsFactory'
  ];

  function Controller($mdDialog, DynamicTableSettingsFactory) {
    var self = this;
    var _confirmAction;

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

    self.executCallback = function(element, callback) {
      $mdDialog.show(_confirmAction).then(function() {
        callback(element);
      })
      .catch(function() {
        
      });
    }

    function onInit() {
      _buildDialogs();

      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
      //header, flex, ordinationPriorityIndex
      .addHeader("Arquivo",30)
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

      //icon, tooltip, classButton, successMsg,
      //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
      .addColumnIconButton(
        "delete_forever", "", "md-primary", "",
        self.executCallback, false, false, true, true, true
      )
      
      .setElementsArray(self.filesArray)
      .setCallbackAfterChange(self.callbackAfterChange)
      .setTableUpdateFunction(self.updateDataTable)
      .setTitle("Lista de Arquivos")
      .setNumberFieldsAlignedLeft(5)
      .setFormatData("'Dia - 'dd/MM/yy")
      //.setSelectUnselectFunction()
      .setCheckbox(false)
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


      for (var i = 1; i < 22; i++) {
        var tmp = {
          file: {
            name: 'Resultados de exames - ' + i,
            type: 'CSV',
            length: (14 * i) + 'kbs',
            state: '',
            nd: self.date
          }
        }

        self.filesArray.push(tmp)
      }

      console.log("file-upload-onInit");
    }

    function _buildDialogs() {
      _confirmAction = $mdDialog.confirm()
        .title('Confirmar Ação:')
        .textContent('A ação será executada, deseja continuar?')
        .ariaLabel('Confirmação de Ação')
        .ok('Ok')
        .cancel('Cancelar');
    }
  }
}());
