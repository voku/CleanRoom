export type Language = 'en' | 'de';

export type PromptProjectType =
  | 'compatibility-layer'
  | 'library-rebuild'
  | 'cli-recreation'
  | 'web-app'
  | 'service-migration';

export type PromptSafeguard =
  | 'behavior-only'
  | 'no-source'
  | 'trace-provenance'
  | 'preserve-separation'
  | 'flag-uncertainty'
  | 'document-differences';

export type PromptDeliverable =
  | 'implementation-plan'
  | 'compatibility-matrix'
  | 'tests'
  | 'docs'
  | 'risk-log';

export type PromptFormState = {
  projectType: PromptProjectType;
  projectName: string;
  targetAgent: string;
  sourceArtifacts: string;
  observableBehaviors: string;
  constraints: string;
  safeguards: PromptSafeguard[];
  deliverables: PromptDeliverable[];
};
