import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Color from 'color'

export default class Label extends React.Component{
    static propTypes = {
        labelText: PropTypes.string,
        width: PropTypes.string,
        color: PropTypes.string,
        style: PropTypes.object,
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
            textAligned: centeredText ? 'center' : 'left',
            ...props.style
        }

        return (
            <div style={props.style}>{this.props.labelText}</div>
        )
      }
}