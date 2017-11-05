import React from 'react'

export default class Team extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render () {
    return (
      <div className='host'>
        <div className='sidebar'>
          <ul className='menu'>
            <li className='menuTitle'>Search Team</li>
            <li className='menuSeparator'></li>
            <li className='menuItem'>
              <input className='menuItemTitle' />
            </li>
          </ul>
        </div>
        <div className='members'>
        </div>
        <style jsx>{`
          .menuSeparator {
            height: 1px;
            border-top: 1px solid #999;
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
