(function () {
  'use strict';

  angular
    .module('otus.components')
    .factory('otus.components.OtusFileUploadFactory', Factory);

  Factory.$inject = [
    '$mdToast',
    '$timeout'
  ];

  function Factory($mdToast, $timeout) {
    var self = this;
    self.create = create;
    self.fromJson = fromJson;
    self.createWithFile = createWithFile;

    function create() {
      return new FileUploadFactory($mdToast, $timeout, {});
    }

    function createWithFile(file) {
      var fileStructure = new FileUploadFactory($mdToast, $timeout, {});
      fileStructure.fillWithFile(file);
      return fileStructure;
    }

    function fromJson(fileStructureInfo) {
      return new FileUploadFactory($mdToast, $timeout, fileStructureInfo);
    }
    return self;
  }

  function FileUploadFactory($mdToast, $timeout, fileStructureInfo) {
    var self = this;

    self.objectType = 'FileUploadFactory';
    self.name = fileStructureInfo.name || undefined;
    self.extension = fileStructureInfo.extension || undefined;
    self.displaySize = fileStructureInfo.displaySize || undefined;
    self.size = fileStructureInfo.size || undefined;
    self.unit = fileStructureInfo.unit || undefined;
    self.date = fileStructureInfo.date || undefined;
    self.file = fileStructureInfo.file || undefined;
    self.rejectType = fileStructureInfo.rejectType || undefined;
    self.isValid = fileStructureInfo.isValid || false;

    self.toJSON = toJSON;
    self.fillWithFile = fillWithFile;
    self.getNameAndExtension = getNameAndExtension;
    self.getRoundedAndUnitSize = getRoundedAndUnitSize;

    onInit();

    function onInit() {
      if (fileStructureInfo.file) fillWithFile(fileStructureInfo.file);
    }

    function fillWithFile(file) {
      if (file) {
        var nameAndExtension = getNameAndExtension(file.name);
        var roundedAndUnitSize = getRoundedAndUnitSize(file.size);
        self.name = nameAndExtension.name;
        self.extension = nameAndExtension.extension || '';
        self.displaySize = roundedAndUnitSize.size + ' ' + roundedAndUnitSize.unit;
        self.size = roundedAndUnitSize.size;
        self.unit = roundedAndUnitSize.unit;
        self.date = file.lastModifiedDate;
        self.file = file;
      }
    }

    function getRoundedAndUnitSize(size) {
      var multiplier = 1024;
      var dividedSize = Number(size);
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
      var name = extensionIndex > 0 ? fullName.substring(0, extensionIndex) : fullName;
      return {
        name: name,
        extension: extension
      };
    }

    function toJSON() {
      var json = {
        objectType: self.objectType,
        name: self.name,
        extension: self.extension,
        displaySize: self.displaySize,
        size: self.size,
        unit: self.unit,
        date: self.date,
        file: self.file,
        isValid: self.isValid,
        rejectType: self.rejectType
      };
      return json;
    }
  }
}());
