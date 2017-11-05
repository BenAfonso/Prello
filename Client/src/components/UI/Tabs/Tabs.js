import React from 'react'
import PropTypes from 'prop-types'

export default class Tabs extends React.Component {
  static propTypes = {
    selected: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  }

  static defaultProps = {
    selected: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.selected
    }
  }

  handleClick (index, event) {
    event.preventDefault()
    this.setState({
      selected: index
    })
  }

  renderTitles () {
    function labels (child, index) {
      let activeClass = (this.state.selected === index ? 'tab active' : 'tab')
      return (
        <li key={index} className={activeClass} onClick={this.handleClick.bind(this, index)}>
          {child.props.label}
          <style jsx>{`
            .tab {
              display: inline-block;
              border: solid 1px rgba(0,0,0,0.1);    
              border-bottom: none;          
              border-radius: 3px 3px 0 0;              
              background: rgba(255,255,255,0.1);
              color: white;
              padding: 0 20px;
              margin-left: 5px;
              vertical-align: middle;
              line-height: 45px;
              height: 45px;
              cursor: pointer;
              box-shadow: 2px -2px 2px rgba(0,0,0,0.2);              
            }

            .tab:hover{
              font-weight: bold;                        
            }

            .tab.active{
              border: solid 1px white;
              border-bottom: none;
              background: #cd5a91;
              font-weight: bold;                                      
            }
          `}</style>
        </li>
      )
    }

    return (
      <ul className="tabs-labels">
        {this.props.children.map(labels.bind(this))}
        <style jsx>{`
            .tabs-labels {
              margin-top:-45px;
            }
          `}</style>
      </ul>
    )
  }

  renderContent () {
    return (
      <div className="tabs-content">
        {this.props.children[this.state.selected]}
      </div>
    )
  }

  render () {
    return (
      <div className="tabs">
        <div className='titles'>
          {this.renderTitles()}
        </div>
        <div className='content'>
          {this.renderContent()}
        </div>
        <style jsx>{`
          .titles {
            text-align: center;
            width: 100%;
          }

          .content {
            padding-top: 50px;
          }

          .tabs {
            width: 100%;
          }

        `}</style>
      </div>
    )
  }
}
