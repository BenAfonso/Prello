export default `
  .host {
    height: 100%;
    width: 100%;
    background-color: grey;
    padding: 30px;
    overflow-x: scroll;
  }

  ul {
    display: flex;
    flex-wrap: nowrap;
  }

  ul li {
    width: 300px;
    margin-left: 20px;
    flex-shrink: 0;
  }

  ul li:nth-child(1) {
    margin-left: 0;
  }

  .newListButton {
    height: 45px !important;
    width: 150px !important;
    padding: 15px;
    border-radius: 5px;
    background-color: white;
    color: rgba(0,0,0,0.6);
  }
`
