import React from 'react';
import InlineLink from './InlineLink';
import type {Language} from '../types';

type ArticleProps = {
  language: Language;
};

function EnglishArticle() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
        Clean Room, Claude Code, and the Ticking Time Bomb
      </h1>

      <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-snug">
        Software licensing debates tend to look like dry legal housekeeping until they stop being dry and start sawing at the foundation of the whole system.
      </p>

      <p>That may be where we are now.</p>

      <p>
        What looks like the next AI fight on <InlineLink href="https://en.wikipedia.org/wiki/Twitter">X</InlineLink> is really brushing up against something much older: <InlineLink href="https://en.wikipedia.org/wiki/Software_copyright">software copyright</InlineLink>. That framework has been surprisingly stable since the early 1980s. Now AI code generation is stepping directly on the one spot that hardly anyone could seriously press on for decades.
      </p>

      <p>That is what this is about.</p>

      <hr className="my-12 border-slate-200" />

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">The Basic Rule</h2>

      <p>Every developer knows the rule, even if many only keep it half-consciously in mind:</p>

      <blockquote className="border-l-4 border-[#5C9E9A] pl-6 my-8 italic text-slate-600 text-2xl bg-[#5C9E9A]/10 py-4 pr-4 rounded-r-lg">
        “You cannot simply copy someone else&apos;s code.”
      </blockquote>

      <p>
        Not dramatic. Not new. But a large part of the software market has rested on exactly that point for roughly four decades. Licenses exist because of it. <InlineLink href="https://en.wikipedia.org/wiki/Open-source_software">Open source</InlineLink> exists because of it. Business models exist because of it.
      </p>

      <p>There has always been one awkward exception, though: clean room development.</p>

      <h2 id="clean-room" className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        What Clean Room Actually Is
      </h2>

      <p>
        <InlineLink href="https://en.wikipedia.org/wiki/Clean-room_design">Clean room design</InlineLink> is not magic and not a cheap trick. It is a known legal and technical process for rebuilding a system without copying its code.
      </p>

      <p>The principle is simple:</p>

      <ol className="list-decimal pl-6 my-6 space-y-4 marker:text-[#D93846] marker:font-bold">
        <li className="pl-2">One team analyzes the behavior of the original.</li>
        <li className="pl-2">That work becomes a specification.</li>
        <li className="pl-2">A different team, which has never seen the original code, implements the system from scratch.</li>
      </ol>

      <p>
        If that separation is actually maintained, the result is treated as independent creation rather than copying.
      </p>

      <p>
        This is not new. The examples are old and well known: <InlineLink href="https://en.wikipedia.org/wiki/IBM_PC_compatible">IBM-compatible PC</InlineLink> <InlineLink href="https://en.wikipedia.org/wiki/BIOS">BIOS</InlineLink> clones, <InlineLink href="https://reactos.org/">ReactOS</InlineLink>, Unix-compatible systems built without AT&amp;T code, and various <InlineLink href="https://en.wikipedia.org/wiki/Compatibility_layer">compatibility layers</InlineLink> and reimplementations.
      </p>

      <p>
        The important point is that this was always possible, but it was expensive, slow, and organizationally annoying.
      </p>

      <p>That is exactly the brake that is now disappearing.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Why Clean Room Was Never a Mass Weapon
      </h2>

      <p>
        Historically, clean room work was unpleasant. You needed separated teams, careful documentation, disciplined processes, and often lawyers. Rebuilding a complex system from observable behavior alone was possible, but painfully slow.
      </p>

      <p>That friction kept the whole model stable.</p>

      <p>
        In theory, you could reconstruct a lot. In practice, most people preferred to license the original. Copyright law could live with that.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">Then Codegen Arrived</h2>

      <p>Large language models do not change the law. They change the cost structure.</p>

      <p>Today, an agent can be aimed at materials that used to require a patient human analyst:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2">documentation</li>
        <li className="pl-2">API behavior</li>
        <li className="pl-2">error messages</li>
        <li className="pl-2">protocol traces</li>
        <li className="pl-2">tests</li>
      </ul>

      <p>
        Tests are especially awkward here. A test is not just quality control. It is often a precise behavioral specification: <code className="bg-slate-100 text-[#D93846] px-2 py-1 rounded font-mono text-sm">input → expected output</code>.
      </p>

      <p>
        If a model is run against those tests again and again until everything passes, then functionally you get what a clean-room team used to build through slow manual work.
      </p>

      <p>Only now it is cheap, fast, and easy to scale.</p>

      <p>That is the actual explosive charge.</p>

      <h2 id="claude-code" className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        The Claude Code Case
      </h2>

      <p>
        If the reports are accurate, internal artifacts from <InlineLink href="https://www.anthropic.com/claude-code">Claude Code</InlineLink> leaked. Shortly afterward, “Claw-Code” appeared as a Python reconstruction that reportedly relied on a clean-room-like process.
      </p>

      <p>The interesting part is not Python. The interesting part is not the name.</p>

      <p>
        The interesting part is whether no source code was copied and only behavior was reconstructed.
      </p>

      <p>That is where this becomes uncomfortable.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Copyright Protects Code, Not Behavior
      </h2>

      <p>The legal axis of the whole debate is fairly simple.</p>

      <p>Copyright protects the concrete expression of a program, for example:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2">source code</li>
        <li className="pl-2">binaries</li>
        <li className="pl-2">specific creative expression</li>
      </ul>

      <p>It does not normally protect a program&apos;s pure functionality.</p>

      <p>
        Two programs are therefore allowed to do the same thing. It becomes a problem only if one is an unlawful derivative or copy of the other.
      </p>

      <p>That is why clean room doctrine exists at all.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        What Could Tip for the First Time
      </h2>

      <p>
        The old legal framework comes from a world in which rebuilding a system from observable behavior was expensive. Very expensive.
      </p>

      <p>AI attacks exactly that assumption.</p>

      <p>
        Suddenly, any sufficiently observable system can at least in theory be rebuilt without directly taking the original code. Not copied. Reconstructed.
      </p>

      <p>
        Legally, that is not automatically forbidden. Practically, it is a serious stress test for a system that was never designed for this scale.
      </p>

      <p>If this ever turns into real litigation, the question on the table is not a small niche issue. It is something closer to this:</p>

      <blockquote className="border-l-4 border-[#5C9E9A] pl-6 my-8 italic text-slate-600 text-2xl bg-[#5C9E9A]/10 py-4 pr-4 rounded-r-lg">
        “Is AI-assisted behavioral reconstruction still a valid form of independent implementation?”
      </blockquote>

      <p>
        If courts say yes, clean room goes from a specialist exception to a mass practice. If courts say no, things get even more awkward.
      </p>

      <h2 id="open-source" className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Why This Could Be Dangerous for Open Source
      </h2>

      <p>
        Open source also lives on the fact that behavior is publicly inspectable. Tests matter here. They help maintainers, contributors, and CI systems. They often document expected behavior better than a wiki.
      </p>

      <p>But tests are also specifications.</p>

      <p>
        In a world of capable code generation, open tests turn from a quality tool into a construction plan. Some projects have already noticed and started moving tests out of public view.
      </p>

      <p>A few years ago, that would have sounded absurd. Today it looks rational.</p>

      <p>That alone says a lot about how far the situation has shifted.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">The Actual Risk Is Not AI</h2>

      <p>The convenient story would be: AI threatens open source.</p>

      <p>That is too simple.</p>

      <p>
        The bigger danger may come from companies trying to protect their products through aggressive lawsuits and accidentally creating a precedent that destroys much more than one reconstruction project.
      </p>

      <p>Because if a court eventually says that behavior reconstruction itself is suspect, the fallout does not stop with one AI repo.</p>

      <p>Then a lot more is suddenly at stake:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2"><InlineLink href="https://en.wikipedia.org/wiki/Interoperability">interoperability</InlineLink></li>
        <li className="pl-2"><InlineLink href="https://en.wikipedia.org/wiki/Reverse_engineering">reverse engineering</InlineLink></li>
        <li className="pl-2">compatibility layers</li>
        <li className="pl-2">free replacement implementations</li>
        <li className="pl-2">a large part of how the software ecosystem has developed for decades</li>
      </ul>

      <p>Then it is not just one repo on fire. It is the whole workbench.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">The Uncomfortable Part</h2>

      <p>
        Even if AI-assisted clean-room implementations remain lawful, that does not automatically mean the end of open source.
      </p>

      <p>It more likely means the value shifts even more clearly:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2">community</li>
        <li className="pl-2">speed</li>
        <li className="pl-2">maintenance</li>
        <li className="pl-2">trust</li>
        <li className="pl-2">continued development</li>
        <li className="pl-2">ecosystem integration</li>
      </ul>

      <p>
        Honestly, that was already true before. It was just easier to ignore while code itself still worked as a thicker protective wall.
      </p>

      <p>That wall is getting thinner.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">Conclusion</h2>

      <p>
        Software copyright comes from a time when copying was easy and rebuilding was hard.
      </p>

      <p>
        Now we live in a time when copying is still trivial, but rebuilding has also become dramatically cheaper.
      </p>

      <p>That is the problem.</p>

      <p>
        If the wrong lawsuit creates the wrong precedent in the wrong place, the outcome will not just reshape one product market. It will change the balance of power across software.
      </p>

      <p>
        So the topic is not relevant because a few people on X are shouting. It matters because the old rules are being tested against a world in which behavior can be industrially reconstructed at low cost.
      </p>

      <p>That is not a side issue anymore.</p>
    </>
  );
}

function GermanArticle() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
        Clean Room, Claude Code und die tickende Zeitbombe
      </h1>

      <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-snug">
        Debatten über Software-Lizenzen hält man lange für trockenes Juristenfutter. Bis sie plötzlich nicht mehr trocken sind, sondern anfangen, das Fundament des ganzen Systems anzusägen.
      </p>

      <p>Genau da könnten wir gerade stehen.</p>

      <p>
        Was auf <InlineLink href="https://en.wikipedia.org/wiki/Twitter">X</InlineLink> wie das nächste AI-Drama aussieht, kratzt in Wirklichkeit an etwas deutlich Älterem: am <InlineLink href="https://de.wikipedia.org/wiki/Urheberrecht#Computerprogramme">Urheberrecht für Software</InlineLink>. Dieses Grundgerüst ist seit den frühen 1980ern erstaunlich stabil. Und jetzt kommt KI-Codegenerierung daher und tritt genau auf die Stelle, auf die jahrzehntelang kaum jemand ernsthaft treten konnte.
      </p>

      <p>Darum geht es hier.</p>

      <hr className="my-12 border-slate-200" />

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">Die eigentliche Regel</h2>

      <p>Die Grundregel kennt jeder Entwickler, auch wenn viele sie nur halb bewusst im Kopf haben:</p>

      <blockquote className="border-l-4 border-[#5C9E9A] pl-6 my-8 italic text-slate-600 text-2xl bg-[#5C9E9A]/10 py-4 pr-4 rounded-r-lg">
        „Du darfst fremden Code nicht einfach kopieren.“
      </blockquote>

      <p>
        Nicht spektakulär. Nicht neu. Aber genau darauf beruht seit rund vierzig Jahren ein großer Teil des Softwaremarkts. Lizenzen existieren deshalb. <InlineLink href="https://de.wikipedia.org/wiki/Open_Source">Open Source</InlineLink> existiert deshalb. Firmenmodelle existieren deshalb.
      </p>

      <p>Nur gab es schon immer eine unbequeme Ausnahme: Clean Room Development.</p>

      <h2 id="clean-room" className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Was Clean Room wirklich ist
      </h2>

      <p>
        <InlineLink href="https://de.wikipedia.org/wiki/Clean_Room_Design">Clean Room</InlineLink> ist keine Magie und auch kein billiger Trick. Es ist ein bekanntes juristisch-technisches Verfahren, um ein System nachzubauen, ohne dessen Code zu kopieren.
      </p>

      <p>Das Prinzip ist simpel:</p>

      <ol className="list-decimal pl-6 my-6 space-y-4 marker:text-[#D93846] marker:font-bold">
        <li className="pl-2">Ein Team analysiert das Verhalten des Originals.</li>
        <li className="pl-2">Daraus entsteht eine Spezifikation.</li>
        <li className="pl-2">Ein anderes Team, das den Originalcode nie gesehen hat, implementiert das System neu.</li>
      </ol>

      <p>
        Wenn diese Trennung sauber eingehalten wird, spricht man nicht von Kopie, sondern von unabhängiger Neuerstellung.
      </p>

      <p>
        Das ist kein neues Phänomen. Beispiele gibt es seit Jahrzehnten: BIOS-Nachbauten für <InlineLink href="https://de.wikipedia.org/wiki/IBM-PC-kompatibler_Computer">IBM-kompatible PCs</InlineLink>, <InlineLink href="https://reactos.org/de/">ReactOS</InlineLink>, Unix-kompatible Systeme ohne AT&amp;T-Code und diverse <InlineLink href="https://de.wikipedia.org/wiki/Kompatibilit%C3%A4tsschicht">Kompatibilitätsschichten</InlineLink> und Reimplementierungen.
      </p>

      <p>
        Der entscheidende Punkt: Das war immer möglich, aber es war teuer, langsam und organisatorisch aufwendig.
      </p>

      <p>Und genau diese Bremse fällt gerade weg.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Warum Clean Room früher keine Massenwaffe war
      </h2>

      <p>
        Historisch war Clean Room unerquicklich. Man brauchte getrennte Teams, saubere Dokumentation, disziplinierte Abläufe, oft auch Juristen. Ein komplexes System nur anhand seines Verhaltens nachzubauen, war möglich, aber unerquicklich langsam.
      </p>

      <p>Diese Reibung hat das ganze Modell stabil gehalten.</p>

      <p>In der Theorie konntest du also vieles rekonstruieren. In der Praxis hast du meist lieber lizenziert.</p>

      <p>Damit konnte das Urheberrecht ganz gut leben.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">Und dann kam Codegen</h2>

      <p>Große Sprachmodelle ändern nicht das Gesetz. Sie ändern die Kostenstruktur.</p>

      <p>Heute kann ein Agent auf Dinge angesetzt werden, die früher nur Menschen mit viel Geduld ausgewertet haben:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2">Dokumentation</li>
        <li className="pl-2">API-Verhalten</li>
        <li className="pl-2">Fehlermeldungen</li>
        <li className="pl-2">Protokolle</li>
        <li className="pl-2">Tests</li>
      </ul>

      <p>
        Gerade Tests sind heikel. Ein Test ist nicht nur Qualitätssicherung. Ein Test ist oft eine präzise Verhaltensbeschreibung: <code className="bg-slate-100 text-[#D93846] px-2 py-1 rounded font-mono text-sm">Input rein → erwartetes Ergebnis raus</code>.
      </p>

      <p>
        Wenn ein Modell wiederholt gegen diese Tests läuft und solange Code erzeugt, bis alles grün ist, dann entsteht funktional genau das, was früher ein Clean-Room-Team in mühseliger Kleinarbeit gebaut hätte.
      </p>

      <p>Nur eben billig, schnell und skalierbar.</p>

      <p>Das ist der eigentliche Sprengsatz.</p>

      <h2 id="claude-code" className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Der Fall Claude Code
      </h2>

      <p>
        Wenn die Berichte stimmen, sind interne Artefakte von <InlineLink href="https://www.anthropic.com/claude-code">Claude Code</InlineLink> geleakt. Kurz darauf tauchte mit „Claw-Code“ eine Python-Rekonstruktion auf, die sich sinngemäß auf ein Clean-Room-artiges Vorgehen stützt.
      </p>

      <p>Der interessante Teil ist nicht Python. Der interessante Teil ist auch nicht der Name.</p>

      <p>
        Der interessante Teil ist die Frage, ob hier tatsächlich kein Quellcode kopiert wurde, sondern nur Verhalten rekonstruiert wurde.
      </p>

      <p>Und genau da wird es unangenehm.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Urheberrecht schützt Code, nicht Verhalten
      </h2>

      <p>Das ist die juristische Achse der ganzen Diskussion.</p>

      <p>Urheberrecht schützt die konkrete Ausgestaltung, also zum Beispiel:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2">Quelltext</li>
        <li className="pl-2">Binärdateien</li>
        <li className="pl-2">konkrete kreative Ausdrucksformen</li>
      </ul>

      <p>Es schützt normalerweise nicht die reine Funktion eines Programms.</p>

      <p>
        Zwei Programme dürfen also dasselbe tun. Problematisch wird es erst dann, wenn das eine eine unzulässige Ableitung oder Kopie des anderen ist.
      </p>

      <p>Darum gibt es Clean Room überhaupt.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Was jetzt erstmals kippen könnte
      </h2>

      <p>
        Der alte Rechtsrahmen stammt aus einer Welt, in der das Nachbauen eines Systems aus beobachtbarem Verhalten heraus teuer war. Sehr teuer.
      </p>

      <p>KI nimmt genau diese Annahme auseinander.</p>

      <p>
        Plötzlich kann theoretisch jedes ausreichend beobachtbare System nachgebaut werden, ohne den Originalcode direkt zu übernehmen. Nicht kopiert, sondern rekonstruiert.
      </p>

      <p>
        Juristisch ist das nicht automatisch illegal. Praktisch ist es aber ein massiver Drucktest auf ein System, das nie dafür gebaut wurde.
      </p>

      <p>Falls es hier zu einer echten gerichtlichen Auseinandersetzung kommt, steht am Ende keine kleine Spezialfrage auf dem Tisch, sondern sinngemäß diese:</p>

      <blockquote className="border-l-4 border-[#5C9E9A] pl-6 my-8 italic text-slate-600 text-2xl bg-[#5C9E9A]/10 py-4 pr-4 rounded-r-lg">
        „Ist KI-gestützte Verhaltensrekonstruktion weiterhin eine zulässige Form unabhängiger Implementierung?“
      </blockquote>

      <p>
        Wenn Gerichte das bejahen, wird Clean Room vom Spezialfall zur Massenpraxis. Wenn Gerichte das verneinen, wird es noch unangenehmer.
      </p>

      <h2 id="open-source" className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Warum das für Open Source gefährlich werden kann
      </h2>

      <p>
        Open Source lebt auch davon, dass Verhalten offen überprüfbar ist. Tests sind dabei zentral. Sie helfen Maintainers, Contributors und CI-Systemen. Sie dokumentieren erwartetes Verhalten oft besser als jedes Wiki.
      </p>

      <p>Nur sind Tests eben auch Spezifikationen.</p>

      <p>
        In einer Welt leistungsfähiger Codegenerierung werden offene Tests von einem Qualitätswerkzeug schnell zu einem Bauplan. Einige Projekte haben das längst bemerkt und ziehen Tests aus der Öffentlichkeit zurück.
      </p>

      <p>Vor ein paar Jahren hätte man darüber noch gelacht. Heute ist das plötzlich rational.</p>

      <p>Und das allein zeigt schon, wie stark sich die Lage verschoben hat.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
        Die eigentliche Gefahr ist nicht die KI
      </h2>

      <p>Die bequeme Erzählung wäre: KI bedroht Open Source.</p>

      <p>Ganz so einfach ist es nicht.</p>

      <p>
        Die größere Gefahr könnte ausgerechnet von Firmen kommen, die versuchen, ihre Produkte über aggressive Klagen zu schützen und dabei einen Präzedenzfall lostreten, der viel mehr zerstört als nur ein einzelnes Nachbauprojekt.
      </p>

      <p>Denn wenn ein Gericht am Ende sagt, dass schon die Rekonstruktion von Verhalten problematisch ist, dann betrifft das nicht nur irgendein KI-Projekt.</p>

      <p>Dann steht plötzlich mehr auf dem Spiel:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2"><InlineLink href="https://de.wikipedia.org/wiki/Interoperabilit%C3%A4t">Interoperabilität</InlineLink></li>
        <li className="pl-2"><InlineLink href="https://de.wikipedia.org/wiki/Reverse_Engineering">Reverse Engineering</InlineLink></li>
        <li className="pl-2">Kompatibilitätsschichten</li>
        <li className="pl-2">freie Ersatzimplementierungen</li>
        <li className="pl-2">ein erheblicher Teil dessen, wie sich das Software-Ökosystem seit Jahrzehnten entwickelt hat</li>
      </ul>

      <p>Dann brennt nicht nur ein Repo. Dann brennt die Werkbank.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">Der unbequeme Teil</h2>

      <p>
        Selbst wenn KI-gestützte Clean-Room-Implementierungen rechtlich zulässig bleiben, heißt das nicht automatisch das Ende von Open Source.
      </p>

      <p>Es heißt eher, dass sich der Wert noch klarer verschiebt:</p>

      <ul className="list-disc pl-6 my-6 space-y-3 marker:text-[#5C9E9A]">
        <li className="pl-2">Community</li>
        <li className="pl-2">Geschwindigkeit</li>
        <li className="pl-2">Wartung</li>
        <li className="pl-2">Vertrauen</li>
        <li className="pl-2">Weiterentwicklung</li>
        <li className="pl-2">Integration ins Ökosystem</li>
      </ul>

      <p>
        Ehrlich gesagt war das schon vorher so. Nur konnte man es lange ignorieren, weil der Code selbst noch stärker als Schutzwall funktioniert hat.
      </p>

      <p>Dieser Schutzwall wird gerade dünner.</p>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">Fazit</h2>

      <p>Das Urheberrecht für Software stammt aus einer Zeit, in der Kopieren leicht war und Nachbauen schwer.</p>

      <p>Jetzt leben wir in einer Zeit, in der Kopieren weiterhin trivial ist, Nachbauen aber ebenfalls drastisch billiger geworden ist.</p>

      <p>Genau das ist das Problem.</p>

      <p>
        Wenn der falsche Rechtsstreit an der falschen Stelle den falschen Präzedenzfall schafft, dann verändert sich nicht nur ein Produktmarkt. Dann verändert sich das Kräfteverhältnis im gesamten Softwarebereich.
      </p>

      <p>
        Das Thema ist also nicht deshalb relevant, weil auf X ein paar Leute laut sind. Es ist relevant, weil hier gerade ernsthaft getestet wird, ob die alten Regeln noch zu einer Welt passen, in der Verhalten billig industrialisiert rekonstruiert werden kann.
      </p>

      <p>Und das ist keine Nebensache mehr.</p>
    </>
  );
}

export default function Article({language}: ArticleProps) {
  return (
    <article id="home" className="font-sans leading-relaxed text-slate-700 text-lg md:text-xl space-y-6">
      <div className="mb-12 relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
          <g transform="translate(400, 200) scale(1.8)">
            <polygon points="0,0 50,-86.6 100,0" fill="#F4C430" opacity="0.9"/>
            <polygon points="0,0 -50,-86.6 50,-86.6" fill="#D93846" opacity="0.9"/>
            <polygon points="0,0 -100,0 -50,-86.6" fill="#D65780" opacity="0.9"/>
            <polygon points="0,0 -50,86.6 -100,0" fill="#E2E2E2" opacity="0.9"/>
            <polygon points="0,0 50,86.6 -50,86.6" fill="#5C9E9A" opacity="0.9"/>
            <polygon points="0,0 100,0 50,86.6" fill="#52A474" opacity="0.9"/>
            <polygon points="100,0 150,-86.6 50,-86.6" fill="#E2E2E2" opacity="0.5"/>
          </g>
        </svg>
      </div>

      {language === 'de' ? <GermanArticle /> : <EnglishArticle />}
    </article>
  );
}
