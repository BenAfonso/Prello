export default `
button {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}

.host {
  font-family: 'Open sans', sans-serif;
  position: relative;
  display: inline-block;
}

.dropdown-title {
  color: #444;
  position: relative;
  font-size: 18px;
  padding: 10px;
  text-align: center;
  line-height: 30px;
}

.dropdown-title:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 5%;
  background-color: #aaa;
  height: 1px;
  width: 90%;
}


.dropdown-content {
  position: relative;
  background-color: #f9f9f9;
  min-width: 160px;
  max-width: 340px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  z-index: 10000;
}

.dropdown-content ul li {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  user-select: none;
  cursor: pointer;
}

.dropdown-content ul li .element-title {
  color: #444; 
  font-size: 15px; 
  font-weight: bold;
}

.dropdown-content ul li .element-description {
  margin-top: 5px;
  font-size: 14px;
  word-wrap: break-word;
  color: #888;
}

.dropdown-content ul li.separator {
  content: '';
  height: 1px;
  padding: 0;
  background-color: #aaa;
  width: 90%;
  margin: 8px 0 8px 5%;
}

.dropdown-content ul li:hover {background-color: #f1f1f1}
`
