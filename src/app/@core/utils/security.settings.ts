import { NbAuthJWTToken, NbPasswordAuthStrategy } from "@nebular/auth";
import { environment } from "environments/environment";

const socialLinks = [
    /*{
      url: 'https://github.com/akveo/nebular',
      target: '_blank',
      icon: 'github',
    },
    {
      url: 'https://www.facebook.com/akveo/',
      target: '_blank',
      icon: 'facebook',
    },
    {
      url: 'https://twitter.com/akveo_inc',
      target: '_blank',
      icon: 'twitter',
    },*/
  ]
  export const authSettings: any = {
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'access_token', // this parameter tells where to look for the token
        },
        baseEndpoint: environment.backend_url,
        login: {
          endpoint: '/auth/login',
        },
        register: {
          endpoint: '/auth/register'
        },
        logout: {
          endpoint: '/auth/logout'
        }
      })
    ],
    forms: {
      login: {
        redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
        strategy: 'email',  // strategy id key.
        rememberMe: true,   // whether to show or not the `rememberMe` checkbox
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true
        },
        socialLinks: socialLinks // social links at the bottom of a page
      },
      register: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        terms: true,
        socialLinks: socialLinks
      },
      requestPassword: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        socialLinks: socialLinks
      },
      resetPassword: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        socialLinks: socialLinks
      },
      logout: {
        redirectDelay: 500,
        strategy: 'email'
      },
      validation: {
        password: {
          required: true,
          minLength: 4,
          maxLength: 50
        },
        email: {
          required: true,
        },
        fullName: {
          required: false,
          minLength: 4,
          maxLength: 5
        },
      },
    },
  };

  export const securitySettings: any = {
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  };