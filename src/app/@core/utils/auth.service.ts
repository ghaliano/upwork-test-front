import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import {
  NbAuthService,
  NbTokenService,
  NbTokenStorage,
  NB_AUTH_STRATEGIES,
} from "@nebular/auth";

import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService extends NbAuthService {

  constructor(
    tokenService: NbTokenService,
    protected tokenStorage: NbTokenStorage,
    @Inject(NB_AUTH_STRATEGIES) @Optional() strategies: any,
    private http: HttpClient
  ) {
    super(tokenService, strategies);
  }

  getCompany(term: string) {
    return this.http.get(
      environment.backend_url + "/auth/user-company?term=" + term
    );
  }

  confirmToken(confirmationToken: string) {
    return this.http.post(environment.backend_url + "/auth/token-confirm", {
      confirmation_token: confirmationToken,
    });
  }

  isEmailRegistered(email: string) {
    const url =
      environment.backend_url + "/auth/registered-data/email/" + email;
    return this.http.get(url);
  }

  saveNewPassword(password: string, token: string) {
    return this.http.post(environment.backend_url + "/auth/save-new-password", {
      password: password,
      token: token,
    });
  }

  requestPasswordReset(email: string) {
    const body = {
      email: email,
    };
    const url = `${environment.backend_url}/auth/reset-password`;

    return this.http.post(url, body);
  }

  requestConfirmationToken(email:string){
    return this.http.post(environment.backend_url + "/auth/token-request", {
      email: email,
    });
  }

  removeAccount(){
    return this.http.post(environment.backend_url + "/auth/account/delete", {
    }, this.getJwtTokenHedaer());
  }

  protected getJwtTokenHedaer() {
    return { headers: { Authorization: 'Bearer ' + this.tokenStorage.get() } };
  }

  isValidToken(token: string) {
    const url = `${environment.backend_url}/auth/check-token-validity/${token}`;
    return this.http.get(url);
  }

  me(){
    return this.http.get(environment.backend_url + "/me", this.getJwtTokenHedaer());
  }
}
