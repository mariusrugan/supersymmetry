/**
 *
 */
var React = require('react');

var App = React.createClass({
    render: function () {
        return (
            <h1>Flux/React/Webpack</h1>
        );
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
