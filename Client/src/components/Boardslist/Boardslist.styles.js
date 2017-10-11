export default `
.host {
  height: 100%;
  width: 100%;
  background-color: #cd5a91;
  padding: 30px 10px;
  overflow-x: scroll;
}

ul {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
}

ul li {
  width: 270px;
  margin-left: 10px;
  flex-shrink: 0;
}

ul li:nth-child(1) {
  margin-left: 0;
}

.newBoardButton {
  cursor: pointer;
  color: white;
  opacity: 0.8;
}

.newBoard {
  background-color: rgba(50,50,50,0.3);
  padding: 10px;
  border-radius: 5px;
}

.newBoardForm input {
  font-size: inherit;
  width: 100%;
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
