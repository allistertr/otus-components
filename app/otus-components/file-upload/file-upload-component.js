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
        acceptArray: '<',
        buttonTooltip: '<',
        multipleFiles: '<',
        extensionArray: '<'
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

    self.accept = '';
    self.fileTitle = '';
    self.date = new Date();
    self.updateDataTable;
    
    self.inputFile;

    self.upload = function(){
      console.log('eeee')
      self.inputFile.click();
    };

    self.filesArray = [];
    
    self.files = [];
    self.multipleFiles = true;
    self.individualValidationFunction = individualValidationFunction;
    self.functionWhenSelectFiles = functionWhenSelectFiles;

    function inputChange(event) {
      console.log(event.target.files);
    }

    function individualValidationFunction(files){
      console.log('individualValidationFunction', files);
      return true;
    }

    function functionWhenSelectFiles(files){
      console.log('functionWhenSelectFiles', files);

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

    self.executCallback = function(element, callback) {
      $mdDialog.show(_confirmAction).then(function() {
        callback(element);
      })
      .catch(function() {
        
      });
    }

    function onInit() {
      self.extensionArray = ['sys'];//'gif','jpg','jpeg','png','doc','docx'];
      
      var array = self.extensionArray || [];
      for (var i = 0; i < array.length; i++) {
        var extension = array[i];
        extension = extension.replace('.','').replace(',','').trim();
        self.accept = self.accept + (i ? ', .' : '.') + extension;
      } 
      console.log(self.accept)

      //self.accept=".gif,.jpg,.jpeg,.png,.doc,.docx";

      self.multipleFiles = true;

      self.inputFile = angular.element('<input id="fileInput" type="file" class="ng-hide">');
      self.inputFile.attr('accept', self.accept);
      self.inputFile.attr('multiple', self.multipleFiles);
      self.inputFile.on('change', e => inputChange(e));

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

      console.log('file-upload-onInit');
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
