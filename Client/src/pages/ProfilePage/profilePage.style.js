export default `
.profilePage {
    width: 100%;
    height: 100%;
    background-color: #cd5a91;
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

.input {
    width: 200%;
}
.textarea {
    width: 250%;
}
.input,
.textarea {
    margin-left: 3%;
    display: block;
    border-radius: 3px;
    border: 1px solid #bec5d1;
    padding: 4px 10px;
    background-color: #e2e4e6;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    font-size: 14px;
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
.teamLi,
.boardLi,
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
.textarea:hover {
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

.teamLi,
.boardLi {
    margin-left: 50px;
    margin-bottom: 10px;
    margin-top: 10px;
    width: 80%;
}
.teamLi:hover,
.boardLi:hover {
    background-color: rgb(174, 77, 123);
    color: white;
    width: 80%;
}
.titleAndContentSeparator {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 10px;
    margin-bottom: 40px;
}
.teamSeparator,
.boardSeparator {
    margin-left: 50px;
    width: 80%;
}
.tabSection {
    margin-top: 80px;
    display: flex;
    background: #cd5a91;
    border-top: 1px white solid;
}
`
