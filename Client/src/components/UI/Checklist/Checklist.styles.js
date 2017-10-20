export default `
  .progressBar {
    border-style: none;
    padding-bottom: 10px;
    position: absolute;
    width: 80%;
    border-radius: 10px;
    background-color: #b1b6bf;
    z-index: 1;
  }

  .actualProgressBar {
    padding-bottom: 10px;
    position: absolute;
    margin-bottom: 5%;
    background-color: #1aa31c;
    border-radius: 10px;
    z-index: 2;
  }

  .checklistItem {
    margin-bottom: 2%;
  }

  .checklistSpan:hover,
  .checklistTitle:hover,
  .itemContent:hover {
    background-color: #cdd2d8;
    cursor: pointer;
  }

  .checklistTitle {
    font-size: 200%;
    margin-bottom: 2%;
    margin-right: 20%;
  }

  .deleteItemButton {
    float: right;
    margin-right: 20%;
  }

  .buttonWithMargin {
    margin-right: 10px;
    display: inline-block;
  }

  .checkbox {
    margin-right: 10px;
    display: inline-block;
  }

  .percentageDone {
    margin-bottom: 300px;
    font-size: 150%;
  }

  .itemContent {
    font-size: 150%;
    display: inline-block;
    margin-right: 20%;
  }

  .progressPart {
    margin-bottom: 30px;
  }
`
