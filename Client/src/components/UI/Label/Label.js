import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default class Label extends React.Component{
    constructor(){
        super()
        this.state={
            isExpanded: false
        }
        this.expandLabel = this.expandLabel.bind(this)
        this.renderLabel = this.renderLabel.bind(this)
    }
    static propTypes = {
        labelText: PropTypes.string,
        width: PropTypes.string,
        color: PropTypes.string,
        style: PropTypes.object,
        width: PropTypes.string,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        fontWeight: PropTypes.string
      }



      static defaultProps = {
        height: '1pc',
        width: '150px',
        color: '#fff',
        backgroundColor: '#000',
        fontWeight: "bold",
        borderRadius: "3px",
        fontSize: '12px',
        centeredText: true
      }

      expandLabel(){
          this.setState({
              isExpanded: true
          })
      }

      renderLabel(){
          if(this.state.isExpanded) return <div style={props.style}>{this.props.labelText}</div>
          else return <div style={props.style}></div>
      }

      render(){
        const {
            labelText,
            width,
            height,
            fontWeight,
            backgroundColor,
            borderRadius,
            color,
            fontSize,
            centeredText,
            ...props
        } = this.props

        props.style={
            width,
            height,
            fontSize,
            fontWeight,
            backgroundColor,
            borderRadius,
            color,
            textAlign: centeredText ? 'center' : 'left',
            ...props.style
        }

        return (
            <div onClick={this.expandLabel}>{this.renderLabel}</div>
        )
      }
}