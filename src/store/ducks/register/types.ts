// import {SignUpData} from '../../../data/sign-up.model';

/**
 * Register Types
 */
export enum RegisterTypes {
  REGISTER_REQUEST = '@register/REQUEST',
  REGISTER_SUCCESS = '@register/SUCCESS',
  REGISTER_FAILURE = '@register/FAILURE',
}

export interface Profile {
  username: string;
  email: string;
}

export interface ProfileState {
  readonly profile: Profile;
  readonly loading: boolean;
  readonly error: boolean;
}