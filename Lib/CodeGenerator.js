'use strict';

var async = require('async');
var _ = require('underscore');
var UniversalFunctions = require('../Utils/UniversalFunctions');

var Services = require('../Services');


var generateRandomNumbers = function (numberLength, excludeList) {
    var arrayList = [];
    excludeList = excludeList || [];

    var minString = "0";
    var maxString = "9";

    for (var i=1; i < numberLength; i++){
        minString = minString + "0";
        maxString = maxString +  "9";
    }
    var minNumber = parseInt(minString);
    var maxNumber = parseInt(maxString);
    //Create list
    for (i = minNumber; i < maxNumber; i ++){
        var digitToCheck = i.toString();
        if (digitToCheck.length < numberLength){
            var diff = numberLength - digitToCheck.length;
            var zeros = '';
            for (var j = 0; j<diff; j++){
                zeros+='0';
            }
            digitToCheck = zeros + digitToCheck
        }
        if (digitToCheck <1000)
        if (excludeList.indexOf(digitToCheck) == -1){
            arrayList.push(digitToCheck)
        }
    }
    if (arrayList.length > 0){
        arrayList = _.shuffle(arrayList);
        return arrayList[0];
    }else {
        return false;
    }
};
