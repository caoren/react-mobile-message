'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = alert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _mask = require('./mask.jsx');

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTERTIME = 300;
var LEAVETIME = 300;

var Alert = function (_Component) {
    _inherits(Alert, _Component);

    function Alert(props) {
        _classCallCheck(this, Alert);

        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

        _this.state = {
            show: true
        };
        _this.close = _this.close.bind(_this);
        _this.done = _this.done.bind(_this);
        _this.stopBubble = _this.stopBubble.bind(_this);
        return _this;
    }

    _createClass(Alert, [{
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
            }, LEAVETIME);
        }
    }, {
        key: 'teardown',
        value: function teardown() {
            var container = this.props.container;
            _reactDom2.default.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
        }
    }, {
        key: 'done',
        value: function done() {
            var done = this.props.done;

            this.close();
            done && done();
        }
    }, {
        key: 'render',
        value: function render() {
            var show = this.state.show;
            var _props = this.props,
                title = _props.title,
                titleClassName = _props.titleClassName,
                content = _props.content,
                richContent = _props.richContent,
                done = _props.done,
                doneClassName = _props.doneClassName,
                doneLabel = _props.doneLabel;

            var alertNode = void 0;
            if (show) {
                var contNode = void 0;
                if (richContent) {
                    contNode = _react2.default.createElement('div', { className: 'c-modal-content', dangerouslySetInnerHTML: { __html: richContent } });
                } else if (content) {
                    contNode = _react2.default.createElement(
                        'div',
                        { className: 'c-modal-content' },
                        content
                    );
                }
                var titleCls = "c-modal-title";
                if (titleClassName) {
                    titleCls += " " + titleClassName;
                }
                var btonCls = "c-modal-bton";
                if (doneClassName) {
                    btonCls += " " + doneClassName;
                }
                alertNode = _react2.default.createElement(
                    _mask2.default,
                    { onClick: this.close },
                    _react2.default.createElement(
                        'div',
                        { className: 'c-modal', onClick: this.stopBubble },
                        _react2.default.createElement(
                            'div',
                            { className: titleCls },
                            title
                        ),
                        contNode,
                        _react2.default.createElement(
                            'div',
                            { className: 'c-modal-bottom' },
                            _react2.default.createElement(
                                'span',
                                { className: btonCls, onClick: this.done },
                                doneLabel
                            )
                        )
                    )
                );
            }
            return _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                { component: 'div', transitionName: 'cmmask', transitionEnterTimeout: ENTERTIME, transitionAppear: true, transitionAppearTimeout: ENTERTIME, transitionLeaveTimeout: LEAVETIME },
                alertNode
            );
        }
    }]);

    return Alert;
}(_react.Component);

Alert.propTypes = {
    container: _react.PropTypes.object.isRequired,
    title: _react.PropTypes.string.isRequired,
    titleClassName: _react.PropTypes.string,
    content: _react.PropTypes.string,
    richContent: _react.PropTypes.string,
    done: _react.PropTypes.func,
    doneClassName: _react.PropTypes.string,
    doneLabel: _react.PropTypes.string
};
Alert.defaultProps = {
    doneLabel: '确定'
};
function alert() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    var props = _extends({}, option, {
        container: tempDiv
    });
    _reactDom2.default.render(_react2.default.createElement(Alert, props), tempDiv);
}