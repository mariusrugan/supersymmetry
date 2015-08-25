/**
 *
 */
"use strict";

import React from 'react/addons';
import Flux from 'flux';

import Note from './components/notes/Note';
import Notes from './components/notes/Notes';

export default class App extends React.Component {

    /**
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);

        this.addItem = this.addItem.bind(this);
        this.itemEdited = this.itemEdited.bind(this);

        this.state = {
            notes: [
                {
                    task: 'Learn Webpack',
                    id: 1,
                },
                {
                    task: 'Learn React',
                    id: 2,
                },
                {
                    task: 'Do laundry',
                    id: 3
                }
            ]
        };
    }

    /**
     *
     */
    render() {

        const notes = this.state.notes;
        return (
            <div>
                <h1 onClick={this._handleClick}>. . .</h1>
                <button onClick={this.addItem}>+</button>
                <Notes items={notes} onEdit={this.itemEdited} />
            </div>
        );
    }

    /**
     *
     */
    _handleClick() {
    }

    /**
     *
     */
    addItem() {
        this.setState({
            notes: this.state.notes.concat([{
                task: 'New task',
                id: new Date()
            }])
        });
    }

    /**
     *
     */
    itemEdited(noteId, task) {
        let notes = this.state.notes;
        const noteIndex = notes.findIndex(notes, 'id', noteId);

        if(noteIndex < 0) {
            return console.warn('Failed to find note', notes, noteId);
        }

        if(task) {
            notes[noteIndex].task = task;
        }
        else {
            notes = notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1));
        }

        this.setState({notes});
    }
}

App.propTypes = {
    property1: React.PropTypes.string
};
App.defaultProps = {
    property1: 'test-app'
};
