import React from 'react'
import PageLayout from '../../layouts/page'
import GenerateKeysPage from './generateKeys.page'
import RegisteredApplicationPage from './registeredApplication.page'
import { getOAuthClients } from '../../services/OAuthClient.service'
import {connect} from 'react-redux'
import {setOAuthClients} from '../../store/actions'

@connect(store => {
  return {
    developers: store.developers
  }
})
export default class APIPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renderedIndex: 2
    }
    this.renderItemAtIndex = this.renderItemAtIndex.bind(this)
  }

  componentDidMount () {
    getOAuthClients().then(clients => {
      setOAuthClients(clients)
    })
  }

  renderItemAtIndex (i) {
    this.setState({
      renderedIndex: i
    })
  }

  render () {
    let menuItems = [
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
        text: 'Register client',
        component: <GenerateKeysPage />
      },
      {
        type: 'title',
        text: <h3>OAuth Applications</h3>
      }
    ]

    this.props.developers.oauthClients.map(c => {
      menuItems.push({
        type: 'link',
        text: c.name,
        component: <RegisteredApplicationPage key={c._id} {...c} />
      })
      return c
    })

    return (
      <PageLayout>
        <div className='container'>
          <ul className='leftMenu'>
            <li className='mainTitle'><h2>Developers API</h2></li>
            {
              menuItems.map((item, i) => (
                <li key={i} className={item.type} onClick={() => { if (item.type === 'link') { this.renderItemAtIndex(i) } else { return null } }}>
                  {item.text}
                </li>
              ))
            }
          </ul>
          <div className='content'>
            { menuItems[this.state.renderedIndex].component }
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
          overflow-y: auto;
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
