export default `
.NewComment {
  font-family: 'Open Sans', sans-serif;
}

.author {
  position: relative;
}

.author .avatar {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
}

.content {
  margin-left: 40px;
  font-size: 13px;
}

.content .card {
  border: none;
  outline: none;
  resize: vertical;
  overflow: visible;
  display: block;
  width: 100%;
  padding: 8px;
  padding-bottom: 50px;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  border-radius: 3px;
}

.saveButton {
  padding: 8px;
  background-color: rgb(40, 175, 40);
  width: 60px;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  font-size: 13px;
  color: white;
  margin-top: 8px;
  cursor: pointer;
}
`
