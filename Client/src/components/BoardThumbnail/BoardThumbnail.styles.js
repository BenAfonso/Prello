export default `
.host {
  position: relative;
  background-color: #ae4d7b;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  width: 270px;
}

.title {
  height: 50px;
  line-height: 50px;
  color: #dcdcda;
  font-weight: bold;
  font-size: 16px;
}

.favorite {
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 0.5;
}

.host:hover {
  transform: translateY(-10px) rotate(-3deg);
}

`
