import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default class Label extends React.Component{
    constructor(){
        super()
        this.state={
            isExpanded: false,
            labelTitle: '',
        }
        this.expandLabel = this.expandLabel.bind(this)
    }
    static propTypes = {
        labelText: PropTypes.string,
        width: PropTypes.string,
        color: PropTypes.string,
        style: PropTypes.object,
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
              isExpanded: !this.state.isExpanded
          }, () =>{
              if(this.state.isExpanded) {
                  this.setState({
                    labelTitle: this.props.labelText
                    
                  })
              }
              else{
                this.setState({
                    labelTitle: ''
                })
              }
          })
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
            height: this.state.isExpanded ? '1pc' : '8px' ,
            fontSize,
            fontWeight,
            backgroundColor,
            borderRadius,
            color,
            textAlign: centeredText ? 'center' : 'left',
            ...props.style
        }

        return (
            <div style={props.style} onClick={this.expandLabel}>{this.state.labelTitle}</div>
        )
      }
}