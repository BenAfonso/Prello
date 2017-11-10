export default `
.teamListElement {
  border-radius: 5px;
  background-color: #FFFFFF;
  width: 250px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
}
.teamListElement:hover {
  transform: translateY(-10px) rotate(-3deg);
}
.teamSeparator {
  margin-left: 50px;
  width: 80%;
}
.header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #FFB93A;
  height: 50px;
  padding: 5px 10px;
}
.header .name {
  display: inline-block;
  vertical-align: middle;
  float: left;
  font-weight: bold;
  font-size: 150%;
}
.header .membersNumber {
  display: inline-block;
  float: right;
  vertical-align: middle;
}
.content {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
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
