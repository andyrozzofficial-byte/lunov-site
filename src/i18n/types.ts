export type ServiceItem = {
  title: string;
  description: string;
};

export type ProjectCard = {
  title: string;
  description: string;
  meterLabel: string;
  meterValue: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type HeroMockupLabels = {
  fileMeta: string;
  toolbarTabs: [string, string, string];
  monitoring: string;
  bufferOk: string;
  console: string;
  arm: string;
  integrated: string;
  truePeak: string;
  crest: string;
  ingestQueue: string;
  queueRows: [{ name: string; state: string }, { name: string; state: string }];
  phase: string;
  waveform: string;
  waveformMeta: string;
  spectrum: string;
  spectrumMeta: string;
  stereoField: string;
  offlineBounce: string;
  bounceProgress: string;
  bounceMeta: string;
  statusLine: string;
  build: string;
};

export type Messages = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  brand: { subtitle: string };
  nav: {
    home: string;
    services: string;
    projects: string;
    about: string;
    contact: string;
  };
  header: {
    cta: string;
    menuOpen: string;
    menuClose: string;
    switchToEn: string;
    switchToSv: string;
  };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
  };
  heroMockup: HeroMockupLabels;
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: [ServiceItem, ServiceItem, ServiceItem, ServiceItem];
  };
  projects: {
    eyebrow: string;
    heading: string;
    cta: string;
    items: [ProjectCard, ProjectCard, ProjectCard];
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    stats: {
      delivery: { label: string; value: string };
      focus: { label: string; value: string };
      surface: { label: string; value: string };
    };
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
  };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    button: string;
  };
  footer: {
    blurb: string;
    navigation: string;
    services: string;
    follow: string;
    closing: string;
    copyright: string;
  };
};
