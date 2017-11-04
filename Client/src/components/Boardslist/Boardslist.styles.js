export default `
.host {
  min-height: 100%;
  width: 100%;
  background-color: #cd5a91;
  padding: 30px 10px;
}

.titleSection {
  display: flex;
  margin-left: 23px;
  align-items: center;
}

h1 {
  display: inline-block;  
  color: white;
  padding: 10px;
}

h2 {
  color: white;
  padding: 10px;
}

ul {
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  padding-right: 10px;
}

ul li {
  margin-left: 10px;
  margin-bottom: 20px;
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
  color: rgba(250,250,250,0.5);
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

ul.boards {
  margin-top: 20px;
  justify-content: center;
}

.teamSection {
  margin-left: 46px;
  width: 100%;
}

.teamBoards {
  width: 100%;
}
`
