'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof window != 'undefined') {
    require('../assets/modal.css');
}


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

            var MaskNode = void 0;
            var ModalNode = void 0;
            if (show) {
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
                MaskNode = _react2.default.createElement('div', { className: 'cm-mask', onClick: self.close });
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
            }
            var transitionName = animation == 'scale' ? 'cmmodal-scale' : 'cmmask';
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    { component: 'div', transitionName: 'cmmask', transitionEnterTimeout: COMMONTIME, transitionAppear: true, transitionAppearTimeout: COMMONTIME, transitionLeaveTimeout: COMMONTIME },
                    MaskNode
                ),
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    { component: 'div', transitionName: transitionName, transitionEnterTimeout: COMMONTIME, transitionAppear: true, transitionAppearTimeout: COMMONTIME, transitionLeaveTimeout: COMMONTIME },
                    ModalNode
                )
            );
        }
    }]);

    return Modal;
}(_react.Component);

Modal.propTypes = {
    container: _react.PropTypes.object.isRequired,
    animation: _react.PropTypes.string,
    title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
    content: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
    btons: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
        func: _react.PropTypes.func
    })).isRequired
};
Modal.defaultProps = {
    animation: 'scale'
};
exports.default = Modal;
module.exports = exports['default'];