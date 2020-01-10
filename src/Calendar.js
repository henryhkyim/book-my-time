import React from 'react';
import PropTypes from 'prop-types';

class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentDate: new Date(this.props.currentYear, this.props.currentMonth, this.props.currentDate)
    }
    this.renderMonthView = this.renderMonthView.bind(this)
    this.renderMonthViewRow = this.renderMonthViewRow.bind(this)
    this.renderMonthViewCell = this.renderMonthViewCell.bind(this)
    this.handleMonthViewPrev = this.handleMonthViewPrev.bind(this)
    this.handleMonthViewNext = this.handleMonthViewNext.bind(this)
  }

  handleMonthViewPrev() {
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, this.state.currentDate.getDate())
    })
  }

  handleMonthViewNext() {
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, this.state.currentDate.getDate())
    })
  }

  renderMonthViewCell(day) {
    return <td>{day === 0 ? "" : day}</td>;
  }

  renderMonthViewRow(row) {
    return <tr>
        {row.map(this.renderMonthViewCell)}
         </tr>;
  }

  renderMonthView() {
    const currentDate = this.state.currentDate;
    const currentMonth = currentDate.getMonth();
    const strCurrentMonth = currentDate.toString().split(" ")[1];
    const currentYear = currentDate.getFullYear();
    const firstDay = (new Date(currentYear, currentMonth, 1)).getDay();
    const lastDay = (new Date(currentYear, currentMonth + 1, 0)).getDate();
    // console.log(`current date time is: ${firstDay} and last date time is: ${lastDay} and strCurrentMonth is :${strCurrentMonth}`);
    let rowCount = 4;
    if (lastDay + firstDay > 28) {
      rowCount++;
    }
    if (lastDay + firstDay > 35) {
      rowCount++;
    }
    let rows = []
    let row = []
    let count = 0;
    let counter = 1;
    for (let i = 0; i < rowCount * 7; i++) {
      if ((count < firstDay) || (count >= firstDay + lastDay)) {
        row.push(0)
      } else {
        row.push(counter)
        counter++
      }
      count++
      if (count % 7 === 0) {
        rows.push(row)
        row = []
      }
    }

    return  <table>
              <caption>
                <a href="#" onClick={this.handleMonthViewPrev}>{"<<"}</a>
                &nbsp;&nbsp;&nbsp;{strCurrentMonth} {currentYear}&nbsp;&nbsp;&nbsp;
                <a href="#" onClick={this.handleMonthViewNext}>{">>"}</a>
              </caption>
              <thead>
                <tr>
                  <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(this.renderMonthViewRow)}
              </tbody>
            </table>;
  }

  render() {
    let display = <h1>Undefined view {this.props.view}</h1>;
    if (this.props.view === "month") {
      display = this.renderMonthView();
    }
    return <div>{display}</div>;
  }
}

Calendar.propTypes = {
  view: PropTypes.string,
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number,
  currentDate: PropTypes.number
};

Calendar.defaultProps = {
  view: 'month',
  currentYear: (new Date()).getFullYear(),
  currentMonth: (new Date()).getMonth(),
  currentDate: (new Date()).getDate()
};

export default Calendar;  