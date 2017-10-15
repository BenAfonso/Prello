import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardDetails.styles'
import Button from '../UI/Button/Button'
import Comment from '../UI/Comment/Comment'



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
        cardTitle: PropTypes.string.isRequired,
        isVisible: PropTypes.bool
    }

    shouldComponentUpdate(nextProps){
        return this.state.isActive != nextProps.isActive
    }

    openDetails(){
        this.setState({
            isActive: true
        })
    }

    closeDetails(e){
        e.stopPropagation()
        this.setState({
            isActive: !this.state.isActive
        })
        this.props.onClose()
        /*const boo = this.state.isActive
        alert("heloo"+this.state.isActive)*/
    }


    addMember(member){

    }

    addLabels(labels){

    }

    addChecklist(checklist){

    }

    addDueDate(dueDate){

    }

    addAttachments(file){

    }


    mountCardDetails(){
        if(this.state.isActive){
            return(
                <div className='card-details-frame'>
                    <div className='title'>
                        <h1 className="card-title">{this.props.cardTitle}</h1>
                        <div className="close-card-modal" onClick={e => this.closeDetails(e)}>X</div>
                    
                    </div>
                    <div>
                        <Comment></Comment>
                    </div>
                    <div className='card-details-buttons'>
                        <p className='title'>Add</p>
                        <ul>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Members</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Labels</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Checklist</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Due Date</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Attachments</Button></li>
                        </ul>

                        <p className='title'>Actions</p>
                        <ul>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Move</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Copy</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Subscribe</Button></li>
                            <li><Button bgColor={'#E2E4E6'} gradient bold shadow>Archive</Button></li>
                        </ul>
                    </div>           
                <style jsx>
                {styles}
                </style>
                
                </div>
            )
        }
        else return(<div>Details</div>)

            
    }

    render(){
        return(<div onClick={this.openDetails}>{this.mountCardDetails()}</div>)  
    }
}