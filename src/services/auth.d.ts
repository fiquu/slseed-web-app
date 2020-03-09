import { CognitoUser, CognitoUserSession, IAuthenticationCallback } from 'amazon-cognito-identity-js';

export interface Authconfig {
  /**
   * Cognito Identity Pool Id.
   */
  identityPoolId: string;

  /**
   * AWS region.
   */
  region: string;

  /**
   * Cognito credentials.
   */
  credentials: {
    /**
     * The Cognito Client Id.
     */
    ClientId: string;

    /**
     * The Cognito User Pool Id.
     */
    UserPoolId: string;
  };

  /**
   * Auth paths.
   */
  paths: {
    /**
     * Application sign in path.
     */
    signIn: string;
  }
}

export interface AuthData {
  password: string;
  email: string;
}

export interface ConfirmPasswordCallbacks {
  onFailure: (err: Error) => void;
  onSuccess: () => void;
}

export interface ForgotPasswordCallbacks {
  inputVerificationCode?: ((data: any) => void) | undefined;
  onFailure: (err: Error) => void;
  onSuccess: (data: any) => void;
}

export interface ConfirmNewPasswordData extends AuthData {
  code: string;
}

export interface AuthService extends Vue {
  /**
   * Whether the service is loading the auth data.
   */
  loading: boolean;

  /**
   * The current auth data.
   */
  data: any;

  /**
   * Retrieves current user token.
   *
   * @param {object} currentUser The current user in session.
   *
   * @returns {Promise<CognitoUserSession>} A Promise to the session object.
   */
  getUserSession(currentUser: CognitoUser): Promise<CognitoUserSession>;

  /**
   * Retrieves current user in session.
   *
   * @returns {object|null} The current user in session.
   */
  getCurrentUser(): CognitoUser | null;

  /**
   * Authorizes current user.
   *
   * @returns {Promise<CognitoUserSession>} A Promise to the current user session.
   */
  authUser(): Promise<CognitoUserSession>;

  /**
   * Retrieves the appropriate token to perform HTTP requests.
   *
   * @returns {Promise<string>} A Promise to the JWT token.
   */
  getAuthToken(): Promise<string>;

  /**
   * Checks if the user has signed in.
   *
   * @returns {boolean} Whether the user has signed in.
   */
  isSignedIn(): boolean;

  /**
   * Signs a user in.
   *
   * @param {object} data The data to sign in with.
   * @param {object} callbacks The callbacks objects.
   *
   * @returns {Promise<CognitoUser>} A promise to the Cognito User.
   */
  signIn(data: AuthData, callbacks: IAuthenticationCallback): Promise<CognitoUser>;

  /**
   * Signs a user out and redirects.
   *
   * @param {boolean} keep Whether to keep current URL.
   */
  signOut(keep?: boolean): void;

  /**
   * Sets the proper AWS credentials for identity based actions.
   *
   * @returns {Promise<void>} An empty Promise.
   */
  setAWSCredentials(): Promise<void>;

  /**
   * Starts a password recovery flow.
   *
   * @param {object} data The user's data.
   * @param {object} callbacks The callbacks object.
   *
   * @returns {object} The Cognito User object.
   */
  forgotPassword(data: AuthData, callbacks: ForgotPasswordCallbacks): CognitoUser;

  /**
   * Confirms a password change.
   *
   * @param {object} data The data to perform the password change.
   * @param {object} callbacks The callbacks object.
   */
  confirmPassword(data: ConfirmNewPasswordData, callbacks: ConfirmPasswordCallbacks): void;
}

export interface AuthServiceData {
  /**
   * Whether the auth data is being loaded.
   */
  loading: boolean;

  /**
   * The authorization data.
   */
  data: {};
}
