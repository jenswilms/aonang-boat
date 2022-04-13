import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import '../../styles/demo/main.scss';

import ReactTimeslotCalendar from './../react-timeslot-calendar.jsx';
import MarkdownSnippet from './../util/markdown-snippet.jsx';
/** Code snippets **/
import customTimeslotSnippet from './snippets/custom-timeslot.md';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.initialDate = moment([2017, 3, 24]);

  }
  render() {
    return (
      <div className = "app">
        <h1> React Timeslot Calendar </h1>
        { this._customTimeslotSnippetRender() }
      </div>
    );
  }

  _customTimeslotSnippetRender() {
    return (
      <div>
        <h3> Using Custom Timeslots and Callback </h3>
        <MarkdownSnippet snippet = { customTimeslotSnippet }/>
        <ReactTimeslotCalendar
          initialDate = { this.initialDate.format() }
          timeslots = { [
            ['9', '10'],
            ['10', '11'],
            ['18', '19'],
          ] }
          groupTimeslots = { [
            {
              startDate: '04/24/2017, 18',
              format: 'MM/DD/YYYY, h',
              amount: 3,
            },
            {
              startDate: 'May 1st 2017, 3:00:00 PM',
              format: 'MMMM Do YYYY, h:mm:ss A',
              amount: 3,
            },
            {
              startDate: 'May 5th 2017, 6:00:00 PM',
              format: 'MMMM Do YYYY, h:mm:ss A',
              amount: 3,
            },
          ] }
          maxTimeslots = { 3 }
          onSelectTimeslot = { (timeslots, lastSelected) => {
            console.log('All Timeslots:');
            console.log(timeslots);

            console.log('Last selected timeslot:');
            console.log(lastSelected);
          } }
        />
      </div>
    );
  }


}

ReactDOM.render(<App />, document.getElementById('react-timeslot-calendar'));
