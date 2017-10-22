import React from 'react'
import Button from '../../UI/Button/Button'
import Icon from '../../UI/Icon/Icon'
import AvatarThumbnail from '../../UI/AvatarThumbnail/AvatarThumbnail'
import styles from './CardDetails.styles'

export default props => (
  <div className='host'>
    <div className='content'>
      <div className='section informations'>
        <div className='title'>
          <span className='icon'>
            <Icon name='list-alt' color='#bbb' />
          </span>
          <h1> {props.content} </h1>
        </div>
        <span className='listInformations'>In list WIP</span>

        <div className='sections'>
          <div className='members'>
            <div className='subsectionTitle'>Members</div>
            <ul>
              {
                <li>
                  <AvatarThumbnail initials='BA' size='30px' fontSize='16px' />
                </li>
              }
              <li>
                <div className='addButton'>
                  <Icon name='plus' fontSize='15px' color='#aaa' />
                </div>
              </li>
            </ul>
          </div>
          <div className='labels'>
            <div className='subsectionTitle'>Labels</div>
            <ul>
              {
                <li>
                  <div
                    className='label'
                    style={{ backgroundColor: 'orange' }}
                  />
                </li>
              }
              <li>
                <div className='addButton'>
                  <Icon name='plus' fontSize='15px' color='#aaa' />
                </div>
              </li>
            </ul>
          </div>

        </div>

          <div className='edit'>Edit the description...</div>
      </div>
      <div className='section comments'>
        <div className='title'>
          <div className='icon'>
            <Icon name='comment' color='#bbb' />
          </div>
          <h2> Add Comment </h2>
        </div>
      </div>
      <div className='section activity'>
        <div className='title'>
          <div className='icon'>
            <Icon name='hashtag' color='#bbb' />
          </div>
          <h2> Activity </h2>
        </div>
      </div>
    </div>

    <div
      style={{ position: 'absolute', top: '10px', right: '10px' }}
      onClick={props.handleClick}
    >
      <Button bgColor='rgba(0,0,0,0)' hoverBgColor='rgba(0,0,0,0.1)'>
        <Icon name='times' />
      </Button>
    </div>

    <div className='buttons'>
      <ul>
        <li>
          <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
            Members
          </Button>
        </li>
        <li>
          <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
            Labels
          </Button>
        </li>
        <li>
          <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
            Checklist
          </Button>
        </li>
        <li>
          <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
            Due Date
          </Button>
        </li>
        <li>
          <Button bgColor='#eee' hoverBgColor='#ddd' block size='x-small'>
            Attachment
          </Button>
        </li>
      </ul>
    </div>
    <style jsx>{styles}</style>
  </div>
)
