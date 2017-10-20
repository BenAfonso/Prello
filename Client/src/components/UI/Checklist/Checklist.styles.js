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
    margin-right: 20%;
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
    padding-right: 3%;
    display: inline-block;
  }

  .checkbox {
    margin-right: 10px;
  }

  .percentageDone {
    margin-bottom: 300px;
  }

  .itemContent {
    font-size: 150%;
    margin-right: 50%;
  }
`
