export default `
.host {
  display: inline-block;
}

.newBoardForm {

  display: inline_block;
  position: absolute;
  z_index: 10;
  right: 3px;
  top: 50px;
  background: #E2E4E6;
  border-radius: 3px;  
  width:300px;
}


.headerButton {
  margin-top: 5px;
  margin-right : 5px;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background: rgba(255,255,255,0.5);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.headerButton:hover {
  background: rgba(255,255,255,0.3);
}

.newBoardForm input {
  font-size: 16px;
  width: 90%;
  padding: 8px;
  border-radius: 3px;
}

.newBoardFormButtons {
  margin-top: 8px;
}

.newBoardFormButtons div {
  display: inline-block;
}

.newBoardFormButtons div:nth-child(1) {
  margin-right: 10px;
}

`
