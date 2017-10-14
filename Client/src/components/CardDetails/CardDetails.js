import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardDetails.styles'
import Button from '../UI/Button/Button'



export default class CardDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isActive: false,
        }
        this.openDetails = this.openDetails.bind(this)
        this.closeDetails = this.closeDetails.bind(this)
        this.mountCardDetails = this.mountCardDetails.bind(this)
    }

    static PropTypes={
        cardTitle: PropTypes.string.isRequired
    }


    openDetails(){
        this.setState({
            isActive: true
        })
    }

    closeDetails(){
        this.setState({
            isActive: !this.state.isActive
        })
        const boo = this.state.isActive
        alert("heloo"+boo)
    }

    mountCardDetails(){
        if(this.state.isActive){
            return(
                <div className='card-details-frame'>
                    <div className='title'>{this.props.cardTitle}</div>
                    <div className="close-card-modal" onClick={this.closeDetails}>X</div>
                    <p className='title'>Add</p>
                    <ul>
                        <li><Button>Members</Button></li>
                        <li><Button>Labels</Button></li>
                        <li><Button>Checklist</Button></li>
                        <li><Button>Due Date</Button></li>
                        <li><Button>Attachments</Button></li>
                    </ul>           
                <style jsx>
                {styles}
                </style>
                
                </div>
            )
        }
        else return(<div>Hello baby</div>)

            
    }

    render(){
        return(<div onClick={this.openDetails}>{this.mountCardDetails()}</div>)  
    }
}