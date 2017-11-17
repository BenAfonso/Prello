import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

@connect(store => {
  return {
    board: store.analytics.board
  }
})
export default class DateFilter extends React.Component {
  static propTypes = {
    updateOnRelease: PropTypes.bool,
    updateOnChange: PropTypes.bool
  }

  static defaultProps = {
    updateOnRelease: true,
    updateOnChange: false
  }

  constructor (props) {
    super(props)
    this.state = {
      firstPressed: false,
      secondPressed: false,
      firstTrigger: 0,
      secondTrigger: 1
    }
    this.onChange = this.onChange.bind(this)
    this.release = this.release.bind(this)
  }

  onChange (d1, d2) {
    this.props.onChange(d1, d2)
  }

  componentDidMount () {
    this.host.addEventListener('mousemove', e => {
      if (this.state.firstPressed) { this.adjustFirst(e) }
      if (this.state.secondPressed) { this.adjustSecond(e) }
    })

    this.host.addEventListener('mouseup', e => {
      this.release()
    })

    this.host.addEventListener('mouseleave', e => {
      this.setState({
        firstPressed: false,
        secondPressed: false
      })
    })

    this.host.addEventListener('touchmove', e => {
      if (this.state.firstPressed) { this.adjustFirst(e) }
      if (this.state.secondPressed) { this.adjustSecond(e) }
    })

    this.host.addEventListener('touchend', e => {
      this.setState({
        firstPressed: false,
        secondPressed: false
      })
    })

    this.host.addEventListener('touchleave', e => {
      this.setState({
        firstPressed: false,
        secondPressed: false
      })
    })
  }

  release () {
    this.setState({ firstPressed: false, secondPressed: false })
    if (this.props.updateOnRelease) {
      this.onChange(this.getDateFraction(this.state.firstTrigger), this.getDateFraction(this.state.secondTrigger))
    }
  }

  pressSecond () {
    this.setState({ secondPressed: true })
  }

  pressFirst () {
    this.setState({ firstPressed: true })
  }

  adjustFirst (e) {
    let windowWidth = window.innerWidth
    let mouseX = e.pageX
    let fraction = mouseX / windowWidth
    let cursorFraction = 20 / windowWidth
    if (fraction >= this.state.firstTrigger) {
      if (fraction < this.state.firstTrigger + cursorFraction) {
        return
      }
    } else {
      if (fraction > this.state.firstTrigger - cursorFraction) {
        return
      }
    }

    // if (this.getDateFraction(fraction) === this.getDateFraction(this.state.firstTrigger)) {
    //  return
    // }
    this.setState({ firstTrigger: mouseX / windowWidth })
    if (this.props.updateOnChange) {
      this.onChange(this.getDateFraction(this.state.firstTrigger), this.getDateFraction(this.state.secondTrigger))
    }
  }

  adjustSecond (e) {
    let windowWidth = window.innerWidth
    let mouseX = e.pageX
    this.setState({ secondTrigger: mouseX / windowWidth })
    this.onChange(this.getDateFraction(this.state.firstTrigger), this.getDateFraction(this.state.secondTrigger))
    if (this.props.updateOnChange) {
      this.onChange(this.getDateFraction(this.state.firstTrigger), this.getDateFraction(this.state.secondTrigger))
    }
  }

  getDateFraction (fraction) {
    let minDate = moment(new Date(this.props.minDate))
    let maxDate = moment(new Date(this.props.maxDate))
    let diffInDays = maxDate.diff(minDate)
    let daysToAdd = Math.floor(diffInDays * fraction)
    let newDate = minDate.add(daysToAdd).toDate()
    return `${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}/${(newDate.getMonth() + 1) < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}/${newDate.getUTCFullYear()}`
  }

  render () {
    return (
      <div className='host' ref={h => { this.host = h }}>
        <div className='left void' style={{ width: `${this.state.firstTrigger * 100}%` }}/>
        <div className='left bar' onMouseDown={this.pressFirst.bind(this)} onTouchStart={this.pressFirst.bind(this)} style={{ left: `${this.state.firstTrigger * 100}%` }} />
        <div className='selectedArea' style={{
          left: `calc(${this.state.firstTrigger * 100}% + 20px)`,
          width: `${(this.state.secondTrigger - this.state.firstTrigger) * 100}%`
        }}>
          <div style={{position: 'relative', height: '100%'}}>
            <div className='first value'>{this.getDateFraction(this.state.firstTrigger)}</div>
            <div className='second value'>{this.getDateFraction(this.state.secondTrigger)}</div>
          </div>
        </div>
        <div className='right bar' onMouseDown={this.pressSecond.bind(this)} onTouchStart={this.pressSecond.bind(this)} style={{ left: `calc(${this.state.secondTrigger * 100}% - 20px)` }} />
        <div className='right void' style={{ width: `${(1 - this.state.secondTrigger) * 100}%` }} />
        <style jsx>{`
        .host {
          position: relative;
          width: 100%;
          height: 50px;
          background-color: white;
          box-shadow: 0px -3px 5px 0px rgba(174, 77, 123, 0.5);
        }

        .host * {
          user-select: none;
        }

        .bar {
          position: absolute;
          bottom: 0;
          width: 20px;
          height: 100%;
          background-color: #fff;
          z-index: 2;
          cursor: pointer;
        }

        .selectedArea {
          position: absolute;
          bottom: 0;
          height: 100%;
          background-color: #cd5a91;
        }

        .void {
          position: absolute;
          height: 100%;
          background-color: rgb(174, 77, 123);
        }

        .left.void {
          left: 0;
        }

        .right.void {
          right: 0px;
        }

        .value {
          position: absolute;
          bottom: 0;
          color: white;
          font-weight: bold;
        }

        .first.value {
          left: 10px;
        }

        .second.value {
          right: 50px;
          bottom: calc(100% - 25px);
          z-index: 100;
        }
        `}</style>
      </div>
    )
  }
}
