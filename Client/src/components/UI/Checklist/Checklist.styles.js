export default `
  .progressBar {
    position: relative;
    display: inline-block;
    border-style: none;
    position: absolute;
    width: calc(100% - 40px);
    margin-top: 5px;
    height: 8px;
    border-radius: 10px;
    background-color: #eee;
    z-index: 1;
  }

  .title span {
    font-size: 20px;
  }

  .title h2 {
    display: inline-block;
    font-size: 15px;
    margin-left: 20px;
  }

  .actualProgressBar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #1aa31c;
    border-radius: 10px;
    z-index: 2;
  }

  .checklistItem {
    margin-bottom: 5px;
  }

  .checklistSpan:hover,
  .checklistTitle:hover,
  .itemContent:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  .checklistTitle {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .deleteItemButton {
    float: right;
  }

  .checkbox {
    display: inline-block;
  }

  .percentageDone {
    font-size: 13px;
    height: 15px;
    width: 40px;
    color: #999;
    display: inline-block;
  }

  .textarea {
    width: 100%;
    display: block;
  }

  .itemContent {
    display: inline-block;
    margin-left: 30px;
    padding: 6px;
    border-radius: 3px;
    width: calc(100% - 90px);
  }

  .progressPart {
    margin-bottom: 15px;
  }
`