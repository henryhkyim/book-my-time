import React from 'react';
import PropTypes from 'prop-types';
import './Calendar.css';

class Calendar extends React.Component {

  constructor(props) {
    super(props)
    let currentDate = new Date(this.props.currentYear, this.props.currentMonth, this.props.currentDate)
    this.state = {
      currentDate: currentDate,
      startOfWeek: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay())
    }
    this.renderMonthView = this.renderMonthView.bind(this)
    this.renderWeekView = this.renderWeekView.bind(this)
    this.renderMonthViewRow = this.renderMonthViewRow.bind(this)
    this.renderMonthViewCell = this.renderMonthViewCell.bind(this)
    this.handleMonthViewPrev = this.handleMonthViewPrev.bind(this)
    this.handleMonthViewNext = this.handleMonthViewNext.bind(this)
    this.handleDayCell = this.handleDayCell.bind(this)
  }

  handleMonthViewPrev() {
    let newCurrentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() - 1, this.state.currentDate.getDate())
    let newStartOfWeek = new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), newCurrentDate.getDate() - newCurrentDate.getDay())
    this.setState({
      currentDate: newCurrentDate,
      startOfWeek: newStartOfWeek
    })
  }

  handleMonthViewNext() {
    let newCurrentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, this.state.currentDate.getDate())
    let newStartOfWeek = new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), newCurrentDate.getDate() - newCurrentDate.getDay())
    this.setState({
      currentDate: newCurrentDate,
      startOfWeek: newStartOfWeek
    })
  }

  handleDayCell(day) {
    if (day !== this.state.currentDate.getDate()) {
      let newCurrentDate = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), day)
      let newStartOfWeek = new Date(newCurrentDate.getFullYear(), newCurrentDate.getMonth(), newCurrentDate.getDate() - newCurrentDate.getDay())
      if (+newStartOfWeek !== +this.state.startOfWeek) {
        this.setState({
          currentDate: newCurrentDate,
          startOfWeek: newStartOfWeek
        })
      } else {
        this.setState({
          currentDate: newCurrentDate
        })
      }
    }
    // else {
    //   console.log("Same day, do nothing!")
    // }
  }

  renderMonthViewCell(day) {
    let jsx = ""
    if (day === 0) {
      jsx = <td>{day === 0 ? "" : day}</td>
    } else {
      jsx = <td onClick={()=>this.handleDayCell(day)}>{day === 0 ? "" : day}</td>
    }
    return jsx;
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

    return  <table className="center">
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

  renderWeekView() {
    let week = []
    let d = this.state.startOfWeek
    for (let i = 0; i < 7; i++) {
      week.push(d)
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    }
    // console.log(week)
    let timeList = ["10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00"]
    return <table className="center">
            <thead>
              <tr>
                <th></th>{week.map((d)=><th>&nbsp;{d.getDate()}{d.toString().split(" ")[1]}&nbsp;</th>)}
              </tr>
            </thead>
            <tbody>
              {timeList.map(
                (t) => <tr><td>{t}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                )}
            </tbody>
           </table>;
  }

  render() {
    let monthView = this.renderMonthView();
    let weekView = this.renderWeekView();
    return <div>
             <div><h1>{this.props.who}'s Calendar</h1></div>
             <div>{monthView}</div>
             <br/>
             <div>{weekView}</div>
           </div>;
  }
}

Calendar.propTypes = {
  view: PropTypes.string,
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number,
  currentDate: PropTypes.number,
  who: PropTypes.string
};

Calendar.defaultProps = {
  view: 'month',
  currentYear: (new Date()).getFullYear(),
  currentMonth: (new Date()).getMonth(),
  currentDate: (new Date()).getDate()
};

export default Calendar;  