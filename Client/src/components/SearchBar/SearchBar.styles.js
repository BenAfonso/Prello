export default `
.host {

}

input {
  font-size: 15px;
  height: 30px;
  padding: 4px;
  min-width: 200px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.2);
  transition: min-width 0.75s;    
}


input:focus {
  min-width: 300px;
}

.element {
  padding: 15px;
}

.element-text {
  padding: 4px 0px;
  font-size: 15px;
  text-align: left;
}

`
