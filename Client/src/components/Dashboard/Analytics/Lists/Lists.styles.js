export default `
.host {
  background-color: #cd5a91;
  padding: 20px;
  color: #444;
  min-height: 100%;
  padding-bottom: 60px;
}

.color.selected {
  border: 3px solid rgba(0,0,0,0.5);
}

.chart {
  width: 45%;
  min-width: 580px;
  max-height: 340px;
  margin-bottom: 40px;
}

.block {
  width: 100%;
}

.group .chart {
  width: calc(45% - 30px);
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
}

.header {
  color: white;
  font-size: 40px;
}

.title {
  position: relative;
  font-weight: bold;
  font-size: 30px;
  color: white;
}

.title:after {
  position: absolute;
  content: '';
  height: 2px;
  bottom: 0;
  left: 0;
  width: 30%;
  background-color: white;
}

.legend {
  width: auto;
  display: flex;
  justify-content: center;
  background-color: rgb(174, 77, 123);
  padding: 10px;
  color: white;
  border-radius: 6px;
  font-size: 20px;
  margin: 30px 0;
}

.list-legend {
  line-height: 20px;
  margin-left: 10px;
  font-weight: 600;
}

.color {
  display: inline-block;
  height: 16px;
  margin-right: 8px;
  width: 40px;
  border-radius: 5px;
}

.chart-group {
  width: 100%;
  background-color: rgb(174, 77, 123);
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px;
}

.group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
`
