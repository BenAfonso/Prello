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
  padding-top: 10px;
  position: relative;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}

.section-elements {
  overflow-y: auto; 
  height: 200px;
  border: 1px solid #eee;
}

.section-blur {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(rgba(249,249,249,0), rgba(249,249,249,1));
}

.element {
  padding: 0 10px;
}

.element:hover {
  background: #ff3399;
  color: white;
}

.element:hover .user-name, .element:hover .user-email, .element:hover .content-title-text, .element:hover .content-title-info, .element:hover .element-text {
  color: white;
}

.content {
  width: 100%;
  padding: 10px 0;
}

.element-nothing {
  text-align: center;
  font-size: 15px;
}

.content-title {
  display: flex;
  align-items: baseline; 
}

.content-title-text {
  font-weight: bold;
}

.content-title-info {
  font-size: 13px;
  color: #999;
  margin-left: 5px;
}

.element-text {
  padding: 4px 0px;
  font-size: 13px;
  color: #999;
}

.text-emphasis {
  font-weight: bold;
}

.element-icons {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: 5px;
}

.icons-section {
  display: flex;
  align-items: center;
}

.right .icon {
  margin-left: 10px;
}

.left .icon {
  margin-right: 10px;
}

.icon {
  display: flex;
  align-items: center;
}

.icon-text {
  font-size: 13px;
  margin-right: 5px;
}

.icon-late {
  border-radius: 3px;
  background: rgba(200,0,0,1);
  color: white;
  padding: 0px 5px;
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
