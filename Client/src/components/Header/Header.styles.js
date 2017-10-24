export default `
.host {
  position: relative;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
}

.brand {
  position: absolute;
  top: 20%;
  left: calc(50% - 100px);
  height: 60%;
  width: 200px;
  background-image: url("/assets/prello_logo.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.headerButtonBar {
  display: inline-block;
  float: right;
}

.headerButton {
  display: inline-block;
  margin-top: 5px;
  margin-right : 5px;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background: rgba(255,255,255,0.5);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.headerButton:hover {
  background: rgba(255,255,255,0.3);
}

`
