export default `
.host {
  background-color: #E2E4E6;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  position: relative;
}

.host.isDragging {
  transform: rotate(4deg);
}

.overlay {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 3px;
}

.title {
  display: inline-block;
  color: #444;
  padding-bottom: 10px;
  padding-top: 7px;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
}

ul {
  overflow-y: auto;
  min-height: 30px;
}

ul li {
  margin-top: 10px;
}

ul li:nth-child(1) {
  margin-top: 0;
}

.newCardButton {
  color: #444;
  opacity: 0.6;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.newCardForm {
  margin-top: 10px;
}

.newCardForm textarea {
  font-size: inherit;
  width: 100%;
  min-height: 80px;
  padding: 8px;
  line-height: 20px;
  border: 0;
  border-radius: 3px;
}

.newCardFormButtons {
  margin-top: 5px;
}

.newCardFormButtons div {
  display: inline-block;
}

.newCardFormButtons div:nth-child(1) {
  margin-right: 10px;
}

.button {
  position: absolute;
  display: inline-block;
  right: 8px;
  top: 8px;
  cursor: pointer;
  float: right;
}

.rename-form {
  padding-bottom: 10px;
}

.rename-input{
  border-radius: 3px;
  padding: 10px;
  font-size: 15px;
}

`
