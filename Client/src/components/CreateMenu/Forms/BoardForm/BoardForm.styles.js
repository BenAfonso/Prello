export default `
.newBoardForm {
  display: inline_block;
  position: absolute;
  z-index: 10;
  right: 3px;
  top: 50px;
  background: #E2E4E6;
  border-radius: 3px;  
  border: 1px solid #999;
  width:300px;
}

.backButton {
  line-height: 15px;  
  font-size: 12px;
  color: #666;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.boardFormTitle {
  color: #666;
  font-size: 14px;
  height: 80%;
}


.boardFormItem {
  padding: 5px;
  padding-top: 0;
  padding-bottom: 10px;
}

.boardFormItemTitle {
  line-height: 15px;
  font-size: 13px;
  font-weight: bold;
  width: 100%;
  color: black;
  text-align: left;
}

.boardFormItemBody {
  padding-top:5px;
  line-height: 15px;  
  font-size: 12px;
  color:grey;
  text-align: left;
}

.boardFormSeparator {
  height: 1px;
  border-top: 1px solid #999;
  display: block;
  margin: 5px;
}

.newBoardForm input {
  font-size: 16px;
  width: 90%;
  padding: 8px;
  border-radius: 3px;
}

.newBoardFormButtons {
  margin-top: 8px;
  margin-left: 10px;
  float: left;
}

.newBoardFormButtons div {
  display: inline-block;
}

.newBoardFormButtons div:nth-child(1) {
  margin-right: 10px;
}
`
