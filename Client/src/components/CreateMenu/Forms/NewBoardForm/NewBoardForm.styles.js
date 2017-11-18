export default `
.host {
  width: 100%;
  display:flex;
}

.users-list {
  overflow-y: auto;
}
.element {
  padding: 15px;
}

.element-title{
  font-weight: bold;
  text-align: left;
  padding: 4px 0;      
}

.element-text {
  padding: 4px 0px;
  font-size: 15px;
  text-align: left;
}

.team,
.template {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.team-name,
.template-name {
  input-size: 15px;
  padding-left: 5px;
}
.template-name {
  display: block;
}

.add-button {
  width: 100%;
}

.teamForm {
  display: inline-block;
  padding-left: 5px;
}

.add-team {
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
}

.element-input input {
  font-size: inherit;
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.2);
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
}

input[type=checkbox] {
  height: 20px;
  width: 20px;
}

input[type=color] {
  height: 50px;
}

select {
  width: 100%;
  overflow-y: auto;
}

.separator {
  content: '';
  height: 1px;
  padding: 0;
  background-color: #aaa;
  width: 90%;
  margin: 8px 0 8px 5%;
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
`
