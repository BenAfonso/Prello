export default `
.host {
    width: 100%;
    min-height: 120%;
    overflow-y: auto;
    background-color: #cd5a91;
    clear: both;
}
.profileForm {
    display: inline-block;
    vertical-align: top;
}
.editProfilePart,
.profileInfos {
    margin-left: 30%;
    width: 40%;
    min-width: 100px;
}
.biopicDiv {
    margin-bottom: 20px;
    width: 100%;
    word-wrap: break-word;
}
.buttons {
    margin-top: 2%;
    margin-left: 3%;
}
.saveButton {
    margin-right: 5px;
}
.textarea {
    resize: none;
    font-family: Arial;
}
.teamsTitle,
.activityTitle,
.boardsTitle {
    font-size: 120%;
    font-weight: bold;
}
.activityFeedList {
    width: 75%;
    min-width: 300px;
    height: 300px;
    background-color: white;
    border-radius: 15px;
    overflow-y: auto;
    margin: auto;
}
.input,
.textarea {
    margin-left: 3%;
    display: block;
    border-radius: 3px;
    border: 1px solid #bec5d1;
    padding: 4px 10px;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    font-size: 14px;
    width: 200%;
}
label {
    font-weight: bold;
}
.usernameSpan,
.nameSpan,
.biopicDiv,
.teamsTitle,
.activityTitle,
.boardsTitle,
.boardLi,
.modifBoardTitle,
label {
    color: white;
}
.avatarPreview {
    margin-top: 10px;
}
.nameSpan {
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
    font-size: 150%;
    margin-right: 5px;
}
.usernameSpan {
    display: inline-block;
    vertical-align: middle;
}
.avatar {
    display: inline-block;
    vertical-align: middle;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 30px;
}
.subpartProfile {
    display: inline-block;
    vertical-align: top;
}
.formDiv {
    margin-top: 10px;
}
.input:hover,
.textarea:hover,
.passwordInput:hover{
    border: 1px solid #878d96;
}
.input:focus,
.textarea:focus {
    
}
.teamLine,
.activityLine,
.boardsLine { 
    display: flex;
    justify-content: center;
}

.activityLine {
    margin-top: 30px;
}
.teamsList,
.boardsList {
    width: 100%;
    margin-right: 20px;
    display: flex;
    flex-wrap: wrap; 
    word-break: break-all;
    justify-content: center;
}

.teamLi,
.boardLi {
    display: inline-block;
}
.boardLi,
.teamLi {
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-right: 20px;
}

.boardLi:hover {
    background-color: rgb(174, 77, 123);
    color: white;
}
.titleAndContentSeparator {
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10px;
    margin-bottom: 40px;
}
.separator {
    width: 80%;
    min-width: 20px;
    justify-content: center;
    margin-top: 10px;
}

.tabSection {
    margin-top: 80px;
    display: flex;
    background: #cd5a91;
    border-top: 1px white solid;
}
.linkText,
.modifBoardTitle {
    color: white;
    text-decoration: underline;
    margin-left: 20px;
}
.linkText:hover,
modifBoardTitle:hover {
    cursor: pointer;
}
.passwordInput {
    margin-left: 30px;
    display: block;
    border-radius: 3px;
    border: 1px solid #bec5d1;
    padding: 4px 10px;
    background-color: white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    font-size: 14px;
}
.passwordLabel {
    margin-left: 20px;
}
.newPasswordButtons {
    margin-top: 10px;
    margin-left: 20px;
}
.createElement {
    cursor: pointer;
    position: relative;
    background-color: rgba(250,250,250,0.3);
    padding: 10px;
    border-radius: 3px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    width: 270px;
  }
  
.createElement-title {
    height: 50px;
    line-height: 50px;
    color: #dcdcda;
    font-size: 16px;
    text-align: center;
  }

.modificationElement {
    margin-left: 40px;
    width: 80%;
    min-width: 200px;
}
.modifBoardTitle {
    margin-bottom: 5px;
}
.moreOrLessButtons {
    margin-top: 20px;
    margin-left: 40px;
}
.plusButton {
    margin-right: 10px;
}
`
