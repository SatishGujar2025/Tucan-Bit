import { buildStartGameUrl, inferDeviceType, StartGameParams, LaunchGameOptions } from '../utils/groove';

type Deps = {
  grooveDomain: string;
  operatorId: string | number;
  license: string;
  defaultLang: string;
  defaultCurrency: string;
  defaultCountry?: string;
  historyUrl: string;
  homeUrl: string;
  rcUrl?: string;

  isAuthenticated: boolean;
  username?: string | null;

  openLoginModal: () => void;
  openGameModal: () => void;
  setGameUrl: (url: string) => void;
};

export function initGameLauncher(deps: Deps) {
  const {
    grooveDomain, operatorId, license, defaultLang, defaultCurrency, defaultCountry = 'UK',
    historyUrl, homeUrl, rcUrl,
    isAuthenticated, username,
    openLoginModal, openGameModal, setGameUrl
  } = deps;

  return function launchGame(opts: LaunchGameOptions) {
    // Enforce login for real money play
    // if (!isAuthenticated && opts.nogsmode === 'real') {
    //   openLoginModal();
    //   return;
    // }

    const accountid = opts.accountid ?? username ?? 'guest';
    const session = opts.session;
    const country = opts.country ?? defaultCountry;
    const nogslang = opts.language ?? defaultLang;
    const nogscurrency = opts.currency ?? defaultCurrency;
    const device_type = opts.device_type ?? inferDeviceType();

    // Session format: ${operatorId}_${uuid}
    const uuid =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    const sessionid = `${operatorId}_${session}`;

    const params: StartGameParams = {
      accountid,
      country,
      device_type,
      exitUrl: opts.exitUrl ?? homeUrl,
      historyUrl,
      homeurl: homeUrl,
      is_test_account: opts.nogsmode === 'real' ? !!opts.isTestAccount : undefined,
      license,
      nogscurrency,
      nogsgameid: opts.nogsgameid,
      nogslang,
      nogsmode: opts.nogsmode,
      nogsoperatorid: operatorId,
      rc_url: rcUrl,
      sessionid
    };

    const url = buildStartGameUrl(grooveDomain, params);
    setGameUrl(url);
    openGameModal();
  };
}
