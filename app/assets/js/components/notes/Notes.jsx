import React from 'react';
import Note from './Note'

'use strict';

export default class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.renderNote = this.renderNote.bind(this);
    }

    render() {
        const notes = this.props.items;
        return <ul className='notes'>{notes.map(this.renderNote)}</ul>;
    }

    renderNote(note) {
        return (
            <li className='note' key={`note${note.id}`}>
                <Note
                    id={note.id}
                    value={note.task}
                    onEdit={this.props.onEdit.bind(null, note.id)} />
            </li>
        );
    }
}
