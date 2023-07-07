export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.profileTitleSelector);
        this._profileInfomation = document.querySelector(configInfo.profileSubtitleSelector);
        this._profileAvatar = document.querySelector(configInfo.profileAvatar)
    }

    getUserInfo() {
        return {
            nickname: this._profileName.textContent,
            activity: this._profileInfomation.textContent
        }
    }

    setUserInfo({nickname, activity, avatar}) {
        this._profileName.textContent = nickname;
        this._profileInfomation.textContent = activity;
        this._profileAvatar.src = avatar;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }
}
