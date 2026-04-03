import React, { useMemo, useState } from 'react';
import { Copy, RotateCcw, WandSparkles } from 'lucide-react';
import type {
  Language,
  PromptDeliverable,
  PromptFormState,
  PromptProjectType,
  PromptSafeguard,
} from '../types';

type PromptGeneratorProps = {
  language: Language;
};

const projectTypes: PromptProjectType[] = [
  'compatibility-layer',
  'library-rebuild',
  'cli-recreation',
  'web-app',
  'service-migration',
];

const safeguards: PromptSafeguard[] = [
  'behavior-only',
  'no-source',
  'trace-provenance',
  'preserve-separation',
  'flag-uncertainty',
  'document-differences',
];

const deliverables: PromptDeliverable[] = [
  'implementation-plan',
  'compatibility-matrix',
  'tests',
  'docs',
  'risk-log',
];

const fallbackSafeguards: PromptSafeguard[] = ['behavior-only', 'no-source'];
const fallbackDeliverables: PromptDeliverable[] = ['implementation-plan', 'tests'];
const textAreaFields = [
  'sourceArtifacts',
  'observableBehaviors',
  'constraints',
] as const;

const defaultValues: Record<Language, PromptFormState> = {
  en: {
    projectType: 'compatibility-layer',
    projectName: 'Claw Code compatible shell',
    targetAgent: 'Claude Code / Codex style coding agent',
    sourceArtifacts:
      'Public CLI docs, sample transcripts, API responses, config files, screenshots, and independently written notes from the analysis side.',
    observableBehaviors:
      '- Match command names and flags\n- Preserve output shape and error semantics\n- Keep configuration precedence compatible\n- Recreate only externally visible behavior',
    constraints:
      '- Do not read or quote leaked or proprietary source code\n- Treat unclear behavior as unknown instead of guessing\n- Record all assumptions in the final notes',
    safeguards: ['behavior-only', 'no-source', 'trace-provenance', 'flag-uncertainty'],
    deliverables: ['implementation-plan', 'compatibility-matrix', 'tests', 'risk-log'],
  },
  de: {
    projectType: 'compatibility-layer',
    projectName: 'Claw Code kompatible Shell',
    targetAgent: 'Claude-Code-/Codex-ähnlicher Coding-Agent',
    sourceArtifacts:
      'Öffentliche CLI-Dokumentation, Beispiel-Transkripte, API-Antworten, Konfigurationsdateien, Screenshots und unabhängig erstellte Notizen aus der Analyse-Seite.',
    observableBehaviors:
      '- Befehlsnamen und Flags nachbilden\n- Ausgabestruktur und Fehlersignale erhalten\n- Priorität bei Konfiguration kompatibel halten\n- Nur extern sichtbares Verhalten nachbauen',
    constraints:
      '- Keinen geleakten oder proprietären Quellcode lesen oder zitieren\n- Unklares Verhalten als unbekannt markieren statt zu raten\n- Alle Annahmen in den Abschlussnotizen dokumentieren',
    safeguards: ['behavior-only', 'no-source', 'trace-provenance', 'flag-uncertainty'],
    deliverables: ['implementation-plan', 'compatibility-matrix', 'tests', 'risk-log'],
  },
};

const copy = {
  en: {
    title: 'Clean Room Prompt Generator',
    subtitle:
      'Build a stricter implementation prompt for agentic coding projects without pretending the prompt alone makes the process clean.',
    projectType: 'Project profile',
    projectName: 'Project name',
    targetAgent: 'Target coding agent',
    sourceArtifacts: 'Allowed source artifacts',
    observableBehaviors: 'Observable behavior to reconstruct',
    constraints: 'Hard constraints',
    safeguards: 'Process safeguards',
    deliverables: 'Required deliverables',
    generatedPrompt: 'Generated prompt',
    copyPrompt: 'Copy prompt',
    copied: 'Copied',
    reset: 'Reset',
    hint: 'Use the generated text as the implementation-side prompt after the analysis/specification side has produced an independent brief.',
    placeholderName: 'e.g. Stripe-compatible webhook CLI',
    placeholderAgent: 'e.g. Claude Code, Codex CLI, Cursor Agent',
    profileGuidanceLabel: 'Project-specific guidance',
    sectionsLabel: 'Prompt includes',
    promptIntro: 'This prompt encodes project type, allowed inputs, safeguards, and expected outputs.',
    projectTypeLabels: {
      'compatibility-layer': 'Compatibility layer',
      'library-rebuild': 'Library rebuild',
      'cli-recreation': 'CLI recreation',
      'web-app': 'Web app rebuild',
      'service-migration': 'Service or API migration',
    },
    projectTypeGuidance: {
      'compatibility-layer':
        'Focus on matching externally visible contracts, protocol semantics, and edge-case behavior while avoiding one-to-one internal mimicry.',
      'library-rebuild':
        'Focus on API surface, documented invariants, return values, and compatibility tests for downstream consumers.',
      'cli-recreation':
        'Focus on commands, flags, exit codes, terminal output, config precedence, and scripting compatibility.',
      'web-app':
        'Focus on user-visible flows, navigation, content states, validation behavior, and accessibility expectations.',
      'service-migration':
        'Focus on request and response behavior, failure modes, data contracts, rollout safety, and migration notes.',
    },
    safeguardLabels: {
      'behavior-only': 'Use only behavior, docs, tests, traces, and other non-source artifacts',
      'no-source': 'Reject proprietary, leaked, or otherwise restricted source code',
      'trace-provenance': 'Keep provenance notes for every important assumption',
      'preserve-separation': 'Respect the split between analysis/specification and implementation',
      'flag-uncertainty': 'Flag ambiguity instead of inventing hidden details',
      'document-differences': 'Document deliberate differences from the observed system',
    },
    deliverableLabels: {
      'implementation-plan': 'Implementation plan',
      'compatibility-matrix': 'Compatibility matrix',
      tests: 'Targeted tests',
      docs: 'Developer notes',
      'risk-log': 'Risk and uncertainty log',
    },
    promptSectionNames: {
      role: 'Role',
      objective: 'Objective',
      inputs: 'Approved inputs',
      safeguards: 'Non-negotiable safeguards',
      deliverables: 'Required deliverables',
      workflow: 'Workflow',
      output: 'Final response format',
    },
    promptText: {
      role:
        'You are the clean-room implementation-side coding agent. You must build from an independently prepared specification and behavior evidence, not from copied source.',
      objectivePrefix: 'Recreate the externally visible behavior for',
      inputsIntro: 'You may use only the following materials:',
      workflow: [
        'Start with a short implementation plan based only on the approved inputs.',
        'Translate observable behavior into tests, fixtures, or acceptance criteria before changing code.',
        'When behavior is ambiguous, stop, explain the gap, and propose safe options instead of guessing.',
        'Prefer original structure and naming that satisfy the spec without shadowing protected implementation details.',
      ],
      output: [
        'Summarize what was implemented.',
        'List assumptions and unresolved uncertainty.',
        'Call out any deliberate compatibility gaps.',
        'Reference the tests or checks that demonstrate the recreated behavior.',
      ],
    },
    fallbackAgent: 'the selected agent',
  },
  de: {
    title: 'Clean Room Prompt Generator',
    subtitle:
      'Erzeuge einen strengeren Implementierungs-Prompt für agentische Coding-Projekte, ohne so zu tun, als würde der Prompt allein den Prozess sauber machen.',
    projectType: 'Projektprofil',
    projectName: 'Projektname',
    targetAgent: 'Ziel-Coding-Agent',
    sourceArtifacts: 'Erlaubte Quellartefakte',
    observableBehaviors: 'Nachzubildendes beobachtbares Verhalten',
    constraints: 'Harte Grenzen',
    safeguards: 'Prozess-Sicherungen',
    deliverables: 'Erwartete Ergebnisse',
    generatedPrompt: 'Generierter Prompt',
    copyPrompt: 'Prompt kopieren',
    copied: 'Kopiert',
    reset: 'Zurücksetzen',
    hint: 'Nutze den erzeugten Text als Prompt für die Implementierungs-Seite, nachdem die Analyse-/Spezifikations-Seite ein unabhängiges Briefing erstellt hat.',
    placeholderName: 'z. B. Stripe-kompatibles Webhook-CLI',
    placeholderAgent: 'z. B. Claude Code, Codex CLI, Cursor Agent',
    profileGuidanceLabel: 'Projektspezifische Leitplanke',
    sectionsLabel: 'Der Prompt enthält',
    promptIntro: 'Der erzeugte Text bündelt Projekttyp, erlaubte Eingaben, Sicherungen und erwartete Ausgaben.',
    projectTypeLabels: {
      'compatibility-layer': 'Kompatibilitätsschicht',
      'library-rebuild': 'Bibliotheks-Neuaufbau',
      'cli-recreation': 'CLI-Nachbau',
      'web-app': 'Web-App-Neuaufbau',
      'service-migration': 'Service- oder API-Migration',
    },
    projectTypeGuidance: {
      'compatibility-layer':
        'Konzentriere dich auf externe Verträge, Protokollsemantik und Randfälle, ohne interne Strukturen eins zu eins nachzuahmen.',
      'library-rebuild':
        'Konzentriere dich auf API-Oberfläche, dokumentierte Invarianten, Rückgabewerte und Kompatibilität für Downstream-Nutzer.',
      'cli-recreation':
        'Konzentriere dich auf Befehle, Flags, Exit-Codes, Terminal-Ausgabe, Konfigurations-Priorität und Skript-Kompatibilität.',
      'web-app':
        'Konzentriere dich auf sichtbare Nutzerflüsse, Navigation, Zustände, Validierung und Accessibility-Erwartungen.',
      'service-migration':
        'Konzentriere dich auf Request-/Response-Verhalten, Fehlermodi, Datenverträge, Rollout-Sicherheit und Migrationshinweise.',
    },
    safeguardLabels: {
      'behavior-only': 'Nur Verhalten, Doku, Tests, Traces und andere Nicht-Quellcode-Artefakte verwenden',
      'no-source': 'Proprietären, geleakten oder anderweitig eingeschränkten Quellcode ablehnen',
      'trace-provenance': 'Für wichtige Annahmen Herkunftsnotizen festhalten',
      'preserve-separation': 'Die Trennung zwischen Analyse/Spezifikation und Implementierung respektieren',
      'flag-uncertainty': 'Unklarheiten markieren statt verborgene Details zu erfinden',
      'document-differences': 'Bewusste Abweichungen zum beobachteten System dokumentieren',
    },
    deliverableLabels: {
      'implementation-plan': 'Implementierungsplan',
      'compatibility-matrix': 'Kompatibilitätsmatrix',
      tests: 'Gezielte Tests',
      docs: 'Entwicklernotizen',
      'risk-log': 'Risiko- und Unsicherheitslog',
    },
    promptSectionNames: {
      role: 'Rolle',
      objective: 'Ziel',
      inputs: 'Freigegebene Eingaben',
      safeguards: 'Nicht verhandelbare Sicherungen',
      deliverables: 'Erwartete Ergebnisse',
      workflow: 'Arbeitsablauf',
      output: 'Format der Abschlussantwort',
    },
    promptText: {
      role:
        'Du bist der Coding-Agent auf der Implementierungs-Seite im Clean-Room-Prozess. Du arbeitest aus einer unabhängig erstellten Spezifikation und Verhaltensevidenz, nicht aus kopiertem Quellcode.',
      objectivePrefix: 'Bilde das extern sichtbare Verhalten nach für',
      inputsIntro: 'Du darfst ausschließlich folgende Materialien verwenden:',
      workflow: [
        'Beginne mit einem kurzen Implementierungsplan, der nur auf den freigegebenen Eingaben basiert.',
        'Übersetze beobachtbares Verhalten vor Codeänderungen in Tests, Fixtures oder Akzeptanzkriterien.',
        'Wenn Verhalten unklar ist, stoppe, benenne die Lücke und schlage sichere Optionen vor statt zu raten.',
        'Bevorzuge originelle Struktur und Benennung, die die Spezifikation erfüllen, ohne geschützte Implementierungsdetails nachzuahmen.',
      ],
      output: [
        'Fasse zusammen, was umgesetzt wurde.',
        'Liste Annahmen und verbleibende Unsicherheit auf.',
        'Nenne bewusste Kompatibilitätslücken.',
        'Verweise auf Tests oder Checks, die das rekonstruierte Verhalten belegen.',
      ],
    },
    fallbackAgent: 'den ausgewählten Agenten',
  },
} satisfies Record<
  Language,
  {
    title: string;
    subtitle: string;
    projectType: string;
    projectName: string;
    targetAgent: string;
    sourceArtifacts: string;
    observableBehaviors: string;
    constraints: string;
    safeguards: string;
    deliverables: string;
    generatedPrompt: string;
    copyPrompt: string;
    copied: string;
    reset: string;
    hint: string;
    placeholderName: string;
    placeholderAgent: string;
    profileGuidanceLabel: string;
    sectionsLabel: string;
    promptIntro: string;
    projectTypeLabels: Record<PromptProjectType, string>;
    projectTypeGuidance: Record<PromptProjectType, string>;
    safeguardLabels: Record<PromptSafeguard, string>;
    deliverableLabels: Record<PromptDeliverable, string>;
    promptSectionNames: Record<'role' | 'objective' | 'inputs' | 'safeguards' | 'deliverables' | 'workflow' | 'output', string>;
    promptText: {
      role: string;
      objectivePrefix: string;
      inputsIntro: string;
      workflow: string[];
      output: string[];
    };
    fallbackAgent: string;
  }
>;

function toggleSelection<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function buildPrompt(language: Language, form: PromptFormState) {
  const languageCopy = copy[language];
  const profileName = languageCopy.projectTypeLabels[form.projectType];
  const profileGuidance = languageCopy.projectTypeGuidance[form.projectType];
  const selectedSafeguards =
    form.safeguards.length > 0 ? form.safeguards : fallbackSafeguards;
  const selectedDeliverables =
    form.deliverables.length > 0 ? form.deliverables : fallbackDeliverables;

  const sections = [
    `# ${languageCopy.title}: ${form.projectName || profileName}`,
    `## ${languageCopy.promptSectionNames.role}\n${languageCopy.promptText.role}\n\n${languageCopy.promptText.objectivePrefix} **${form.projectName || profileName}** using a **${profileName.toLowerCase()}** workflow for ${form.targetAgent || languageCopy.fallbackAgent}.`,
    `## ${languageCopy.promptSectionNames.objective}\n- ${profileGuidance}\n- ${form.constraints}`,
    `## ${languageCopy.promptSectionNames.inputs}\n${languageCopy.promptText.inputsIntro}\n${form.sourceArtifacts}`,
    `## ${languageCopy.promptSectionNames.safeguards}\n${selectedSafeguards
      .map((item) => `- ${languageCopy.safeguardLabels[item]}`)
      .join('\n')}`,
    `## ${languageCopy.promptSectionNames.deliverables}\n${selectedDeliverables
      .map((item) => `- ${languageCopy.deliverableLabels[item]}`)
      .join('\n')}`,
    `## ${languageCopy.promptSectionNames.workflow}\n${languageCopy.promptText.workflow
      .map((item) => `- ${item}`)
      .join('\n')}\n- ${form.observableBehaviors}`,
    `## ${languageCopy.promptSectionNames.output}\n${languageCopy.promptText.output
      .map((item) => `- ${item}`)
      .join('\n')}`,
  ];

  return sections.join('\n\n');
}

export default function PromptGenerator({language}: PromptGeneratorProps) {
  const languageCopy = copy[language];
  const [form, setForm] = useState<PromptFormState>(defaultValues[language]);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  const prompt = useMemo(() => buildPrompt(language, form), [form, language]);

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1500);
    } catch {
      setCopyState('idle');
    }
  };

  const resetForm = () => {
    setForm(defaultValues[language]);
    setCopyState('idle');
  };

  return (
    <aside
      id="generator"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl"
    >
      <div className="border-b border-slate-100 bg-slate-800 p-6 text-white">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <WandSparkles className="h-5 w-5 text-[#5C9E9A]" />
          {languageCopy.title}
        </h2>
        <p className="mt-2 text-sm text-slate-300">{languageCopy.subtitle}</p>
      </div>

      <div className="space-y-6 p-8 text-sm leading-relaxed text-slate-700">
        <p className="rounded-2xl border border-[#5C9E9A]/20 bg-[#5C9E9A]/10 px-4 py-3 text-slate-700">
          {languageCopy.hint}
        </p>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="font-semibold text-slate-900">{languageCopy.projectType}</span>
            <select
              value={form.projectType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  projectType: event.target.value as PromptProjectType,
                }))
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-[#5C9E9A] focus:outline-none focus:ring-2 focus:ring-[#5C9E9A]/20"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {languageCopy.projectTypeLabels[type]}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="font-semibold text-slate-900">{languageCopy.projectName}</span>
            <input
              type="text"
              value={form.projectName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  projectName: event.target.value,
                }))
              }
              placeholder={languageCopy.placeholderName}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-[#5C9E9A] focus:outline-none focus:ring-2 focus:ring-[#5C9E9A]/20"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-semibold text-slate-900">{languageCopy.targetAgent}</span>
            <input
              type="text"
              value={form.targetAgent}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  targetAgent: event.target.value,
                }))
              }
              placeholder={languageCopy.placeholderAgent}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-[#5C9E9A] focus:outline-none focus:ring-2 focus:ring-[#5C9E9A]/20"
            />
          </label>

          {textAreaFields.map((field) => (
            <label key={field} className="grid gap-2">
              <span className="font-semibold text-slate-900">{languageCopy[field]}</span>
              <textarea
                value={form[field]}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
                rows={field === 'observableBehaviors' ? 5 : 4}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 focus:border-[#5C9E9A] focus:outline-none focus:ring-2 focus:ring-[#5C9E9A]/20"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-3">
          <h3 className="font-semibold text-slate-900">{languageCopy.safeguards}</h3>
          <div className="grid gap-2">
            {safeguards.map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={form.safeguards.includes(item)}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      safeguards: toggleSelection(current.safeguards, item),
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#5C9E9A] focus:ring-[#5C9E9A]"
                />
                <span>{languageCopy.safeguardLabels[item]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <h3 className="font-semibold text-slate-900">{languageCopy.deliverables}</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {deliverables.map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={form.deliverables.includes(item)}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      deliverables: toggleSelection(current.deliverables, item),
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#5C9E9A] focus:ring-[#5C9E9A]"
                />
                <span>{languageCopy.deliverableLabels[item]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {languageCopy.profileGuidanceLabel}
          </p>
          <p className="mt-3 text-sm text-slate-700">
            {languageCopy.projectTypeGuidance[form.projectType]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {languageCopy.sectionsLabel}
            </span>
            {form.deliverables.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
              >
                {languageCopy.deliverableLabels[item]}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">{languageCopy.generatedPrompt}</h3>
              <p className="mt-1 text-sm text-slate-400">{languageCopy.promptIntro}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#5C9E9A] hover:text-[#5C9E9A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Copy className="h-4 w-4" />
                {copyState === 'copied' ? languageCopy.copied : languageCopy.copyPrompt}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F4C430] hover:text-[#F4C430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <RotateCcw className="h-4 w-4" />
                {languageCopy.reset}
              </button>
            </div>
          </div>

          <pre className="rounded-xl bg-slate-900 p-4 text-sm whitespace-pre-wrap leading-6 text-slate-200">
            {prompt}
          </pre>
        </div>
      </div>
    </aside>
  );
}
