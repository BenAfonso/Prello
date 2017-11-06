export default `

.root {
  position: relative;
  background-color: #fff;
  padding: 10px;
  color: #444;
  border-radius: 3px;
  font-size: 16px;
  width: 100%;
  min-height: 38px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
}

.root:hover {
  background-color: #eee;
}

.editButton {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
}

.root:hover .editButton {
  display: block;
}

.content {
  word-wrap: break-word;
}

input {
  height: 100%;
  width: 100%;
  font-size: 16px;
  background-color: rgba(0,0,0,0);
}

.details {
  margin-top: 10px;
  display: flex;
}

.collaborators {
  display: flex;
  width: calc(100% - 70px);
  justify-content: flex-end;
}

.collaborator {
  margin: 2px;
}

.dueDate {
  display: flex;
  height: 25px;
  width: 70px;
  background: #eee;
  border-radius: 3px;
  font-size: 12px;
  align-items: center;
  margin-top: 5px;
}

.dueDate-icon {
  display: inline-block;
  padding: 3px;
}

.duedate-date {
  display: inline-block;
  padding: 3px;
}

.numbers {
  display: flex;
  margin-top: 10px;
}

.number {
  position: relative;
  line-height: 10px;
  height: 30px;
  margin-right: 20px;
  padding: 5px 8px;
}

.number .icon {
  position: absolute;
  top: 7px;
}

.number span {
  margin-left: 15px;
  font-size: 13px;
  line-height: 20px;
}

.number.completed {
  padding: 5px;
  background-color: rgba(47, 170, 47, 0.7);
  border-radius: 4px;
}


`
