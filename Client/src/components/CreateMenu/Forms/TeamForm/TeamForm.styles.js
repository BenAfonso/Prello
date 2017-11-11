export default `
.newTeamForm {
  display: inline-block;
  position: absolute;
  z-index: 10;
  right: 3px;
  top: 50px;
  background: #E2E4E6;
  border-radius: 3px;
  border: 1px solid #999;
  padding-left: 10px;
  padding-right: 10px;
  width: 300px;
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

.teamFormTitle {
  color: #666;
  font-size: 14px;
}


.teamFormItem {
  padding: 5px;
  padding-top: 0;
  padding-bottom: 10px;
}

.teamFormItemTitle {
  line-height: 15px;
  font-size: 13px;
  font-weight: bold;
  width: 100%;
  color: black;
  text-align: left;
}

.teamFormItemBody {
  padding-top:5px;
  line-height: 15px;  
  font-size: 12px;
  color:grey;
  text-align: left;
}

.teamFormSeparator {
  height: 1px;
  border-top: 1px solid #999;
  display: block;
  margin: 5px;
}

.newTeamForm input {
  font-size: 16px;
  width: 100%;
  padding: 8px;
  border-radius: 3px;
}

.newTeamForm textarea {
  font-size: 16px;
  width: 100%;
  padding: 8px;
  border-radius: 3px;
}

.newTeamFormButtons {
  margin-top: 8px;
  margin-left: 10px;
  float: left;
}

.newTeamFormButtons div {
  display: inline-block;
}

.newTeamFormButtons div:nth-child(1) {
  margin-right: 10px;
}
`
