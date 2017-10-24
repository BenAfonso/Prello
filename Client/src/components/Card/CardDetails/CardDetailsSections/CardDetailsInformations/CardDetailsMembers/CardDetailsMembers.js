import React from 'react'
import Icon from '../../../../../UI/Icon/Icon'
import AvatarThumbnail from '../../../../../UI/AvatarThumbnail/AvatarThumbnail'
import MembersMenu from '../../../CardDetailsMenu/MembersMenu/MembersMenu'



const CardDetailsMembers = props => (
  <ul className='host'>
    {
      
        <li>
          <AvatarThumbnail initials='BA' size='30px' fontSize='16px' />
        </li>
      
    }
    <li>
      <div className='addButton'>
        <MembersMenu boardId={props.boardId} collaborators={props.collaborators} members={props.card.collaborators} cardId={props.card._id} button={<Icon name='plus' fontSize='15px' color='#aaa' />} orientation='left' />
      </div>
    </li>
    <style jsx>
      {`
  ul {
    list-style-type: none;
    display: flex;
  }

  ul li {
    margin-right: 5px;
  }

  .addButton {
    height: 30px;
    width: 30px;
    background-color: #eee;
    border-radius: 3px;
    text-align: center;
  }
  
  .addButton:hover {
    background-color: #ddd;
  }
    `}
    </style>
  </ul>
)

CardDetailsMembers.propTypes = {
}

export default CardDetailsMembers
