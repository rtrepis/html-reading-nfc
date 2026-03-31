export interface RequirementCheck {
  key: string;
  met: boolean;
  detectable: boolean;
}

export function useRequirementsCheck(): RequirementCheck[] {
  const ua = navigator.userAgent;

  const chromeMatch = ua.match(/Chrome\/(\d+)/);
  const isChrome = !!chromeMatch && !ua.includes('Edg/') && !ua.includes('OPR/');
  const chromeVersion = chromeMatch ? parseInt(chromeMatch[1], 10) : 0;
  const isChrome89 = isChrome && chromeVersion >= 89;

  const isAndroid = /Android/.test(ua);

  const isHttps =
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  return [
    { key: 'browserRequirement1', met: isChrome89, detectable: true },
    { key: 'browserRequirement2', met: isAndroid, detectable: true },
    { key: 'browserRequirement3', met: false, detectable: false },
    { key: 'browserRequirement4', met: isHttps, detectable: true },
  ];
}
