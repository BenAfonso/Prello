import React from 'react'
import CardDetailsSection from '../../CardDetailsSection/CardDetailsSection'
import CardDetailsMembers from './CardDetailsMembers/CardDetailsMembers'
import CardDetailsLabels from './CardDetailsLabels/CardDetailsLabels'

const CardDetailsInformations = props => (
  <div className='host'>
    <CardDetailsSection title={props.content} icon='list-alt'>
      <span className='listInformations'>In list WIP</span>
      <div className='sections'>
        <div className='members'>
          <div className='subsectionTitle'>
            Members
          </div>
          <CardDetailsMembers boardId={props.boardId} collaborators={props.collaborators} members={props.members} cardId={props.cardId} />
        </div>
        <div className='labels'>
          <div className='subsectionTitle'>
            Labels
          </div>
          <CardDetailsLabels />
        </div>
      </div>
      <div className='edit'>
        Edit the description...
      </div>
    </CardDetailsSection>
    <style jsx>
      {`
.listInformations {
  font-size: 13px;
  color: #999;
}

.sections {
  margin-top: 20px;
  display: flex;
}

.members {
  margin-right: 20px;
}

.subsectionTitle {
  font-size: 14px;
  color: #999;
}

.edit {
  margin-top: 20px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
}
    `}
    </style>
  </div>
)

CardDetailsInformations.propTypes = {
}

export default CardDetailsInformations
