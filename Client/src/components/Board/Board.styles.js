export default `
  .host {
    height: 100%;
    width: 100%;
    padding: 30px 0px;
  }

  .boardTitle {
    color: white;
    font-size: 18px;
    margin-bottom: 15px;
    padding-left: 10px;
  }

  h1 {
    font-size: 25px;
  }

  ul {
    height: calc(100% - 34px);
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    overflow-x: auto;
    padding-left: 10px;
    padding-right: 10px;
  }

  ul li {
    width: 270px;
    margin-left: 10px;
    flex-shrink: 0;
  }

  ul li:nth-child(1) {
    margin-left: 0;
  }

  .newListButton {
    cursor: pointer;
    color: white;
    opacity: 0.8;
  }

  .newList {
    padding: 10px;
    border-radius: 5px;
    height: auto;
  }

  .newListForm input {
    font-size: inherit;
    width: 100%;
    padding: 8px;
    border-radius: 3px;
  }

  .newListFormButtons {
    margin-top: 8px;
  }
  
  .newListFormButtons div {
    display: inline-block;
  }
  
  .newListFormButtons div:nth-child(1) {
    margin-right: 10px;
  }
`
