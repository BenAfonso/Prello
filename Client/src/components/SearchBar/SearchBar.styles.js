export default `
.host {
  text-align: left;
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

.search-content {
  width: 600px;
}

.separator {
  content: '';
  height: 1px;
  padding: 0;
  background-color: #aaa;
}

.search-column {
  display: flex;
}

.section {
  width: 300px;
  padding: 10px 0;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}

.section-elements {
  overflow-y: auto; 
  max-height: 200px;
}

.element {
  padding: 0 10px;
}

.element:hover {
  background: #ff3399;
  color: white;
}

.element:hover .user-name, .element:hover .user-email {
  color: white;
}

.content {
  width: 100%;
  padding: 5px 0;  
}

.element-title {
  padding: 4px 0px;
  font-size: 15px;
  font-weight: bold;
}

.element-text {
  padding: 4px 0px;
  font-size: 13px;
}

.user {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.user-infos {
  padding: 0 10px;
  overflow: hidden;
}

.user-name {
  font-weight: bold;
  color: #000;
}

.user-email {
  font-style: italic;
  font-size: 13px;
  color: #999;        
}

`
