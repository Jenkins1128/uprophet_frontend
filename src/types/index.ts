// ─── Quote ────────────────────────────────────────────────────────────────────

export interface Quote {
  id: number;
  userName: string;
  title: string;
  quote: string;
  likeCount: number;
  didLike: boolean;
  datePosted: string;
}

// ─── Comment ──────────────────────────────────────────────────────────────────

export interface Comment {
  id: number;
  comment: string;
  commenter: string;
  datePosted: string;
}

// ─── User / Auth ──────────────────────────────────────────────────────────────

/** Shape returned by GET /currentUser */
export interface CurrentUser {
  id: number;
  username: string;
  name: string;
  email: string;
}

/** Credentials used for sign-in */
export interface SigninCredentials {
  username: string;
  password: string;
}

/** Credentials used for sign-up */
export interface SignupCredentials {
  name: string;
  username: string;
  password: string;
  email: string;
}

/** Credentials used when initiating a password change */
export interface ChangePasswordCredentials {
  username: string;
  password: string;
}

/** Payload for setting a new password */
export interface NewPasswordPayload {
  username: string;
  newPassword: string;
}

/** Payload for the forgot-password flow */
export interface ForgotPasswordPayload {
  username: string;
  email: string;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export interface UserInfo {
  currentUser: string;
  bio: string;
  favoriters: number;
  favoriting: number;
  didFavorite: boolean;
}

/** Row returned by the favoriters / favoriting list endpoints */
export interface FavoriteRelation {
  /** The "other" user — `from_user` for favoriters, `to_user` for favoriting */
  from_user?: string;
  to_user?: string;
  currentUser: string;
  didFavorite: boolean;
}

/** Row returned by the search endpoint */
export interface SearchResult {
  id: number;
  user_name: string;
  currentUser: string;
  didFavorite: boolean;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface NotificationItem {
  id: number;
  notice: string;
  quotesId: number;
  date: string;
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

export interface ImagePayload {
  name: string;
  image: string; // base64 encoded
}
