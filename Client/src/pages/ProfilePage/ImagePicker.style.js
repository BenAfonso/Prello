export default `
.imagePicker {
  padding: 20px;
  input;
  width: 5%;
  height: 5%;
  opacity: 0;
  position: absolute;
  overflow: hidden;
  z-index: -1;
}

label {
  position: absolute;
  top: 0;
  left: 0;
  width: 5%;
  height: 5%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.preview {
  position: relative;
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 1px solid deeppink;
  display: flex;
  align-items: center;
  justify-content: center;
}

.previewpreview--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  border: none;
  background-color: rgba(0,0,0,.5);
}
`
