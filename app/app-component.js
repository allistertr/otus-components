(function () {
  'use strict';

  angular
    .module('otus.converter')
    .component('converterApp', {
      templateUrl: 'app/app-template.html',
      bindings: {
        teste: '<'
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
    
    self.files = [];
    self.updateDataTable;
    self.individualValidationFunction = individualValidationFunction;
    self.functionWhenSelectFiles = functionWhenSelectFiles;

    function onInit() {
      _buildDialogs();
      
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Arquivo', '', 'left')
        //property, formatType
        .addColumnProperty('name')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Tipo', '', 'center')
        //property, formatType
        .addColumnProperty('extension')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Tamanho', '', '')
        //property, formatType
        .addColumnProperty('displaySize')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Status', '', 'center')
        //property, formatType
        .addColumnProperty('state')

        //header, flex, align, ordinationPriorityIndex
        .addHeader('Data', '', '')
        //property, formatType
        .addColumnProperty('date', 'DATE')

        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'delete_forever', 'Deletar Registro', 'md-primary', 'Item excluido',
          self.removeElement, true, false, false, true, false
        )

        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'autorenew', '', 'md-primary', '',
          self.updateElement, false, false, true, false, false
        )

        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'delete_forever', '', 'md-primary', '',
          self.executCallback, false, false, true, true, true
        )

        //.setElementsArray(self.files)
        .setCallbackAfterChange(self.callbackAfterChange)
        //.setTableUpdateFunction(self.updateDataTable)
        .setTitle('Lista de Arquivos')
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
    }

    function individualValidationFunction(files) {
      // console.log('individualValidationFunction', files);
      return true;
    }

    function functionWhenSelectFiles(files) {
      // console.log('functionWhenSelectFiles', files);
      self.updateDataTable(files);
    }


    self.removeElement = function (element) {
      element.file.state = 'Excluido';
      return element;
    }

    self.updateElement = function (element) {
      element.file.state = 'Atualizado';
      return element;
    }

    self.callbackAfterChange = function () {

    }

    self.executCallback = function (element, callback) {
      $mdDialog.show(_confirmAction).then(function () {
        callback(element);
      })
        .catch(function () {

        });
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
