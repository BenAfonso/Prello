export default `

.root {
  background-color: #fff;
  padding: 10px;
  color: #444;
  border-radius: 3px;
  font-size: 16px;
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

.collaborators {
  display: flex;
  margin-top: 5px;
  width: 100%;
  height: 25px;
  justify-content: flex-end;
}

.collaborator {
  margin: 2px;
}

.dueDate {
  display: flex;
  width: 70px;
  background: #eee;
  border-radius: 3px;
  font-size: 12px;
  align-items: center;
}

.dueDate-icon {
  display: inline-block;
  padding: 3px;
}

.duedate-date {
  display: inline-block;
  padding: 3px;
}


`
