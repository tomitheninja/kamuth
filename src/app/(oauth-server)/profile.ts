import { v4 as uuid } from "uuid";

export interface ProfileData {
  redirectUri: string;
  displayName: string;
  givenName: string;
  internal_id?: string;
  mail?: string;
}

export class Profile {
  readonly data: ProfileData;

  constructor({
    displayName,
    givenName,
    internal_id = uuid(),
    mail,
    redirectUri,
  }: ProfileData) {
    this.data = {
      redirectUri,
      displayName,
      givenName,
      internal_id,
      mail: mail || internal_id + "@example.com",
    };
  }

  serialize() {
    return btoa(JSON.stringify(this.data));
  }

  static fromString(str: string) {
    return new Profile(JSON.parse(atob(str)));
  }
}
