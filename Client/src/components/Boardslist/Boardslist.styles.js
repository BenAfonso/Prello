export default `
.host {
  min-height: 100%;
  width: 100%;
  background-color: #cd5a91;
  padding: 30px 10px;
  overflow-y: auto;  
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

ul.boards {
  margin-top: 20px;
}

.createBoard {
  cursor: pointer;
  position: relative;
  background-color: rgba(250,250,250,0.3);
  padding: 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  width: 270px;
}

.createBoard-title {
  height: 50px;
  line-height: 50px;
  color: #dcdcda;
  font-size: 16px;
  text-align: center;
}

.createBoard:hover {
  background-color: rgba(200,200,200,0.3);
  transform: translateY(-3px) translateX(-3px);
}

.createBoard:hover .createBoard-title {
  color: rgba(0,0,0,0.5);
}

.teamSection {
  margin-left: 46px;
  width: 100%;
}

.team-title {
  display: flex;
  align-items: center;
  padding: 10px;
}

.team-buttons {
  display: inline-block;
}

.team-button {
  display: inline-block;
  padding-left: 10px;
}

.teamBoards {
  width: 100%;
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  padding-right: 10px;
  margin-top: 20px;
  justify-content: center;
}
`
