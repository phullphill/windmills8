'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _immutable = require('immutable');

var VaneRecord = (0, _immutable.Record)({
	id: '',
	x: 0,
	y: 0,
	direction: 'NW',
	mills: []
});

exports.VaneRecord = VaneRecord;

var Vane = (function (_VaneRecord) {
	function Vane(id, x, y, direction) {
		_classCallCheck(this, Vane);

		_get(Object.getPrototypeOf(Vane.prototype), 'constructor', this).call(this, { id: id, x: x, y: y, direction: direction });
	}

	_inherits(Vane, _VaneRecord);

	return Vane;
})(VaneRecord);

exports.Vane = Vane;
var GameRecord = (0, _immutable.Record)({
	id: 0,
	width: 0,
	height: 0,
	vanes: (0, _immutable.OrderedMap)(),
	mills: [],
	player: {}
});

exports.GameRecord = GameRecord;

var Game = (function (_GameRecord) {
	function Game(id, width, height) {
		_classCallCheck(this, Game);

		var vanes = new _immutable.OrderedMap([['0.0', new Vane({ id: '0.0', x: 0, y: 0, direction: 'NW' })], ['0.1', new Vane({ id: '0.1', x: 0, y: 1, direction: 'SW' })]]);
		_get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, { id: id, width: width, height: height, vanes: vanes });
	}

	_inherits(Game, _GameRecord);

	_createClass(Game, [{
		key: 'area',

		//set width(w) { return this.set('width'. w); }

		get: function get() {
			return this.width * this.height;
		}
	}]);

	return Game;
})(GameRecord);

exports.Game = Game;

var game1 = new Game(12, 7, 3);
console.log('game1 wxh = ' + game1.width + 'x' + game1.height + '. area=' + game1.area);
game1 = game1.set('height', 4);
console.log('after set height=4 game1 wxh = ' + game1.width + 'x' + game1.height + '. area=' + game1.area);
game1 = game1.width = 5;
console.log('after set width=5 game1 wxh = ' + game1.width + 'x' + game1.height + '. area=' + game1.area);

