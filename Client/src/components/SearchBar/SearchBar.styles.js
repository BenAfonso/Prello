export default `
.host {
  text-align: left;
}

.input-block {
  position:relative;  
}

input {
  font-size: 14px;
  height: 30px;
  color:white;
  padding: 4px;
  padding-left: 30px;
  width: 200px;
  min-width: 200px;
  border-radius: 3px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  transition: min-width 0.75s;    
  background: rgba(255,255,255,0.3);
}

input::placeholder {
  color: white;  
}

input:focus {
  min-width: 300px;
  background: rgba(255,255,255,1);
  color: #666;
}

.input-icon {
  position: absolute;
  left: 5px;
  top: 3px;
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
  height: 40vh;
  padding-top: 10px;
  position: relative;
}

.section-title {
  height: 28px;
  line-height: 18px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}

.section-elements {
  overflow-y: auto; 
  border: 1px solid #eee;
  height: calc(100% - 28px);
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
  color: white!important;
}

.element:hover * {
  color: white !important;
}

.element:hover .icon-late, .element:hover .dueDate, .element:hover .icon-icon, .element:hover .icon-late .icon-text, .element:hover .dueDate .icon-text {
  background: white !important;
  color: #ff3399 !important;
}

.content {
  width: 100%;
  padding: 10px 0;
}

.element-nothing {
  text-align: center;
  font-size: 15px;
  padding-top: 15px;
}

.content-title {
  width: 100%;
}

.content-title-text {
  display: inline-block;
  font-weight: bold;
}

.content-title-info {
  display: inline-block;
  font-size: 13px;
  color: #999;
  margin-left: 5px;
}

.content-title-icon {
}

.dueDate {
  display: inline-block;
  padding: 2px;
  padding-right: 15px;
  background: #eee;
  border-radius: 3px;
  font-size: 12px;
  float: right;
  position: relative;
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

.icon-icon {
  position: absolute;
  top: 2px;
  right: 2px;
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
