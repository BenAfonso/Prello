export default `
  .host {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .leftButtons {
    display: inline-block;
    height: 100%;
    width: 60px;
    background-color: rgba(255,255,255,0.95);
  }

  .content {
    display: inline-block;
    height: 100%;
    width: calc(100% - 60px);
    background-color: #EEE;
  }

  .leftButtons ul li {
    text-align: center;
    height: 60px;
    font-size: 10px;
    padding: 8px 0px;
    cursor: pointer;
  }

  .leftButtons ul li .icon {
    font-size: 15px;
    padding-bottom: 4px;
  }

  .leftButtons ul li:nth-child(1) {
    font-size: 20px;
    padding: 0 0;
    line-height: 60px;
  }

  .leftButtons ul li:hover {
    background-color: #eee;
  }

  .content .title {
    position: relative;
    height: 50px;
    line-height: 50px;
    padding: 0px 20px;
    font-weight: bold;
  }

  .content .title .title-icon {
    padding-right: 20px;
    color: #aaa;
  }

  .content .title:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    background-color: #ddd;
    height: 1px;
  }
`
