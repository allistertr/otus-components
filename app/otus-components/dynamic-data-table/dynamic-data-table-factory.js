(function() {
    'use strict';
  
    angular
      .module('otus.components')
      .factory('otus.components.DynamicTableSettingsFactory', Factory);
  
    function Factory() {
      var self = this;
  
      /* Public methods */
      self.create = create;
  
      function create(name) {
        return new DynamicTableSettings(name);
      }
  
      return self;
    }
  
    function DynamicTableSettings(name) {
      var self = this;
      
      var _settings = {};

      elementsArray = [];
      elementsProperties = [];
      headers = [];
      callbackAfterChange;
      tableUpdateFunction;
      tableTitle;
      orderIndices = [];
      numberFieldsAlignedLeft = 10;
      flexArray = [];
      formatData;
      formatDataPropertiesArray = [];
      formatDataIndexArray = [];
      
      disableCheckbox=false;
      disableFilter=false;
      disableReorder=false;
      disablePagination=false;
      selectedColor;
      hoverColor;
      
      //new Functionality
      markupAttribute;
      selectionFunction;
      buttonFunctionArray = [];
      
      /* Public methods */
      self.getSettings = getSettings;
      self.toJson = toJson;
      self.setProperty = setProperty;
  
      function setProperty(){

      }

      function getName() {
        return _name;
      }
  
      function getSettings() {
        return _settings;
      }
  
      function toJson() {
        return JSON.stringify(_settings);
      }
    }
  }());
  