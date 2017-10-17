import React from 'react'
import PropTypes from 'prop-types'
import styles from './MenuCardDetails.styles'
import Button from '../UI/Button/Button'

export default class MenuCardDetails extends React.Component{
    render(){
        return(
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
                <style jsx>
                {styles}
                </style>
            </div>                  
        )
    }
}