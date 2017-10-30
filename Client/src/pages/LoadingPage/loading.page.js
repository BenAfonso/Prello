import React from 'react'
import { TimelineMax } from 'gsap'
import GSAP from 'react-gsap-enhancer'

@GSAP()
export default class LoadingPage extends React.Component {
  componentDidMount () {
    this.addAnimation(this.animateCards)
  }

  animateCards ({target}) {
    const card1 = target.find({ name: 'card1' })
    const card2 = target.find({ name: 'card2' })
    const list1 = target.find({ name: 'list1' })
    const list2 = target.find({ name: 'list2' })

    return new TimelineMax({repeat: -1})
      .to(list1, 0.5, {y: '-=40'}, 0)
      .to(list1, 0.5, {x: '+=270'}, 0)
      .to(list2, 1, {x: '-=270'}, 0)
      .to(list1, 0.5, {y: '+=40'}, 0.5)
      .to(card1, 1, {y: '+=60'}, 1)
      .to(card1, 0.5, {x: '+=50'}, 1)
      .to(card2, 0.3, {y: '-=60'}, 1.2)
      .to(card1, 0.5, {x: '-=50'}, 1.5)
  }

  render () {
    return (
      <div className='host'>
        <div className='header'>
          <div className='logo' />
          <div className='lists'>
            <div name='list1' className='list'>
              <div name='card1' className='first card' />
              <div name='card2' className='second card' />
            </div>
            <div name='list2' className='list'>
              <div className='first card' />
              <div className='second card' />
            </div>
          </div>
        </div>
        <style jsx>{`

          .host {
            position: relative;
            height: 100%;
            background-color: #cd5a91;
          }
    
          .header {
            position: absolute;
            width: 520px;
            height: 420px;
            top: calc(50% - 210px);
            left: calc(50% - 260px);
          }
    
          .logo {
            background-image: url("/assets/prello_logo.png");
            background-size: cover;
            margin: auto auto;
            width: 200px;
            height: 55px;
            margin-bottom: 80px;
          }

          .card {
            position: relative;
            height: 50px;
            width: 240px;
            margin: auto auto;
            margin-top: 10px;
            background-color: white;
            border-radius: 4px;
            box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
          }

          .lists {
            display: flex;
          }

          .lists div:nth-child(1) {
            margin-right: 10px;
            z-index: 5;
          }

          .list {
            position: relative;
            background-color: #eee;
            width: 260px;
            border-radius: 5px;
            padding: 10px;
            padding-top: 30px;
          }

          .list:before {
            position: absolute;
            top: 20px;
            left: 10px;
            content: '';
            border-radius: 4px;
            width: 40%;
            height: 11px;
            background-color: rgba(0,0,0,0.5);
          }

          .card:before {
            position: absolute;
            content: '';
            border-radius: 4px;
            top: 20px;
            left: 10px;
            height: 10px;
            background-color: rgba(0,0,0,0.4);
          }

          .first.card:before {
            width: 80%;
          }

          .second.card:before {
            width: 30%;
          }
        `}</style>
      </div>
    )
  }
}
