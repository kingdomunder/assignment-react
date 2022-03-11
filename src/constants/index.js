//localStorage key값 은닉 
export const ACCESS_TOKEN = "Token";
export const BOARD_ALL = "BoardAll";
export const BOARD_ONE = "BoardOne";
export const ADMIN_AUTH = "ROLE_ADMIN";
export const USER_AUTH = "ROLE_USER";
export const IS_LOGIN = "IsLogin";
export const NEED_LOGIN = "NeedLogin";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ROUTE_PATH = {
    "main" : "/",
    "login" : "/login",
    "signup" : "/signup",
    "boardAllView" : "/board/view/all",
    "boardOneView" : "/board/view/",
    "boardWrite" : "/board/write",
    "BoardModify" : "/board/modify/",
    "member" : "/member/search",
    "admin" : "/member/admin"
};

export const API_PATH = {
    "check" : "api/auth/check",
    "login" : "api/auth/login",
    "signup" : "api/auth/signup",
    "boardAllView" : "api/board/all",
    "boardOneView" : "api/board/",
    "boardWrite" : "api/board/",
    "boardModify" : "api/board/",
    "boardDelete" : "api/board/",
    "replyWrite" : "api/board/reply",
    "replyModify" : "api/board/reply",
    "replyDelete" : "api/board/reply",
    "memberOneView" : "api/member/",
    "memberAllView" : "api/member/all",
    "adminModifyMember" : "api/member/",
    "adminAuthMember" : "api/member/auth",
    "adminDeleteMember" : "api/member/"
};

export const DEFAULT = {
    "boardSize" : "10",
    "searchMemberAll" : {
        "page" : "0",
        "size" : "10"
    }
};

export const DATA = {
    "pasErrorData" : "자격 증명에 실패하였습니다." 
};
