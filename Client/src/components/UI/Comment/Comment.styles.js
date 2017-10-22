export default `
.comment {
  text-align: left;
  font-family: 'Open Sans', sans-serif;
}

.author {
  position: relative;
  height: 25px
}

.author .username {
  font-size: 14px;
  padding-left: 40px;
  font-weight: bold;
}

.author .avatar {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
}

.content {
  margin-left: 40px;
  font-size: 13px;
}

.content .card {
  display: inline-block;
  padding: 8px;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  border-radius: 3px;
}

.content .informations {
  color: #888;
  font-size: 12px;
  margin-top: 8px;
}

.informations .link {
  text-decoration: underline;
  cursor: pointer;
}

.informations *:nth-child(n) {
  position: relative;
  margin-right: 15px;
}

.informations *:nth-child(n):before {
  position: absolute;
  content: '-';
  left: -9px;
  margin-right: 5px;
}

.informations *:nth-child(1):before {
  content: '';
}
`
