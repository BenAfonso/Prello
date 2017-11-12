export default `
.host {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background: #cd5a91;
  color: white;
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

ul.boards {
  margin-top: 20px;
  justify-content: center;
}

`
