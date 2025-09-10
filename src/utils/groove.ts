export type DeviceType = 'desktop' | 'mobile';

export type LaunchGameOptions = {
  nogsgameid: number;
  nogsmode: 'demo' | 'real';
  session?: string;
  accountid?: string;   
  country?: string;     
  currency?: string;    
  language?: string;    
  isTestAccount?: boolean; 
  exitUrl?: string;     
  device_type?: DeviceType; 
};

export interface StartGameParams {
  accountid: string;
  country: string;
  device_type?: DeviceType;
  exitUrl?: string;
  historyUrl: string;
  homeurl: string;
  is_test_account?: boolean;
  license: string;
  nogscurrency: string;
  nogsgameid: number;
  nogslang: string;
  nogsmode: 'demo' | 'real';
  nogsoperatorid: string | number;
  rc_url?: string;
  realityCheckElapsed?: number;
  realityCheckInterval?: number;
  sessionid: string; // ${operatorId}_${uuid}
}

export function inferDeviceType(): DeviceType {
  if (typeof navigator === 'undefined') return 'desktop';
  return /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

export function buildStartGameUrl(domain: string, p: StartGameParams): string {
  const endpoint = `${domain.replace(/\/+$/, '')}/game`;
  const q = new URLSearchParams();

  q.set('accountid', p.accountid);
  q.set('country', p.country);
  q.set('historyUrl', p.historyUrl);
  q.set('homeurl', p.homeurl);
  q.set('license', p.license);
  q.set('nogscurrency', p.nogscurrency);
  q.set('nogsgameid', String(p.nogsgameid));
  q.set('nogslang', p.nogslang);
  q.set('nogsmode', p.nogsmode);
  q.set('nogsoperatorid', String(p.nogsoperatorid));
  q.set('sessionid', p.sessionid);

  if (p.device_type) q.set('device_type', p.device_type);
  if (p.exitUrl) q.set('exitUrl', p.exitUrl);
  if (typeof p.is_test_account === 'boolean') q.set('is_test_account', String(p.is_test_account));
  if (p.rc_url) q.set('rc_url', p.rc_url);
  if (typeof p.realityCheckElapsed === 'number') q.set('realityCheckElapsed', String(p.realityCheckElapsed));
  if (typeof p.realityCheckInterval === 'number') q.set('realityCheckInterval', String(p.realityCheckInterval));

  return `${endpoint}?${q.toString()}`;
}
