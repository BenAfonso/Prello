export default `
.host {
  background-color: #E2E4E6;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
}

.title {
  color: #444;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 16px;
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

.button {
  display: inline-block;
  height: 35px;
  width: 100px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  text-shadow: 3px 2px #878f9b;
  color: white;
  position: relative;
  text-align: center;
  line-height: 35px;
 }

.confirm {
  background-color: #5AAC44;
  margin-right: 10px;
}

.confirm:hover {
  background-color: #028e23
}

.cancel {
  background-color: grey;
}

.cancel:hover {
  background-color: #a4aaa5;
}
`
