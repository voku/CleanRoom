import React from 'react';
import { ShieldAlert } from 'lucide-react';
import InlineLink from './InlineLink';
import type {Language} from '../types';

type PromptGeneratorProps = {
  language: Language;
};

function EnglishPanel() {
  return (
    <>
      <div className="border-b border-slate-100 bg-slate-800 p-6 text-white">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ShieldAlert className="h-5 w-5 text-[#5C9E9A]" />
          Prompt Generator? This is where it gets tricky.
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          The problem is not whether an LLM can be told to behave. The problem is whether the overall process was actually independent.
        </p>
      </div>

      <div className="space-y-6 p-8 text-base leading-relaxed text-slate-700">
        <p>
          The next idea is obvious: if <InlineLink href="https://en.wikipedia.org/wiki/Clean-room_design">clean room</InlineLink> work can now be accelerated by LLMs, why not build a neat prompt generator and formalize the workflow?
        </p>

        <p>Because that is exactly where the boundary starts to blur.</p>

        <p>
          A real clean-room process does not become clean just because a prompt says “do not copy proprietary code.” It depends on organizational separation, traceable provenance of the specification, careful documentation, and a credible split between observed behavior and protected implementation details.
        </p>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">What still matters</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-amber-500">
            <li className="pl-2">organizational separation between analysis and implementation</li>
            <li className="pl-2">clear provenance for the resulting specification</li>
            <li className="pl-2">documentation that can survive legal scrutiny</li>
            <li className="pl-2">a real distinction between behavior and copied expression</li>
          </ul>
        </div>

        <p>A text box with a few placeholders does not replace any of that.</p>

        <p>
          If you build such a generator, you are not just building a tool. You may also be building a legal and ethical fog machine.
        </p>

        <blockquote className="rounded-r-lg border-l-4 border-[#5C9E9A] bg-[#5C9E9A]/10 py-4 pl-6 pr-4 text-xl italic text-slate-600">
          “Do not use proprietary code.”
        </blockquote>

        <p>
          That sentence is easy to produce. The hard question is whether the process behind it would still qualify as independent implementation rather than dressed-up <InlineLink href="https://en.wikipedia.org/wiki/Reverse_engineering">reverse engineering</InlineLink> with plausible deniability.
        </p>

        <p>And that is not something a nice UI button can prove.</p>
      </div>
    </>
  );
}

function GermanPanel() {
  return (
    <>
      <div className="border-b border-slate-100 bg-slate-800 p-6 text-white">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ShieldAlert className="h-5 w-5 text-[#5C9E9A]" />
          Clean Room Prompt Generator? Genau da wird es heikel.
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Das Problem ist nicht, ob ein LLM brav klingt. Das Problem ist, ob der Gesamtprozess am Ende wirklich unabhängig war.
        </p>
      </div>

      <div className="space-y-6 p-8 text-base leading-relaxed text-slate-700">
        <p>
          Natürlich liegt die nächste Idee auf der Hand: Wenn <InlineLink href="https://de.wikipedia.org/wiki/Clean_Room_Design">Clean Room</InlineLink> jetzt teilweise durch LLMs beschleunigt werden kann, warum nicht einfach einen Prompt-Generator bauen, der das Ganze formalisiert?
        </p>

        <p>Weil genau dort die Grenze unscharf wird.</p>

        <p>
          Ein sauberer Clean-Room-Prozess lebt nicht nur davon, dass irgendwo „bitte nichts Proprietäres kopieren“ im Prompt steht. Er lebt von organisatorischer Trennung, nachvollziehbarer Herkunft der Spezifikation, sauberer Dokumentation und einer belastbaren Trennung zwischen beobachtetem Verhalten und geschützter Implementierung.
        </p>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Worauf es weiterhin ankommt</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-amber-500">
            <li className="pl-2">organisatorische Trennung zwischen Analyse und Implementierung</li>
            <li className="pl-2">nachvollziehbare Herkunft der Spezifikation</li>
            <li className="pl-2">Dokumentation, die einer Prüfung standhält</li>
            <li className="pl-2">eine echte Trennung zwischen Verhalten und geschützter Ausdrucksform</li>
          </ul>
        </div>

        <p>Ein Textfeld mit ein paar Platzhaltern ersetzt das nicht.</p>

        <p>
          Wer so einen Generator baut, baut deshalb nicht nur ein Werkzeug. Er baut im Zweifel auch eine rechtliche und ethische Nebelmaschine.
        </p>

        <blockquote className="rounded-r-lg border-l-4 border-[#5C9E9A] bg-[#5C9E9A]/10 py-4 pl-6 pr-4 text-xl italic text-slate-600">
          „Nutze keinen proprietären Code.“
        </blockquote>

        <p>
          Das ist schnell hingeschrieben. Die eigentliche Frage ist, ob der Gesamtprozess am Ende tatsächlich unabhängig war und nicht bloß hübsch verpacktes <InlineLink href="https://de.wikipedia.org/wiki/Reverse_Engineering">Reverse Engineering</InlineLink> mit Ausrede.
        </p>

        <p>Und genau das lässt sich nicht mit einem netten UI-Button beweisen.</p>
      </div>
    </>
  );
}

export default function PromptGenerator({language}: PromptGeneratorProps) {
  return (
    <aside
      id="generator"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl"
    >
      {language === 'de' ? <GermanPanel /> : <EnglishPanel />}
    </aside>
  );
}
