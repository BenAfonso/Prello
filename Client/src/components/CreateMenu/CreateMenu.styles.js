export default `

.headerButton {
  height: 30px;
  width: 30px;
  border-radius: 5px;
  background: rgba(255,255,255,0.5);
  margin-right: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.headerButton:hover {
  background: rgba(255,255,255,0.3);
}
.separator {
  content: '';
  height: 1px;
  padding: 0;
  background-color: #aaa;
  width: 90%;
  margin: 0 0 0 5%;
}

.element {
  padding: 5px 15px;
}

.element-text {
  padding: 4px 0;
  font-size: 13px;
  color: #666;
  text-align: left;
}

.element:hover {
  background: #ff3399;
  color: white;
}

.element:hover .element-text {
  color: white;
}

.element-title{
  font-size: 15px;
  font-weight: bold;
  text-align: left;  
}


`
