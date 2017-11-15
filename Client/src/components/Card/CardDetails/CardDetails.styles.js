export default `

.host {
  position: relative;
  display: flex;
  width: 100%;
  background-color: white;
  borderradius: 8px;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
}

.cancelButton {
  position: absolute;
  top: 10px;
  right: 10px;
}

.content {
  width: calc(100% - 100px);
  height: 100%;
}

.buttons {
  margin-top: 50px;
  width: 100px;
}

.button-text {
  display: inline-block;
  padding: 3px;
}

.buttons li {
  width: 100%;
  margin-bottom: 5px;
}

.element {
  padding: 15px;
}

.element-input {
  padding: 8px 0px;
}

.element-button {
  padding: 8px 0;
}

input {
  font-size: inherit;
  width: 100%;
  padding: 8px;
  border-radius: 3px;
}

.separator {
  content: '';
  height: 1px;
  padding: 0;
  background-color: #aaa;
  width: 90%;
  margin: 8px 0 8px 5%;
}

.rename-form {
  padding-bottom: 10px;
}

.rename-input{
  border-radius: 3px;
  padding: 10px;
  font-size: 15px;
  border: solid 1px #eee;
}

h1 {
  font-size: 20px;
}

.title {
  width: 100%;
  margin-left: 40px;
}

.title .icon {
  position: absolute;
  left: 10px;
  font-size: 20px;
}
`
