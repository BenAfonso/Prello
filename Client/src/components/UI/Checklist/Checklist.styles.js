export default `
  .progressBar {
    position: relative;
    display: inline-block;
    border-style: none;
    position: absolute;
    margin-left: 5px;
    width: calc(100% - 195px); /*calc(100% - 100px)*/
    margin-top: 5px;
    height: 8px;
    border-radius: 10px;
    background-color: #eee;
    z-index: 1;
  }
  .trash{
    float:right;
  }
  .title {
    display : flex
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
    border-radius: 3px;    
  }

  .checklistTitle {
    flex-grow: 3;
    font-size: 18px;
    margin-bottom: 15px;
    margin-left: 20px;
  }

  .deleteItemButton {
    float: right;
  }

  .checkbox {
    flex-grow:1;
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
  .editDescriptionForm {
    flex-grow:2;
    margin-left:20px;
    width: 50%;
    margin-bottom: 20px;
  }
  .content {
    font-size: 13px;
  }
  .content .card {
    font-size: 18px;    
    border: none;
    outline: none;
    resize: vertical;
    overflow: visible;
    display: block;
    padding: 8px;
    padding-bottom: 25px;
    background-color: #fff;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    border-radius: 3px;
    height:0px;
    width:100%;
  }
  .saveButton {
    padding: 8px;
    background-color: rgb(40, 175, 40);
    width: 60px;
    font-weight: bold;
    text-align: center;
    border-radius: 3px;
    font-size: 13px;
    color: white;
    margin-top: 8px;
    cursor: pointer;
    float:left;
    
  }
  .cancelButton {
    padding: 8px;
    background-color: #999;
    width: 60px;
    font-weight: bold;
    text-align: center;
    border-radius: 3px;
    font-size: 13px;
    color: white;
    margin-top: 8px;
    cursor: pointer;
    float:right;
  }
  .button {
    display:inline-block;
    width:100%;
  }
  .addItemDiv{
    width:86%;
    margin-left:7%;
  }
  .editItemDiv{
    width:88%;
  }
  .editChecklistItem{
    margin-bottom: 5px;
    display:flex;    
  }
  .checkboxEditItem{
    flex-grow:1;
    margin-top: 2%;
    margin-left: -0.5%;
  }

`
