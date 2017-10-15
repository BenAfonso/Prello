export default `
.menu {
  display: inline-block;
  position: absolute;
  z-index: 10;
  right: 3px;
  top: 50px;
  width: 300px;
  background: #E2E4E6;
  border-radius: 5px;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  padding-bottom: 10px;
}

.menuTitle {
  color: #666;
  font-size: 14px;
}

.menuItem {
  padding: 15px;
  cursor: pointer;
}

.menuItem:hover {
  background: #bbb;
}

.menuSeparator {
  height: 1px;
  border-top: 1px solid #999;
  display: block;
}

.menuItemTitle {
  height: 15px;
  line-height: 15px;
  font-size: 13px;
  font-weight: bold;
  width: 100%;
  color: black;
  text-align: left;
}

.menuItemBody {
  line-height: 15px;
  font-size: 12px;
  color: #666;
  text-align: left;
}
`
