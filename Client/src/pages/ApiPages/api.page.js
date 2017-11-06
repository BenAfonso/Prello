import React from 'react'
import PageLayout from '../../layouts/page'
import GenerateKeysPage from './generateKeys.page'
import RegisteredApplicationPage from './registeredApplication.page'

export default class APIPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renderedIndex: 1
    }
    this.menuItems = [
      {
        type: 'title',
        text: <h3>Get started</h3>
      },
      {
        type: 'link',
        text: 'Documentation',
        component: null
      },
      {
        type: 'link',
        text: 'Register application',
        component: <GenerateKeysPage />
      },
      {
        type: 'title',
        text: <h3>OAuth Applications</h3>
      },
      {
        type: 'link',
        text: '22Prello',
        component: <RegisteredApplicationPage />
      }
    ]
    this.renderItemAtIndex = this.renderItemAtIndex.bind(this)
  }

  renderItemAtIndex (i) {
    if (!this.menuItems[i]) { return }
    this.setState({
      renderedIndex: i
    })
  }

  render () {
    return (
      <PageLayout>
        <div className='container'>
          <ul className='leftMenu'>
            <li className='mainTitle'><h2>Developers API</h2></li>
            {
              this.menuItems.map((item, i) => (
                <li className={item.type} onClick={() => { if (item.type === 'link') { this.renderItemAtIndex(i) } else { return null } }}>
                  {item.text}
                </li>
              ))
            }
          </ul>
          <div className='content'>
            { this.menuItems[this.state.renderedIndex].component }
          </div>
        </div>
        <style jsx>{`
        .container {
          display: flex;
          height: 100%;
        }

        .content {
          background-color: #cd5a91;
          height: 100%;
          width: calc(100% - 300px);
          padding: 20px 30px;
        }

        .leftMenu {
          height: 100%;
          width: 300px;
          background-color: white;
        }

        .leftMenu li {
          position: relative;
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
        }

        .leftMenu li.title {
          position: relative;
        }

        .leftMenu li.title:after {
          content: '';
          position: absolute;
          width: 100px;
          height: 3px;
          background-color: #444;
          left: 20px;
          bottom: 5px;
        }

        .leftMenu li.link {
          cursor: pointer;
        }

        .leftMenu li.link:hover {
          background-color: #eee;
        }

        .leftMenu li.link:after {
          content: '';
          position: absolute;
          width: 80%;
          left: 10%;
          height: 1px;
          //background-color: #444;
          bottom: 0;
        }
        `}</style>
      </PageLayout>
    )
  }
}
