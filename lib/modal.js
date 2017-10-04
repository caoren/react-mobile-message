'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSTransition = require('react-transition-group/CSSTransition');

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COMMONTIME = 200;

var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.state = {
            show: true
        };
        _this.close = _this.close.bind(_this);
        _this.stopBubble = _this.stopBubble.bind(_this);
        return _this;
    }

    _createClass(Modal, [{
        key: 'stopBubble',
        value: function stopBubble(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, {
        key: 'close',
        value: function close() {
            var _this2 = this;

            this.setState({
                show: false
            });
            window.setTimeout(function () {
                _this2.teardown();
            }, COMMONTIME);
        }
    }, {
        key: 'teardown',
        value: function teardown() {
            var container = this.props.container;
            _reactDom2.default.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var show = self.state.show;
            var _self$props = self.props,
                title = _self$props.title,
                content = _self$props.content,
                btons = _self$props.btons,
                animation = _self$props.animation;

            var ModalNode = void 0;
            var btonNodes = btons.map(function (item, n) {
                var func = function func() {
                    self.close();
                    item.func && item.func();
                };
                var label = item.label;
                return _react2.default.createElement(
                    'span',
                    { className: 'c-modal-bton', key: n, onClick: func },
                    typeof label == 'string' ? label : label()
                );
            });
            var contNode = void 0;
            if (content) {
                contNode = _react2.default.createElement(
                    'div',
                    { className: 'c-modal-content' },
                    typeof content == 'string' ? content : content()
                );
            }
            ModalNode = _react2.default.createElement(
                'div',
                { className: 'c-modal-wrap', onClick: self.close },
                _react2.default.createElement(
                    'div',
                    { className: 'c-modal', onClick: self.stopBubble },
                    _react2.default.createElement(
                        'div',
                        { className: 'c-modal-title' },
                        typeof title == 'string' ? title : title()
                    ),
                    contNode,
                    _react2.default.createElement(
                        'div',
                        { className: 'c-modal-bottom' },
                        btonNodes
                    )
                )
            );
            var transitionName = animation == 'scale' ? 'cmmodal-scale' : 'cmmask';
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _CSSTransition2.default,
                    { 'in': show, classNames: 'cmmask', timeout: COMMONTIME, appear: true, enter: true, exit: true },
                    _react2.default.createElement('div', { className: 'cm-mask', onClick: self.close })
                ),
                _react2.default.createElement(
                    _CSSTransition2.default,
                    { 'in': show, classNames: transitionName, timeout: COMMONTIME, appear: true, enter: true, exit: true },
                    ModalNode
                )
            );
        }
    }]);

    return Modal;
}(_react.Component);

Modal.propTypes = {
    container: _propTypes2.default.object.isRequired,
    animation: _propTypes2.default.string,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    btons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
        func: _propTypes2.default.func
    })).isRequired
};
Modal.defaultProps = {
    animation: 'scale'
};
exports.default = Modal;
module.exports = exports['default'];