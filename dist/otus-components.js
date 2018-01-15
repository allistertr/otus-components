(function () {
  'use strict';

  angular.module('otus.components', []);
})();
(function () {
  'use strict';

  angular.module('otus.components').component('dynamicDataTable', {
    template: '<style>\n        .my-border {\n          border: 1px solid blue;\n        }\n      \n        .dynamic-structure {\n          margin: 16px;\n        }\n      \n        .dynamic-table-body-row:focus,\n        .dynamic-table-header-column:focus {\n          outline: none;\n        }\n      \n        .dynamic-table-body-row,\n        .dynamic-table-header-column {\n          cursor: pointer;\n        }\n      \n        .dynamic-table-row-selected {\n          background-color: #F5F5F5;\n        }\n      \n        .dynamic-table md-checkbox {\n          position: relative;\n          top: 7.5px;\n        }\n      \n        .dynamic-table md-icon.dynamic-arrow-icon,\n        .dynamic-table md-icon.dynamic-arrow-icon-inverse {\n          -webkit-transition-duration: 0.5s;\n          -moz-transition-duration: 0.5s;\n          -o-transition-duration: 0.5s;\n          transition-duration: 0.5s;\n      \n          -webkit-transition-property: -webkit-transform;\n          -moz-transition-property: -moz-transform;\n          -o-transition-property: -o-transform;\n          transition-property: transform;\n        }\n      \n        .dynamic-table md-icon.dynamic-arrow-icon {\n          -moz-transform: rotate(0deg);\n          -webkit-transform: rotate(0deg);\n          -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n        }\n      \n        .dynamic-table md-icon.dynamic-arrow-icon-inverse {\n          -moz-transform: rotate(180deg);\n          -webkit-transform: rotate(180deg);\n          -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n        }\n      \n        .dynamic-table-body-column,\n        .dynamic-table-header-column {\n          padding: 4px 10px;\n        }\n      \n        .dynamic-table-body-row,\n        .dynamic-table-header-row {\n          border-bottom: 1px solid #E0DFDF;\n        }\n      \n        .dynamic-table-column-first {\n          padding-left: 16px;\n      \n        }\n      \n        .dynamic-table-column-last {\n          padding-right: 16px;\n        }\n      \n      \n      \n        .dynamic-table-column-left {\n          text-align: left;\n        }\n      \n        .dynamic-table-column-right {\n          text-align: right;\n        }\n\n        .dynamic-table-column-center {\n          text-align: center;\n        }\n      \n        .dynamic-table-expand-filter {\n          margin-top: 20px;\n        }\n      \n      \n        .dynamic-table-animated {\n          -moz-transition: transform 0.5s;\n          -webkit-transition: transform 0.5s;\n          -ms-transition: transform 0.5s;\n          -o-transition: transform 0.5s;\n          transition: transform 0.5s;\n          transition: .2s all;\n        }\n      \n        .dynamic-table-animated.ng-enter-active {\n          /*-moz-transform: scale(0.1);\n          -webkit-transform: scale(0.1);\n          -ms-transform: scale(0.1);\n          -o-transform: scale(0.1);\n          transform: scale(0.1); */\n          opacity: 1;\n        }\n      \n        .dynamic-table-animated.ng-enter {\n          /*-moz-transform: scale(0.1);\n          -webkit-transform: scale(0.1);\n          -ms-transform: scale(0.1);\n          -o-transform: scale(0.1);\n          transform: scale(0.1); */\n          opacity: 0;\n        }\n      \n        .dynamic-table-animated.ng-leave {\n          transition: 0.5s linear all;\n          opacity: 1;\n        }\n      \n        .dynamic-table-animated.ng-leave.ng-leave-active {\n          opacity: 0;\n        }\n      </style><md-whiteframe class="md-whiteframe-1dp dynamic-structure" layout="column" flex><div ng-if="$ctrl.tableTitle"><md-subheader class="md-no-sticky moment-type-title backgroud-color-default left-alignment">{{$ctrl.tableTitle}}</md-subheader></div><div ng-if="!$ctrl.tableTitle && !$ctrl.disableFilter" class="dynamic-table-expand-filter"></div><div ng-if="!$ctrl.disableFilter" layout="row" layout-align="center center" flex><div layout="row" layout-margin flex><md-input-container class="remove-errors-spacer" flex><input type="text" flex placeholder="Filtro de busca" ng-model="$ctrl.filter" ng-change="$ctrl.filterRows()" ng-model-options="{ allowInvalid: true, debounce: 500 }"></md-input-container></div><div ng-if="(!$ctrl.disablePagination && $ctrl.filter.length && $ctrl.viewPerPage)" style="padding-right:15px" class="dynamic-table-animated"><md-checkbox flex style="margin:0;" aria-label="Filtrar todos" class="md-primary" ng-checked="$ctrl.filterAll" ng-click="$ctrl.filterAllChanged()"><span class="md-body-1">Filtrar Todos</span></md-checkbox><md-tooltip md-direction="top">Exibe todos os registros encontrados</md-tooltip></div></div><div ng-if="$ctrl.error.isError"><h1>{{$ctrl.error.msg}}</h1></div><div ng-if="!$ctrl.error.isError" class="dynamic-table" flex><div ng-mouseenter="$ctrl.leaveFocus()" class="dynamic-table-header" layout="row" flex><div class="dynamic-table-header-row" layout="row" layout-align="start center" flex><div style="padding-left:15px" ng-if="!$ctrl.disableCheckbox" layout="column" flex="5" layout-align="center center"><md-checkbox flex aria-label="Selecionar Todos os Registros" class="md-primary" ng-checked="$ctrl.selectedItemCounter === $ctrl.table.rows.length" md-indeterminate="$ctrl.selectedItemCounter !== $ctrl.table.rows.length && $ctrl.selectedItemCounter>0" ng-click="$ctrl.selectDeselectAllRows()"></md-checkbox><md-tooltip md-direction="top">{{$ctrl.selectedItemCounter === $ctrl.table.rows.length ? \'Deseleciona Todos\' : \'Seleciona Todos\'}}</md-tooltip></div><div ng-if="$ctrl.disableCheckbox" style="padding-top:40px"></div><div class="{{\'dynamic-table-header-column \' + $ctrl.getColumnPositionClass($index, $ctrl.table.headers)}}" ng-repeat="header in $ctrl.table.headers track by $index" flex="{{$ctrl.getFlex($index)}}" ng-click="$ctrl.changeOrder($index)">{{header}}<md-icon ng-if="$ctrl.orderQuery === \'column\' + $index + \'.orderValue\'" ng-class="$ctrl.getOrderIcon()" md-font-set="material-icons">arrow_drop_up</md-icon></div></div></div><div class="dynamic-table-body" layout="column" flex id="dynamic-body"><div class="dynamic-table-body-row {{($ctrl.disablePagination || !$ctrl.viewPerPage || $ctrl.filterAll) ? \' dynamic-table-animated \' : \'\'}}" layout="row" layout-align="start center" flex ng-repeat="row in $ctrl.table.rows | orderBy:$ctrl.orderQuery:$ctrl.orderInverse" ng-click="$ctrl.selectDeselectRow(row)" name="bodyRow{{row.index}}" id="bodyRow{{row.index}}" ng-mouseenter="$ctrl.mouseEnter(row)" ng-mouseleave="$ctrl.mouseLeave(row)" ng-style="row.style"><div style="padding-left:15px" ng-if="!$ctrl.disableCheckbox" layout="column" flex="5" layout-align="center center"><md-checkbox ng-checked="row.selected" aria-label="Checkbox registro da linha {{row.index}}" class="md-primary"></md-checkbox></div><div ng-if="$ctrl.disableCheckbox" style="padding-top:40px"></div><div class="{{\'dynamic-table-body-column \' + $ctrl.getColumnPositionClass(column.index,row.columns)}}" ng-repeat="column in row.columns" flex="{{$ctrl.getFlex(column.index)}}"><span ng-if="!column.specialField" class="md-body-1">{{column.value}}</span><md-button ng-if="column.specialField && column.specialField.iconButton" class="md-icon-button {{column.specialField.iconButton.classButton}}" ng-click="$ctrl.iconButtonClick(column.specialField.iconButton, row)"><md-tooltip ng-if="column.specialField.iconButton.tooltip">{{column.specialField.iconButton.tooltip}}</md-tooltip><md-icon md-font-set="material-icons">{{column.specialField.iconButton.icon}}</md-icon></md-button></div></div></div><div ng-if="!$ctrl.disablePagination" ng-mouseenter="$ctrl.leaveFocus()" class="dynamic-pagination" layout="row" layout-align="start center" flex><div><div layout="row" class="md-body-1" layout-margin><md-button class="md-accent" flex ng-click="$ctrl.viewPerPageChanged()" ng-disabled="$ctrl.filterAll"><md-tooltip>{{$ctrl.viewPerPage ? \'Exibir todos os Registros: Desabilita Paginação\' : \'Exibir Registros por Página: Habilita Paginação\'}}</md-tooltip><span class="md-body-1">{{$ctrl.viewPerPage ? \'Exibir Todos\' : \'Exibir por Página\'}}</span></md-button></div></div><div layout="row" layout-align="end center" layout-padding flex ng-if="$ctrl.viewPerPage && !$ctrl.filterAll"><div><span class="md-body-1">Linhas por página:</span></div><div><md-select ng-model="$ctrl.rowPerPageDefault" aria-label="Página" style="margin:0" ng-change="$ctrl.rowPerPageChange()"><md-option ng-repeat="rowPerPage in $ctrl.rowsPerPageArray" value="{{rowPerPage}}"><span class="md-body-1">{{rowPerPage}}</span></md-option></md-select></div><div><span class="md-body-1">{{$ctrl.table.textPage}}</span></div><div><md-button class="md-icon-button" aria-label="Página Anterior" ng-disabled="!$ctrl.getIsPreviousPage()" ng-click="$ctrl.previousPage()"><md-tooltip>Página Anterior</md-tooltip><md-icon md-font-set="material-icons">keyboard_arrow_left</md-icon></md-button></div><div><md-button class="md-icon-button" aria-label="Página Seguinte" ng-disabled="!$ctrl.getIsNextPage()" ng-click="$ctrl.nextPage()"><md-tooltip>Próxima Página</md-tooltip><md-icon md-font-set="material-icons">keyboard_arrow_right</md-icon></md-button></div></div></div></div></md-whiteframe>',
    bindings: {
      headers: '<',
      elementsArray: '=?',
      elementsProperties: '<',
      callbackAfterChange: '=?',
      tableUpdateFunction: '=?',

      formatData: '<',
      formatDataIndexArray: '<',
      formatDataPropertiesArray: '<',

      tableTitle: '<',
      alignArray: '<',
      flexArray: '<',
      orderIndices: '<',
      numberFieldsAlignedLeft: '<',

      selectedColor: '<',
      hoverColor: '<',

      disableCheckbox: '<',
      disableReorder: '<',
      disableFilter: '<',
      disablePagination: '<',

      rowsPerPageArray: '<',
      rowPerPageDefault: '<',

      hideDelayTime: '<',

      dynamicTableSettings: '='
    },
    controller: Controller
  });

  Controller.$inject = ['$filter', '$mdToast'];

  function Controller($filter, $mdToast) {
    var self = this;

    self.selectedItemCounter = 0;

    self.table;

    self.defaultAlign = 'left';

    self.orderQuery;
    self.orderInverse = false;
    self.error;

    self.$onInit = onInit;

    self.changeOrder = changeOrder;
    self.creacteTable = creacteTable;
    self.selectDeselectRow = selectDeselectRow;
    self.selectDeselectAllRows = selectDeselectAllRows;
    self.runCallbackOnChange = runCallbackOnChange;
    self.getColumnPositionClass = getColumnPositionClass;
    self.getFlex = getFlex;
    self.filterRows = filterRows;

    self.rowPerPageChange = rowPerPageChange;
    self.pagesChage = pagesChage;
    self.setCurrentPageText = setCurrentPageText;
    self.getIsNextPage = getIsNextPage;
    self.getIsPreviousPage = getIsPreviousPage;

    self.mouseEnter = mouseEnter;
    self.mouseLeave = mouseLeave;
    self.changeRowStyle = changeRowStyle;
    self.leaveFocus = leaveFocus;

    self.nextPage = nextPage;
    self.previousPage = previousPage;

    self.iconButtonClick = iconButtonClick;

    self.disableAnimation = false;

    self.filter = '';
    self.filterAll = false;
    self.filterAllChanged = filterAllChanged;

    self.viewPerPage = true;
    self.viewPerPageChanged = viewPerPageChanged;

    self.currentRowOnHover;

    function onInit() {
      _initializeDefaultValues();
      _setOrderQuery();

      self.tableUpdateFunction = _refreshGrid;

      creacteTable();
    }

    function _initializeDefaultValues() {
      if (self.dynamicTableSettings) {
        var _settings = self.dynamicTableSettings;
        _settings = _settings.getSettings ? _settings.getSettings() : _settings;
        console.log(_settings);

        self.headers = _settings.headers;
        self.elementsArray = _settings.elementsArray;
        self.elementsProperties = _settings.elementsProperties;
        self.callbackAfterChange = _settings.callbackAfterChange;
        self.tableUpdateFunction = _settings.tableUpdateFunction;
        self.formatData = _settings.formatData;
        self.formatDataIndexArray = _settings.formatDataIndexArray;
        self.formatDataPropertiesArray = _settings.formatDataPropertiesArray;
        self.tableTitle = _settings.tableTitle;
        self.flexArray = _settings.flexArray;
        self.alignArray = _settings.alignArray;
        self.orderIndices = _settings.orderIndices;
        self.numberFieldsAlignedLeft = _settings.numberFieldsAlignedLeft;
        self.selectedColor = _settings.selectedColor;
        self.hoverColor = _settings.hoverColor;
        self.disableCheckbox = _settings.disableCheckbox;
        self.disableReorder = _settings.disableReorder;
        self.disableFilter = _settings.disableFilter;
        self.disablePagination = _settings.disablePagination;
        self.rowsPerPageArray = _settings.rowsPerPageArray;
        self.rowPerPageDefault = _settings.rowPerPageDefault;
        self.hideDelayTime = _settings.hideDelayTime;
      }

      // if(!self.numberFieldsAlignedLeft) self.numberFieldsAlignedLeft = 1;

      if (!self.flexArray) self.flexArray = [];
      if (!self.alignArray) self.alignArray = [];
      if (!self.hoverColor) self.hoverColor = '#EEEEEE';
      if (!self.selectedColor) self.selectedColor = '#F5F5F5';
      if (!self.rowsPerPageArray) self.rowsPerPageArray = [10, 25, 50, 100, 250, 500, 1000];
      if (!self.rowPerPageDefault) self.rowPerPageDefault = self.rowsPerPageArray.length >= 2 ? self.rowsPerPageArray[2] : self.rowsPerPageArray[0];

      if (!self.formatData) self.formatData = 'dd/MM/yyyy';
      if (!self.formatDataIndexArray) self.formatDataIndexArray = [];
      if (!self.formatDataPropertiesArray) self.formatDataPropertiesArray = [];
      if (!self.hideDelayTime) self.hideDelayTime = 3000;
      if (!self.callbackAfterChange) self.callbackAfterChange = function () {};

      _alignArrayPopulate();

      self.error = {
        isError: false,
        msg: "Devem ser informadas a mesma quantidade de valores e de cabeçalhos."
      };
    }

    function _resetSelectedItemCounter() {
      self.selectedItemCounter = 0;

      self.table.rows.forEach(function (row) {
        if (row.selected) {
          self.selectedItemCounter++;
        }
        changeRowStyle(row);
      });
    }

    function _getAlignAccepted(align) {
      var avaliableAlignArray = ['right', 'left', 'center'];
      var alignAccepted = align;
      var alignmentAccepted = false;

      if (typeof align !== 'string') alignAccepted = '';

      for (var i = 0; i < avaliableAlignArray.length; i++) {
        var avaliableAlign = avaliableAlignArray[i];
        if (alignAccepted.toLowerCase().trim() === avaliableAlign) {
          alignAccepted = avaliableAlign;
          alignmentAccepted = true;
          break;
        }
      }

      if (!alignmentAccepted) alignAccepted = self.defaultAlign;

      return alignAccepted;
    }

    function _alignArrayPopulate() {
      var newAlignArray = [];

      if (self.alignArray && self.alignArray.length) {
        self.alignArray.forEach(function (align) {
          newAlignArray.push(_getAlignAccepted(align));
        });
      } else if (self.numberFieldsAlignedLeft) {
        self.elementsProperties.forEach(function (element, index) {
          var tmpAlign = index < self.numberFieldsAlignedLeft ? 'left' : 'right';
          newAlignArray.push(tmpAlign);
        });
      }

      self.elementsProperties.forEach(function (element, index) {
        if (newAlignArray[index] === undefined) {
          newAlignArray.push(self.defaultAlign);
        }
      });

      self.alignArray = newAlignArray;
    }

    function _refreshGrid(newElementsArray) {
      self.elementsArray = newElementsArray || self.elementsArray;
      self.selectedItemCounter = 0;
      self.creacteTable();
    }

    function _havePagination() {
      return !self.disablePagination && self.viewPerPage && !self.filterAll;
    }

    function _showMsg(msg) {
      $mdToast.show($mdToast.simple().textContent(msg).hideDelay(self.hideDelayTime));
    }

    function filterAllChanged(value) {
      var newValue = value !== undefined ? value : !self.filterAll;

      self.filterAll = newValue;

      filterRows();
    }

    function viewPerPageChanged(value) {
      var newValue = value !== undefined ? value : !self.viewPerPage;

      self.viewPerPage = newValue;

      filterRows();
    }

    function leaveFocus() {
      if (self.currentRowOnHover) {
        self.changeRowStyle(self.currentRowOnHover);
        self.currentRowOnHover = undefined;
      }
    }

    function mouseEnter(row) {
      if (!self.currentRowOnHover || self.currentRowOnHover.index !== row.index) {
        if (self.currentRowOnHover) self.changeRowStyle(self.currentRowOnHover);
        self.currentRowOnHover = row;
        self.changeRowStyle(row, true);
      }
    }

    function mouseLeave(row) {
      //self.changeRowStyle(row);
    }

    function changeRowStyle(row, isHover) {
      if (isHover) {
        row.style = row.styleHover;
      } else {
        if (row.selected) {
          row.style = row.styleSelect;
        } else {
          row.style = {};
        }
      }
    }

    function filterRows() {
      if (self.filter.length) {
        self.table.filteredRows = $filter('filter')(self.table.fullRows, self.filter);

        var count = self.table.filteredRows.length;
        var msg = '';
        if (!count) {
          msg = 'Nenhum registro foi encontrado.';
        } else if (count === 1) {
          msg = count + ' Registro foi encontrado.';
        } else {
          msg = count + ' Registros foram encontrados.';
        }
        _showMsg(msg);
      } else {
        self.table.filteredRows = self.table.fullRows;
        self.filterAll = false;
      }

      self.table.currentPageRows = self.table.filteredRows;
      self.table.currentPage = 1;
      pagesChage();
    }

    function _changeDisplayRows() {
      if (_havePagination()) {
        self.table.currentPageRows = self.table.filteredRows.slice(self.table.startPage, self.table.endPage + 1);
      }

      self.table.rows = self.table.currentPageRows;

      self.selectedItemCounter = self.table.rows.filter(function (row) {
        return row.selected;
      }).length;
    }

    function getFlex(index) {
      var value = self.flexArray[index];

      if (value !== '') {
        value = Number(value);

        if (value === NaN) {
          value = '';
        }
      }
      return value;
    }

    function getColumnPositionClass(index, array) {
      var retClass = '';
      if (array === undefined) {
        array = [];
      }

      retClass = retClass + ' dynamic-table-column-' + self.alignArray[index] || self.defaultAlign + ' ';

      if (index === 0 && self.disableCheckbox) {
        retClass = retClass + ' dynamic-table-column-first ';
      }

      if (index + 1 === array.length) {
        retClass = retClass + ' dynamic-table-column-last ';
      }

      return retClass;
    }

    function runCallbackOnChange(row, type) {
      var change = {
        type: type,
        element: row.ref
      };

      if (change.type === 'selected' || change.type === 'deselected') {}

      self.callbackAfterChange(change);
    }

    self.getOrderIcon = function () {
      return self.orderInverse ? 'dynamic-arrow-icon-inverse' : 'dynamic-arrow-icon';
    };

    self.verifyOrderIcon = function (index) {
      return self.orderQuery === 'column' + $index + '.value' ? true : false;
    };

    function rowPerPageChange() {
      self.table.currentPage = 1;
      pagesChage();
    }

    function nextPage() {
      self.disableAnimation = true;
      self.table.currentPage++;
      pagesChage();
    }

    function previousPage() {
      self.disableAnimation = true;
      self.table.currentPage--;
      pagesChage();
    }

    function pagesChage() {
      if (self.table.currentPage === 1) {
        self.table.startPage = 0;
      } else {
        self.table.startPage = (self.table.currentPage - 1) * self.rowPerPageDefault;
      }

      var tempEnd = self.table.currentPage * self.rowPerPageDefault - 1;

      if (tempEnd >= length - 1) {
        self.table.endPage = tempEnd;
      } else {
        self.table.endPage = self.table.filteredRows.length - 1;
      }

      setCurrentPageText();
      _changeDisplayRows();
    }

    function setCurrentPageText() {
      var tempEnd = self.table.endPage + 1 > self.table.filteredRows.length ? self.table.filteredRows.length : self.table.endPage + 1;
      self.table.textPage = "" + (self.table.startPage + 1) + "-" + tempEnd + " de " + self.table.filteredRows.length;
    }

    function getIsNextPage() {
      return _haveThisPage(self.table.currentPage + 1);
    }

    function getIsPreviousPage() {
      return self.table.currentPage > 1 ? true : false;
    }

    function _haveThisPage(page) {
      var havePage = false;
      if (page > 0) {
        var previousPage = page - 1;
        if (page === 1) {
          havePage = true;
        } else {
          if (previousPage * self.rowPerPageDefault < self.table.filteredRows.length) {
            havePage = true;
          }
        }
      }
      return havePage;
    }

    function creacteTable() {
      self.table = {
        headers: self.headers,
        rows: [],
        fullRows: [],
        filteredRows: [],
        currentPageRows: [],
        currentPage: 1,
        startPage: 0,
        endPage: self.rowPerPageDefault + 1,
        textPage: ""
      };

      self.elementsArray.forEach(function (element, index) {
        self.table.fullRows.push(_createRow(element, index));
      }, this);

      self.table.filteredRows = self.table.fullRows;
      filterRows();
      pagesChage();
    }

    function changeOrder(index) {
      var columnName = "column" + index;

      if (columnName + '.orderValue' === self.orderQuery) {
        self.orderInverse = !self.orderInverse;
      } else {
        self.orderInverse = false;
        _setOrderQuery(columnName);
      }
    }

    function _setOrderQuery(columnName) {
      if (columnName) {
        self.orderQuery = columnName + '.orderValue';
      } else {
        self.orderQuery = [];
        if (self.orderIndices) {
          self.orderIndices.forEach(function (orderIndex) {
            self.orderQuery.push('column' + orderIndex + '.orderValue');
          });
        }
      }
    }

    function _getObjectProperty(object, property) {
      return object[property];
    }

    function _getValueFormated(value, property, index) {
      if (self.formatDataIndexArray.filter(function (val) {
        return Number(val) === index;
      }).length) {
        value = $filter('date')(value, self.formatData);
      } else if (self.formatDataPropertiesArray.filter(function (prop) {
        return prop === property;
      }).length) {
        value = $filter('date')(value, self.formatData);
      }

      return value;
    }

    function _getValueFromElement(element, compositeProperty, index, formatValue) {
      var propertyArray = compositeProperty.split('.');
      var value = undefined;
      var valueReturned;

      propertyArray.forEach(function (property) {
        if (value === undefined) {
          value = _getObjectProperty(element, property);
        } else {
          value = _getObjectProperty(value, property);
        }
      }, this);

      valueReturned = value;

      if (formatValue) {
        valueReturned = _getValueFormated(value, compositeProperty, index);
      }

      return valueReturned;
    }

    function clearError() {
      self.error.isError = false;
      self.error.msg = '';
    }

    function setError(msg) {
      self.error.isError = true;
      self.error.msg = msg;
    }

    function selectDeselectAllRows() {
      var deselect = self.selectedItemCounter === self.table.rows.length;

      self.table.rows.forEach(function (row) {
        if (deselect) {
          _deselectRow(row);
        } else {
          _selectRow(row);
        }
        changeRowStyle(row);
      }, this);
    }

    function selectDeselectRow(row) {
      if (!row.specialFieldClicked) {
        if (row.selected) {
          _deselectRow(row);
        } else {
          _selectRow(row);
        }
        changeRowStyle(row);
      }
      row.specialFieldClicked = false;
    }

    function _selectRow(row) {
      if (!row.selected) {
        row.selected = true;
        self.selectedItemCounter++;
        self.runCallbackOnChange(row, 'select');
      }
    }
    function _deselectRow(row) {
      if (row.selected) {
        row.selected = false;
        self.selectedItemCounter--;
        self.runCallbackOnChange(row, 'deselect');
      }
    }

    function _createRow(element, index) {
      var row = {
        type: "dynamicDataTableRow",
        ref: element,
        columns: [],
        index: index,
        selected: false,
        hover: false,
        styleSelect: { 'background-color': self.selectedColor },
        styleHover: { 'background-color': self.hoverColor },
        style: {},
        specialFieldClicked: false
      };

      self.elementsProperties.forEach(function (elementProperty, index) {
        var specialField = undefined;

        if (typeof elementProperty === "string") {
          var value = _getValueFromElement(element, elementProperty, index, true);
          var orderValue = _getValueFromElement(element, elementProperty, index);
        } else {
          specialField = _specialFieldConstruction(elementProperty);
        }

        var column = _createColumn(row, value, orderValue, index, specialField);

        row.columns.push(column);
        row[column.name] = column;
      }, this);

      return row;
    }

    function _createColumn(row, value, orderValue, index, specialField) {
      var column = {
        type: "dynamicDataTableColumn",
        value: value,
        orderValue: orderValue,
        index: index,
        name: "column" + index,
        specialField: specialField
      };

      return column;
    }

    function _specialFieldConstruction(elementProperty) {
      var specialFieldStructure = undefined;
      var iconButton = elementProperty.iconButton;

      if (iconButton) {
        specialFieldStructure = {
          iconButton: {
            icon: iconButton.icon,
            tooltip: iconButton.tooltip || "",
            classButton: iconButton.classButton || "",
            successMsg: iconButton.successMsg || "",
            buttonFuntion: iconButton.buttonFuntion,
            returnsSuccess: iconButton.returnsSuccess || false,
            renderElement: iconButton.renderElement || false,
            renderGrid: iconButton.renderGrid || false,
            removeElement: iconButton.removeElement || false,
            receiveCallback: iconButton.receiveCallback || false
          }
        };
      }

      return specialFieldStructure;
    }

    function _refreshGridAndKeepCurrentPage() {
      var _currentPage = self.table.currentPage;
      _refreshGrid();
      if (_havePagination()) {
        for (var i = _currentPage; i >= 1; i--) {
          if (_haveThisPage(i)) {
            self.table.currentPage = i;
            pagesChage();
            break;
          }
        }
      }
    }

    function _removeRow(row) {
      self.elementsArray.splice(row.index, 1);
    }

    function _updateRow(element, row) {
      var updatedRow = _createRow(element, row.index);

      row.ref = updatedRow.ref;
      row.columns = updatedRow.columns;
    }

    function _isValidElement(element) {
      var isvalid = false;
      if (element && self.elementsProperties.length) {
        for (var i = 0; i < self.elementsProperties.length; i++) {
          var fullProperty = self.elementsProperties[i];
          if (typeof fullProperty === "string") {
            var property = fullProperty.split(".")[0];
            if (element[property]) {
              isvalid = true;
              break;
            }
          }
        }
      }
      return isvalid;
    }

    function iconButtonClick(structure, row) {
      row.specialFieldClicked = true;

      var _actionFuntion = function (returnedElement) {
        if (!_isValidElement(returnedElement)) {
          returnedElement = self.table.fullRows[row.index];
        }

        if (structure.renderElement && returnedElement && !structure.removeElement) {
          _updateRow(returnedElement, row);
        }

        if (structure.removeElement) {
          _removeRow(row);
          _refreshGridAndKeepCurrentPage();
        }

        if (structure.renderGrid && !structure.removeElement) {
          _refreshGridAndKeepCurrentPage();
        }

        if (structure.successMsg) {
          _showMsg(structure.successMsg);
        }
      };

      if (structure.buttonFuntion) {
        var returnedElement = undefined;
        if (structure.receiveCallback) {
          structure.buttonFuntion(row.ref, _actionFuntion);
        } else {
          if (structure.returnsSuccess) {
            if (structure.buttonFuntion(row.ref)) _actionFuntion();
          } else {
            _actionFuntion(structure.buttonFuntion(row.ref));
          }
        }
      } else {
        _actionFuntion();
      }
    }
  }
})();
(function () {
  'use strict';

  angular.module('otus.components').factory('otus.components.DynamicTableSettingsFactory', Factory);

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

    var _ordenationPriorityIndexArray = [
      //{headerIndex: 0, ordenationPriorityIndex: 1}
    ];

    self.settings = {
      elementsArray: [],
      elementsProperties: [],
      headers: [],
      callbackAfterChange: undefined,
      tableUpdateFunction: undefined,
      tableTitle: undefined,
      orderIndices: [],
      numberFieldsAlignedLeft: 10,
      flexArray: [],
      alignArray: [],
      formatData: undefined,
      selectUnselectFunction: undefined,
      formatDataPropertiesArray: [],
      formatDataIndexArray: [],
      disableCheckbox: false,
      disableFilter: false,
      disableReorder: false,
      disablePagination: false,
      selectedColor: undefined,
      hoverColor: undefined,
      //new Functionality
      markupAttribute: undefined,
      selectionFunction: undefined,
      buttonFunctionArray: []
    };

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

    function addHeader(header, flex, align, ordinationPriorityIndex) {
      self.settings.headers.push(header || '');

      if (flex === undefined) flex = '';
      self.settings.flexArray.push(flex);

      var alignmentAccepted = false;
      var avaliableAlignArray = ['right', 'left', 'center'];
      if (typeof align !== 'string') align = '';

      for (var i = 0; i < avaliableAlignArray.length; i++) {
        var avaliableAlign = avaliableAlignArray[i];

        if (align.toLowerCase().trim() === avaliableAlign) {
          align = avaliableAlign;
          alignmentAccepted = true;
          break;
        }
      }

      if (!alignmentAccepted) align = '';
      self.settings.alignArray.push(align);

      if (ordinationPriorityIndex !== undefined) {
        _ordenationPriorityIndexArray.push({
          headerIndex: self.settings.headers.length - 1,
          ordenationPriorityIndex: ordinationPriorityIndex
        });
      }
      return self;
    }

    function addColumnProperty(property, formatType) {
      self.settings.elementsProperties.push(property || '');

      if (formatType && formatType.toUpperCase && formatType.toUpperCase() === 'DATE') {
        self.settings.formatDataIndexArray.push(self.settings.elementsProperties.length - 1);
      }
      _addEmptyHeaderIfNeed();
      return self;
    }

    function addColumnIconButton(icon, tooltip, classButton, successMsg, buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback) {

      self.settings.elementsProperties.push({
        iconButton: {
          icon: icon || '',
          tooltip: tooltip || '',
          classButton: classButton || '',
          successMsg: successMsg || '',
          buttonFuntion: buttonFuntion || function () {
            console.log('buttonFunction not implemented.');
          },
          returnsSuccess: returnsSuccess || false,
          renderElement: renderElement || false,
          renderGrid: renderGrid || false,
          removeElement: removeElement || false,
          receiveCallback: receiveCallback || false
        }
      });
      _addEmptyHeaderIfNeed('5', 'center');
      return self;
    }

    function _addEmptyHeaderIfNeed(flex, align) {
      if (self.settings.elementsProperties.length > self.settings.headers.length) {
        self.addHeader('', flex, align);
      }

      return self;
    }

    function getName() {
      return _name;
    }

    function getSettings() {
      var ordenationArray = _ordenationPriorityIndexArray.sort(function compare(a, b) {
        if (a.ordenationPriorityIndex < b.ordenationPriorityIndex) return -1;
        if (a.ordenationPriorityIndex > b.ordenationPriorityIndex) return 1;
        return 0;
      });

      self.settings.orderIndices = [];
      ordenationArray.forEach(function (ordenation) {
        self.settings.orderIndices.push(ordenation.headerIndex);
      });
      return self.settings;
    }

    function setElementsArray(elementsArray) {
      self.settings.elementsArray = elementsArray;
      return self;
    }

    function setCallbackAfterChange(callbackAfterChange) {
      self.settings.callbackAfterChange = callbackAfterChange;
      return self;
    }

    function setTableUpdateFunction(tableUpdateFunction) {
      self.settings.tableUpdateFunction = tableUpdateFunction;
      return self;
    }

    function setTitle(tableTitle) {
      self.settings.tableTitle = tableTitle;
      return self;
    }

    function setNumberFieldsAlignedLeft(numberFieldsAlignedLeft) {
      self.settings.numberFieldsAlignedLeft = numberFieldsAlignedLeft;
      return self;
    }

    function setFormatData(formatData) {
      self.settings.formatData = formatData;
      return self;
    }

    function setSelectUnselectFunction(selectUnselectFunction) {
      self.settings.selectUnselectFunction = selectUnselectFunction;
      return self;
    }

    function setSelectedColor(selectedColor) {
      self.settings.selectedColor = selectedColor;
      return self;
    }

    function setHoverColor(hoverColor) {
      self.settings.hoverColor = hoverColor;
      return self;
    }

    function setCheckbox(showCheckbox) {
      showCheckbox = showCheckbox ? true : false;
      self.settings.disableCheckbox = !showCheckbox;
      return self;
    }

    function setFilter(showFilter) {
      showFilter = showFilter ? true : false;
      self.settings.disableFilter = !showFilter;
      return self;
    }

    function setReorder(showReorder) {
      showReorder = showReorder ? true : false;
      self.settings.disableReorder = !showReorder;
      return self;
    }

    function setPagination(showPagination) {
      showPagination = showPagination ? true : false;
      self.settings.disablePagination = !showPagination;
      return self;
    }

    function toJson() {
      return JSON.stringify(_settings);
    }
  }
})();
(function () {
  'use strict';

  angular.module('otus.components').directive('dropFile', Directive);

  Directive.$inject = ['$mdToast', '$timeout'];

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
          var unitList = ['Byte', 'KB', 'mb', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

          if (size > multiplier) {
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

        function getNameAndExtension(fullName) {
          var extensionIndex = fullName.lastIndexOf('.');
          var extension = extensionIndex > 0 ? fullName.substring(extensionIndex + 1) : undefined;
          var name = extensionIndex > 0 ? fileName.substring(0, 28) : fullName;

          return {
            name: name,
            extension: extension
          };
        }

        function FileDrop(e) {
          FileDragHover(e);
          console.log(e);
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropogation) e.stopPropogation();

          // fetch FileList object
          var files = e.target.files || e.dataTransfer.files;
          console.log("files", files);
          // process all File objects
          for (var i = 0, f; f = files[i]; i++) {
            //ParseFile(f);
            console.log(f);
          }
        }

        scope.$$postDigest(function () {
          console.log('scope.propagateToChildren', scope.propagateToChildren);
          if (scope.propagateToChildren) {
            var children = element.children();

            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              console.log("child", { a: child });
            }
          }
        });

        function FileDragHover(e) {
          var currentElement = element[0];

          e.preventDefault();
          if (e.type == "dragover") {
            if (!currentElement.classList.contains('draghover')) currentElement.classList.add("draghover");
          } else {
            currentElement.classList.remove('draghover');
          }
        }

        element.on('dragleave', onDragleave);
        element.on('dragover', onDragover);
        //element.bind('drop', FileDrop);
        element[0].ondrop = FileDrop;
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('otus.components').component('fileUpload', {
    template: '<style>\n  .file-upload {}\n\n  .file-upload-title {\n    margin: 5px;\n  }\n\n  .file-upload-subtitle {\n    opacity: 0.5;\n    font-size: .9em;\n    margin: 5px;\n  }\n\n  .file-upload-box {\n    border: 2px dashed silver;\n    background-color: rgba(75, 75, 75, 0.01);\n    padding: 20px;\n    padding-bottom: 30px;\n\n    width: 400px;\n  }\n\n  .animated-all-transition {\n    transition: all 0.5s ease;\n  }\n\n  .file-upload-box.draghover {\n    border-color: blue;\n    background-color: rgba(0, 0, 250, 0.1);\n    \n  }\n\n\n  .file-upoad-button {\n    position: relative;\n    top: -36px;\n    \n  }\n\n  .animate-if.ng-enter,\n  .animate-if.ng-leave {\n    transition: all ease 0.5s;\n  }\n\n  .animate-if.ng-enter,\n  .animate-if.ng-leave.ng-leave-active {\n    opacity: 0;\n  }\n\n  .animate-if.ng-leave,\n  .animate-if.ng-enter.ng-enter-active {\n    opacity: 1;\n  }\n</style><div flex><md-button ng-click="$ctrl.fileTitle.length ? $ctrl.fileTitle = \'\' : $ctrl.fileTitle=\'...\'" class="md-raised md-primary">Seleciona/Deseleciona</md-button><div layout="column" layout-align="center center" class="file-uplopad"><div drop-file propagate-to-children="true" class="file-upload-box animated-all-transition" layout="column" layout-align="center center" flex="50"><span ng-if="!$ctrl.fileTitle.length" class="file-upload-title animate-if">{{$ctrl.title}}</span> <span ng-if="!$ctrl.fileTitle.length" class="file-upload-subtitle animate-if">{{$ctrl.subtitle}}</span></div><md-button ng-if="!$ctrl.fileTitle.length" class="md-fab md-primary file-upoad-button animate-if"><md-icon md-font-set="material-icons">file_upload</md-icon><md-tooltip md-direction="right">{{$ctrl.buttonTooltip}}</md-tooltip></md-button></div><div layout="column"><dynamic-data-table flex dynamic-table-settings="$ctrl.dynamicTableSettings"></dynamic-data-table><br><md-button class="md-icon-button"><md-icon md-font-set="material-icons">file_upload</md-icon><md-tooltip md-direction="right">{{$ctrl.buttonTooltip}}</md-tooltip></md-button></div></div>',
    bindings: {
      teste: '<',
      title: '<',
      subtitle: '<',
      buttonTooltip: '<'

    },
    controller: Controller
  });

  Controller.$inject = ['$mdDialog', 'otus.components.DynamicTableSettingsFactory'];

  function Controller($mdDialog, DynamicTableSettingsFactory) {
    var self = this;
    var _confirmAction;

    self.$onInit = onInit;

    self.fileTitle = '';
    self.date = new Date();
    self.filesArray = [];

    self.removeElement = function (element) {
      element.file.state = 'Excluido';
      return element;
    };

    self.updateElement = function (element) {
      element.file.state = 'Atualizado';
      return element;
    };

    self.callbackAfterChange = function () {};

    self.executCallback = function (element, callback) {
      $mdDialog.show(_confirmAction).then(function () {
        callback(element);
      }).catch(function () {});
    };

    function onInit() {
      _buildDialogs();

      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
      //header, flex, align, ordinationPriorityIndex
      .addHeader('Arquivo', '', 'left', 30)
      //property, formatType
      .addColumnProperty('file.name')

      //header, flex, align, ordinationPriorityIndex
      .addHeader('Tipo', '', 'center')
      //property, formatType
      .addColumnProperty('file.type')

      //header, flex, align, ordinationPriorityIndex
      .addHeader('Tamanho', '', '', 5)
      //property, formatType
      .addColumnProperty('file.length')

      //header, flex, align, ordinationPriorityIndex
      .addHeader('Status', '', 'center', 3)
      //property, formatType
      .addColumnProperty('file.state')

      //header, flex, align, ordinationPriorityIndex
      .addHeader('Data', '', '', 4)
      //property, formatType
      .addColumnProperty('file.nd', 'DATE')

      //icon, tooltip, classButton, successMsg,
      //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
      .addColumnIconButton('delete_forever', 'Deletar Registro', 'md-primary', 'Item excluido', self.removeElement, true, false, false, true, false)

      //icon, tooltip, classButton, successMsg,
      //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
      .addColumnIconButton('autorenew', '', 'md-primary', '', self.updateElement, false, false, true, false, false)

      //icon, tooltip, classButton, successMsg,
      //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
      .addColumnIconButton('delete_forever', '', 'md-primary', '', self.executCallback, false, false, true, true, true).setElementsArray(self.filesArray).setCallbackAfterChange(self.callbackAfterChange).setTableUpdateFunction(self.updateDataTable).setTitle('Lista de Arquivos').setNumberFieldsAlignedLeft(5).setFormatData("'Dia - 'dd/MM/yy")
      //.setSelectUnselectFunction()
      .setCheckbox(false).setFilter(true).setReorder(true).setPagination(true).setSelectedColor().setHoverColor().getSettings();

      console.log(self.dynamicTableSettings);

      if (!self.title) self.title = 'Arraste e solte aqui o arquivo.';
      if (!self.subtitle) self.subtitle = 'ou clique';
      if (!self.buttonTooltip) self.buttonTooltip = 'Adicionar Arquivo';

      for (var i = 1; i < 22; i++) {
        var tmp = {
          file: {
            name: 'Resultados de exames - ' + i,
            type: 'CSV',
            length: 14 * i + 'kbs',
            state: '',
            nd: self.date
          }
        };

        self.filesArray.push(tmp);
      }

      console.log('file-upload-onInit');
    }

    function _buildDialogs() {
      _confirmAction = $mdDialog.confirm().title('Confirmar Ação:').textContent('A ação será executada, deseja continuar?').ariaLabel('Confirmação de Ação').ok('Ok').cancel('Cancelar');
    }
  }
})();