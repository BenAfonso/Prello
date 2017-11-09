export default `
.teamListElement {
  background-color: #FFB93A;
  border-radius: 5px;
  border-color: #FFB93A;
  border-style: solid;
  width: 250px;
}
.teamSeparator {
  margin-left: 50px;
  width: 80%;
}
.header {
  height: 50px;
  padding: 5px 10px;
}
.header .name {
  display: inline-block;
  float: left;
  font-weight: bold;
  font-size: 150%;
}
.header .membersNumber {
  display: inline-block;
  float: right;
  vertical-aglin: middle;
}
.content {
  border-radius: 5px;
  background-color: #FFCE75;
  overflow-y: auto;
  min-height: 180px;
  max-height: 300px;
}
.descriptionTeam {
  overflow-wrap: break-word;
}
.boardOwner,
.boardsNumber,
.descriptionTeam {
  margin-top: 10px;
  margin-left: 10px;
}
`
