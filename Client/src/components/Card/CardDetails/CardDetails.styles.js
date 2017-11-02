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
`
