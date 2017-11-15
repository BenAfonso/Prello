import React from 'react'
import {connect} from 'react-redux'
import { } from 'recharts'
@connect(store => {
  return {
    board: store.analytics.board
  }
})
export default class DateFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstPressed: false,
      secondPressed: false,
      firstTrigger: 0.34,
      secondTrigger: 0.76
    }
    this.onChange = this.onChange.bind(this)
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
      this.setState({
        firstPressed: false,
        secondPressed: false
      })
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

  pressSecond () {
    this.setState({ secondPressed: true })
  }

  pressFirst () {
    this.setState({ firstPressed: true })
  }

  adjustFirst (e) {
    let windowWidth = window.innerWidth
    let mouseX = e.pageX
    this.setState({ firstTrigger: mouseX / windowWidth })
    this.getDateFraction(this.state.firstTrigger)
    this.onChange(this.getDateFraction(this.state.firstTrigger), this.getDateFraction(this.state.secondTrigger))
  }

  adjustSecond (e) {
    let windowWidth = window.innerWidth
    let mouseX = e.pageX
    this.setState({ secondTrigger: mouseX / windowWidth })
    this.onChange(this.getDateFraction(this.state.firstTrigger), this.getDateFraction(this.state.secondTrigger))
  }

  getDateFraction (fraction) {
    let minDate = new Date(this.props.minDate)
    let maxDate = new Date(this.props.maxDate)
    let delta = maxDate.getDate() - minDate.getDate()
    let newDay = Math.floor(minDate.getDate() + delta * fraction)
    let newDate = new Date(minDate.getUTCFullYear(), minDate.getMonth(), newDay)
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
        <div className='right bar' onMouseDown={this.pressSecond.bind(this)} onTouchStart={this.pressSecond.bind(this)} style={{ left: `${this.state.secondTrigger * 100}%` }} />
        <div className='right void' style={{ width: `calc(${(1 - this.state.secondTrigger) * 100}% - 20px)` }} />
        <style jsx>{`
        .host {
          position: relative;
          width: 100%;
          height: 50px;
          background-color: white;
          box-shadow: 0px -3px 5px 0px rgba(174, 77, 123, 0.5);
        }

        .bar {
          position: absolute;
          bottom: 0;
          width: 20px;
          height: 100%;
          background-color: #fff;
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
          right: 0;
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
          right: 30px;
          bottom: calc(100% - 25px);
          z-index: 100;
        }
        `}</style>
      </div>
    )
  }
}
