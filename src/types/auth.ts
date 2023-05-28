export type GoogleApiResponse = {
  id: string;
  email: string;
  verified_email: boolean;
  picture: string;
};

export type GithubAccessTokenResponse = {
  access_token: string;
  scope: string;
  token_type: string;
};

export type GithubData = {
  login: string;
  id: number;
  avatar_url: string;
  email: string;
  name: string;
};
