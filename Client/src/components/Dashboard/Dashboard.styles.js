export default `
.host {
  background-color: #cd5a91;
  padding: 20px;
  color: #444;
  min-height: 100%;
  padding-bottom: 60px;
}

.date-filter {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.chart {
  width: 45%;
  min-width: 580px;
  min-height: 250px;
  margin-bottom: 20px;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
}

.header {
  color: white;
  font-size: 40px;
}

.title {
  font-weight: bold;
}

.bigNumbers {
  display: flex;
  font-size: 20px;
  justify-content: center;
  padding-right: 20px;
  margin-bottom: 20px;
}

.number {
  font-size: 60px;
  font-weight: bold;
  margin-left: 20px;
}

.number span {
  font-size: 40px;
  font-weight: 400;
  letter-spacing: -3px;
  text-transform: uppercase;
}

`
