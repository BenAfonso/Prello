export default `
.host {
 
}

.menu {
  display: inline-block;
  position: absolute;
  z-index: 10;
  right: 3px;
  top: 50px;
  width: 300px;
  background: #E2E4E6;
  border-radius: 5px;
  border-left: 1px solid grey;
  border-bottom: 1px solid grey;
  padding-bottom:10px;
}

.menuTitle {
  color:#999;
  font-size: 14px;
  height: 80%;
}

.menuItem {
  padding: 5px;
  padding-top: 0;
  padding-bottom: 10px;
  cursor: pointer;
}

.menuItem:hover {
  background: pink;
}

.menuSeparator {
  height: 1px;
  border-top: 1px solid #ccc;
  display: block;
  margin: 5px;
}


.menuItemTitle {
  line-height: 25px;
  font-size: 13px;
  font-weight: bold;
  width: 100%;
  color: black;
  text-align: left;
}

.menuItemBody {
  line-height: 15px;  
  font-size: 12px;
  color:grey;
  text-align: left;
}

`

