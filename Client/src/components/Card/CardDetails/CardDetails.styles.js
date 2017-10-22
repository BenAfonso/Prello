export default `

.host {
  position: relative;
  display: flex;
  width: 100%;
  height: 140vh;
  background-color: white;
  borderradius: 8px;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
}

h1 {
  font-size: 20px;
}

.section .title {
  height: 24px;
  line-height: 24px;
  width: 100%;
}

.section .title h2 {
  font-size: 16px;
}

.section .icon {
  position: absolute;
  left: 10px;
  font-size: 20px;
}

.section {
  margin-left: 40px;
  display: inline-block;
  width: calc(100% - 140px);
  margin-bottom: 40px;
}

.listInformations {
  font-size: 13px;
  color: #999;
}

.sections {
  margin-top: 20px;
  display: flex;
}

.members {
  margin-right: 20px;
}

.labels {
}

.labels ul,
.members ul {
  list-style-type: none;
  display: flex;
}

.labels ul li,
.members ul li {
  margin-right: 5px;
}

.label {
  height: 30px;
  width: 40px;
  border-radius: 3px;
}

.subsectionTitle {
  font-size: 14px;
  color: #999;
}

.addButton {
  height: 30px;
  width: 30px;
  background-color: #eee;
  border-radius: 3px;
  text-align: center;
}

.addButton:hover {
  background-color: #ddd;
}

.edit {
  margin-top: 20px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

.content {
  width: calc(100% - 100px);
  height: 100%;
}

.buttons {
  margin-top: 50px;
  width: 100px;
}

.buttons li {
  width: 100%;
  margin-bottom: 5px;
}
`
