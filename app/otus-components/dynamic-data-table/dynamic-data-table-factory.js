(function () {
  'use strict';

  angular
    .module('otus.components')
    .factory('otus.components.DynamicTableSettingsFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return new DynamicTableSettings();
    }

    return self;
  }

  function DynamicTableSettings() {
    var self = this;

    var _settings = {};
    var _ordenationPriorityIndexArray = [
        //{headerIndex: 0, ordenationPriorityIndex: 1}
    ];

    self.elementsArray = [];
    self.elementsProperties = [];
    self.headers = [];
    self.callbackAfterChange;
    self.tableUpdateFunction;
    self.tableTitle;
    self.orderIndices = [];
    self.numberFieldsAlignedLeft = 10;
    self.flexArray = [];
    self.formatData;
    self.formatDataPropertiesArray = [];
    self.formatDataIndexArray = [];

    self.disableCheckbox = false;
    self.disableFilter = false;
    self.disableReorder = false;
    self.disablePagination = false;
    self.selectedColor;
    self.hoverColor;

    //new Functionality
    self.markupAttribute;
    self.selectionFunction;
    self.buttonFunctionArray = [];

    /* Public methods */
    self.getSettings = getSettings;
    self.toJson = toJson;

    self.addHeader = addHeader;
    self.addColumnProperty = addColumnProperty;
    self.addColumnIconButton = addColumnIconButton;

    function setProperty() {

      return self;
    }


    function addHeader(header, ordinationPriorityIndex) {
      self.headers.push(
        header || ""
      );
      
      if(ordinationPriorityIndex !== undefined){
        _ordenationPriorityIndexArray.push(
          {
            headerIndex: self.headers.length - 1,
            ordenationPriorityIndex: ordinationPriorityIndex
          }
        );
      }
      
      return self;
    }


    function addColumnProperty(property, formatType) {
      self.elementsProperties.push(
        property || ""
      );

      if(formatType && formatType.toUpperCase && formatType.toUpperCase() === "DATE"){
        self.formatDataIndexArray.push(
          self.elementsProperties.length
        );
      }
      _addEmptyHeaderIfNeed();
      return self;
    }
    
    function addColumnIconButton(
      icon, tooltip, classButton, successMsg, buttonFuntion,
      returnsSuccess, renderElement, renderGrid, receiveCallback
    ) {

      self.elementsProperties.push(
        {
          iconButton: {
            icon: icon || "",
            tooltip: tooltip || "",
            classButton: classButton || "",
            successMsg: successMsg || "",
            buttonFuntion: buttonFuntion || function(){ console.log('buttonFunction not implemented.') },
            returnsSuccess: returnsSuccess || false,
            renderElement: renderElement || false,
            renderGrid: renderGrid || false,
            receiveCallback: receiveCallback || false
          }
        }
      );
      _addEmptyHeaderIfNeed();
      return self;
    }

    function _addEmptyHeaderIfNeed(){
      if(self.elementsProperties.length > self.headers){
        self.headers.push("");
      }

      return self;
    }

    function getName() {
      return _name;
    }

    function getSettings() {
      
      return self;
    }


    self.elementsArray = [];
    self.callbackAfterChange;
    self.tableUpdateFunction;
    self.tableTitle;
    self.numberFieldsAlignedLeft = 10;
    self.flexArray = [];
    self.formatData;
    self.formatDataPropertiesArray = [];
    self.formatDataIndexArray = [];

    self.disableCheckbox = false;
    self.disableFilter = false;
    self.disableReorder = false;
    self.disablePagination = false;
    self.selectedColor;
    self.hoverColor;


    function toJson() {
      return JSON.stringify(_settings);
    }
  }
}());
