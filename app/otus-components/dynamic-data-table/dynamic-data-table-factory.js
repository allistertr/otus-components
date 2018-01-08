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
    self.selectUnselectFunction;
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

    self.setElementsArray = setElementsArray;
    self.setCallbackAfterChange = setCallbackAfterChange;
    self.setTableUpdateFunction = setTableUpdateFunction;
    self.setTitle = setTitle;
    self.setNumberFieldsAlignedLeft = setNumberFieldsAlignedLeft;
    self.setFormatData = setFormatData;
    self.setSelectUnselectFunction = setSelectUnselectFunction;
    self.setCheckbox = setCheckbox;
    self.setFilter = setFilter;
    self.setReorder = setReorder;
    self.setPagination = setPagination;
    self.setSelectedColor = setSelectedColor;
    self.setHoverColor = setHoverColor;


    self.addHeader = addHeader;
    self.addColumnProperty = addColumnProperty;
    self.addColumnIconButton = addColumnIconButton;


    function setProperty() {

      return self;
    }


    function addHeader(header, flex, ordinationPriorityIndex) {
      self.headers.push(
        header || ""
      );

      if (flex === undefined) flex = "";

      self.flexArray.push(flex);

      if (ordinationPriorityIndex !== undefined) {
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

      if (formatType && formatType.toUpperCase && formatType.toUpperCase() === "DATE") {
        self.formatDataIndexArray.push(
          self.elementsProperties.length - 1
        );
      }
      _addEmptyHeaderIfNeed();
      return self;
    }

    function addColumnIconButton(
      icon, tooltip, classButton, successMsg, buttonFuntion,
      returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
    ) {

      self.elementsProperties.push(
        {
          iconButton: {
            icon: icon || "",
            tooltip: tooltip || "",
            classButton: classButton || "",
            successMsg: successMsg || "",
            buttonFuntion: buttonFuntion || function () { console.log('buttonFunction not implemented.') },
            returnsSuccess: returnsSuccess || false,
            renderElement: renderElement || false,
            renderGrid: renderGrid || false,
            removeElement: removeElement || false,
            receiveCallback: receiveCallback || false
          }
        }
      );
      _addEmptyHeaderIfNeed();
      return self;
    }

    function _addEmptyHeaderIfNeed() {
      if (self.elementsProperties.length > self.headers.length) {
        self.addHeader("");
      }

      return self;
    }

    function getName() {
      return _name;
    }

    function getSettings() {
      var ordenationArray = _ordenationPriorityIndexArray.sort(function compare(a, b) {
        if (a.ordenationPriorityIndex < b.ordenationPriorityIndex)
          return -1;
        if (a.ordenationPriorityIndex > b.ordenationPriorityIndex)
          return 1;
        return 0;
      });

      self.orderIndices = [];
      ordenationArray.forEach(function(ordenation){
        self.orderIndices.push(ordenation.headerIndex);
      })
      return self;
    }

    function setElementsArray(elementsArray) {
      self.elementsArray = elementsArray;
      return self;
    }

    function setCallbackAfterChange(callbackAfterChange) {
      self.callbackAfterChange = callbackAfterChange;
      return self;
    }

    function setTableUpdateFunction(tableUpdateFunction) {
      self.tableUpdateFunction = tableUpdateFunction;
      return self;
    }

    function setTitle(tableTitle) {
      self.tableTitle = tableTitle;
      return self;
    }

    function setNumberFieldsAlignedLeft(numberFieldsAlignedLeft) {
      self.numberFieldsAlignedLeft = numberFieldsAlignedLeft;
      return self;
    }

    function setFormatData(formatData) {
      self.formatData = formatData;
      return self;
    }

    function setSelectUnselectFunction(selectUnselectFunction) {
      self.selectUnselectFunction = selectUnselectFunction;
      return self;
    }

    function setSelectedColor(selectedColor) {
      self.selectedColor = selectedColor;
      return self;
    }

    function setHoverColor(hoverColor) {
      self.hoverColor = hoverColor;
      return self;
    }

    function setCheckbox(showCheckbox) {
      showCheckbox = showCheckbox ? true : false;
      self.disableCheckbox = !showCheckbox;
      return self;
    }

    function setFilter(showFilter) {
      showFilter = showFilter ? true : false;
      self.disableFilter = !showFilter;
      return self;
    }

    function setReorder(showReorder) {
      showReorder = showReorder ? true : false;
      self.disableReorder = !showReorder;
      return self;
    }

    function setPagination(showPagination) {
      showPagination = showPagination ? true : false;
      self.disablePagination = !showPagination;
      return self;
    }

    function toJson() {
      return JSON.stringify(_settings);
    }
  }
}());
