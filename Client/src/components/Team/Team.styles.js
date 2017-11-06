export default `

.host {
  height: 100%;
  width: 100%;
  background: #cd5a91;  
}

.teamProfileSection {
  display: flex;
  justify-content: center;
  min-height: 250px;
  background: rgba(250, 250, 250, 0.3);
}

.teamProfileBlock {
  padding: 50px;
  display: flex;
}

.team-avatar {
  display: inline-block;
}

.team-infos {
  display: inline-block;
  padding-left: 20px;
}

.team-name {
  display: inline-block;
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 15px;
}

.team-privacy {
  display: inline-block;
  font-size: 15px;
  padding-left: 20px;
  padding-bottom: 15px;  
}

.tabsSection {
  display: flex;
  background: #cd5a91;
  border-top: 1px white solid;
}

.members {
  width: 100%;
  padding: 0 30px;
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

`
