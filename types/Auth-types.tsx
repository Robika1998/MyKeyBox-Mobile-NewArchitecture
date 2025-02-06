export type loginType = {
  login: string;
  password: string;
};

export type decodedUserType = {
  Email: string;
  Id: string;
  Role: string;
  exp: number;
  aud: number;
  iss: number;
};
