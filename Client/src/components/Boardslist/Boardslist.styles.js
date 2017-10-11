export default `
.host {
  height: 100%;
  width: 100%;
  background-color: #cd5a91;
  padding: 30px 10px;
}

h1 {
  color: white;
  margin-left: 23px;
}

ul {
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

ul li {

  margin-left: 10px;
  margin-bottom: 20px;
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

ul.boards {
  margin-top: 20px;
}
`
