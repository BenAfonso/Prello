export default `
.host {
  position: relative;
  height: 40px;
  padding: 5px 8px;
  width: 100%;
  text-align: center;
  z-index: 1;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}

.brand {
  position: absolute;
  top: 20%;
  left: calc(50% - 40.5px);
  height: 22px;
  width: 81px;
  background-image: url("/assets/prello_logo.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.headerButtonBar {
  position: absolute;
  width: calc(100% - 16px);
}

.buttons {
  position: absolute;
  display: flex;
  height: 100%;
}

.right.buttons {
  right: 0;
}

.left.buttons {
  left: 0;
}

.icon.button {
  height: 30px;
  width: 30px;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.5);
  text-align: center;
  margin-right: 8px;
  line-height: 20px;
  cursor: pointer;
}

.user.button {
  background-color: rgba(0,0,0,0);
  margin-right: 0;
  width: 30px;
}

.dropdown-button {
  width: 30px;
}

.button:hover {
  background: rgba(255,255,255,0.3);
}

.user.button:hover {
  background-color: rgba(0,0,0,0);
}

.logout {
  margin-left: 10px;
}

.logoutButton {
  margin-top: 3px;
}

.button {
  cursor: pointer;
  font-size: 25px;
}
`
