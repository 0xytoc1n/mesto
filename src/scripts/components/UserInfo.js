export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.profileTitleSelector);
        this._profileInfomation = document.querySelector(configInfo.profileSubtitleSelector);
    }

    getUserInfo() {
        return {
            nickname: this._profileName.textContent,
            activity: this._profileInfomation.textContent
        }
    }

    setUserInfo(object) {
        this._profileName.textContent = object.nickname;
        this._profileInfomation.textContent = object.activity;
    }
}
