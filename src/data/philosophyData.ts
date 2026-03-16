import type { MindMapNode, PhilosophyTags } from '../types';

/** Root node for the TJump Philosophy mind map. Nodes align with section items in SECTION_ITEMS. */
export const MIND_MAP_ROOT: MindMapNode = {
  id: 'root',
  name: 'TJump Philosophy',
  children: [
    {
      id: 'epistemology',
      name: 'Epistemology',
      children: [
        { id: 'three_tier_knowledge', name: 'Three-Tiered Knowledge', file: 'knowledge/epistemology/three_tier_knowledge.md' },
        { id: 'novel_testable_predictions', name: 'Novel Testable Predictions', file: 'knowledge/epistemology/ntps.md' },
        { id: 'foundationalism', name: 'Foundationalism', file: 'knowledge/epistemology/foundationalism.md' },
        { id: 'jtb', name: 'Justified True Belief', file: 'knowledge/epistemology/jtb.md' },
        { id: 'agrippa_trilemma', name: "Agrippa's Trilemma", file: 'knowledge/epistemology/agrippa_trilemma.md' },
        { id: 'map_vs_territory', name: 'Map vs. Territory', file: 'knowledge/epistemology/map_vs_territory.md' },
        { id: 'brute_facts', name: 'Brute Facts', file: 'knowledge/metaphysics/brute_facts.md' },
        { id: 'physicalism', name: 'Physicalism', file: 'knowledge/metaphysics/physicalism.md' },
        { id: 'nominalism', name: 'Mathematical Nominalism', file: 'knowledge/metaphysics/nominalism.md' },
        { id: 'moral_naturalism', name: 'Moral Naturalism & BAPW', file: 'knowledge/ethics/moral_naturalism.md' },
        { id: 'consciousness_functionalism', name: 'Consciousness & Functionalism', file: 'knowledge/metaphysics/consciousness.md' },
        { id: 'parsimony', name: 'Parsimony', file: 'knowledge/epistemology/parsimony.md' },
        { id: 'methodological_naturalism', name: 'Methodological Naturalism', file: 'knowledge/epistemology/methodological_naturalism.md' },
        { id: 'coherentism', name: 'Coherentism', file: 'knowledge/epistemology/coherentism.md' },
        { id: 'reliabilism', name: 'Reliabilism', file: 'knowledge/epistemology/reliabilism.md' },
      ],
    },
    {
      id: 'arguments',
      name: 'Arguments',
      children: [
        { id: 'cosmological', name: 'Cosmological Argument', file: 'arguments/cosmological_argument.md' },
        { id: 'fine_tuning', name: 'Fine-Tuning Argument', file: 'arguments/fine_tuning_argument.md' },
        { id: 'moral_euthyphro', name: 'Moral / Euthyphro', file: 'arguments/moral_euthyphro.md' },
        { id: 'ontological_critique', name: 'Ontological Argument Critique', file: 'arguments/ontological_critique.md' },
        { id: 'id_critique', name: 'ID Critique', file: 'arguments/id_critique.md' },
        { id: 'presuppositionalism_critique', name: 'Presuppositionalism Critique', file: 'arguments/presuppositionalism_critique.md' },
      ],
    },
    {
      id: 'debate_methods',
      name: 'Debate Methods',
      children: [
        { id: 'burden_of_proof', name: 'Burden of Proof', file: 'knowledge/debate_methods/burden_of_proof.md' },
        { id: 'probabilistic', name: 'Probabilistic Reasoning', file: 'knowledge/debate_methods/probabilistic_reasoning.md' },
        { id: 'reductio', name: 'Reductio ad Absurdum', file: 'knowledge/debate_methods/reductio_ad_absurdum.md' },
      ],
    },
    {
      id: 'humor',
      name: 'Humor & Style',
      children: [
        { id: 'sarcasm', name: 'Sarcasm', file: 'knowledge/humor_style/sarcasm.md' },
        { id: 'debate_jokes', name: 'Debate Jokes', file: 'knowledge/humor_style/debate_jokes.md' },
      ],
    },
  ],
};

export type SectionKind = 'epistemology' | 'arguments' | 'debates' | 'transcripts' | 'evaluations';

export interface SectionItem {
  id: string;
  title: string;
  summary: string;
  tags: PhilosophyTags;
  markdown?: string;
}

const defaultTags: PhilosophyTags = { topic: 'epistemology' };

export const SECTION_ITEMS: Record<SectionKind, SectionItem[]> = {
  epistemology: [
    {
      id: 'foundationalism',
      title: 'Foundationalism',
      summary: 'Knowledge rests on basic beliefs that are self-justified or indubitable. TJump often challenges this by arguing knowledge can be probabilistic.',
      tags: { ...defaultTags, topic: 'epistemology', debate_mode: 'probabilistic_reasoning' },
      markdown: `# Foundationalism

## Concept
Foundationalism claims that knowledge rests on basic beliefs that are self-justified or indubitable (e.g. Descartes’ cogito, or certain perceptual beliefs).

## TJump Position
TJump typically challenges foundationalism by arguing that knowledge can be probabilistic and does not require absolute foundations. Justification can be a matter of degree.

## Transcript Example
Video: Epistemology Debate 2022
Timestamp: 04:23

"The idea that knowledge must be grounded in some infallible belief is flawed. We can have well-supported beliefs without certainty."

## Related
- Coherentism
- Reliabilism
- Justified True Belief
`,
    },
    {
      id: 'coherentism',
      title: 'Coherentism',
      summary: 'Justification comes from coherence within a belief system rather than from foundational beliefs.',
      tags: { ...defaultTags, topic: 'epistemology' },
      markdown: `# Coherentism

## Concept
Justification comes from coherence within a belief system rather than from foundational beliefs. Beliefs support each other in a network.

## TJump Position
TJump's emphasis on novel testable predictions and virtuous vs. vicious circularity fits with a coherence-friendly view: what matters is whether the system makes predictions that break symmetry and get confirmed. Coherence alone isn't enough without predictive success.

## Related
- Foundationalism
- Agrippa's Trilemma
- Reliabilism
`,
    },
    {
      id: 'reliabilism',
      title: 'Reliabilism',
      summary: 'A belief is justified if it is produced by a reliable cognitive process.',
      tags: { ...defaultTags, topic: 'epistemology' },
      markdown: `# Reliabilism

## Concept
A belief is justified if it is produced by a reliable cognitive process — one that tends to produce true beliefs.

## TJump Position
Science and NTPs are the paradigmatic reliable process for empirical beliefs. Reliabilism fits the view that we don't need infallible foundations; we need processes (e.g. prediction and verification) that reliably track reality.

## Related
- Justified True Belief
- Methodological Naturalism
- Novel Testable Predictions
`,
    },
    {
      id: 'three_tier_knowledge',
      title: 'Three-Tiered Knowledge System',
      summary: 'Metaphysical (cogito), conceptual (logic/math), and empirical (NTPs) tiers. TJump\'s core epistemological framework.',
      tags: { ...defaultTags, topic: 'epistemology', methodology: 'conceptual_analysis' },
      markdown: `# Three-Tiered Knowledge System

## Concept
A structured view of how we know things: from absolute certainty to analytic truth to empirical verification.

## TJump Position

**1. Metaphysical Tier (Absolute Certainty)**
- The Cogito: "I think, therefore I am" — the only absolute truth
- Not a logical argument but a descriptive statement of immediate experience
- Foundation: "Reality is reality" — the basis for all other knowledge

**2. Conceptual Tier (Analytic Truth)**
- Contains: Logic, mathematics, intuition
- Characterized as "imaginary" — ideas existing in the brain
- True by definition within linguistic frameworks
- Math and logic are "formal languages" invented to describe reality; descriptive, not prescriptive

**3. Empirical Tier (Synthetic Truth)**
- Contains: External world, other minds, physical phenomena
- Requires verification through novel testable predictions (NTPs)
- Knowledge defined as Justified True Belief
- Evidence = what differentiates imagination from reality

## Related
- Novel Testable Predictions
- Justified True Belief
- Map vs. Territory
`,
    },
    {
      id: 'novel_testable_predictions',
      title: 'Novel Testable Predictions (NTPs)',
      summary: 'A hypothesis stays "imaginary" until it predicts previously unknown phenomena that are then verified. Core standard of evidence.',
      tags: { ...defaultTags, topic: 'epistemology', methodology: 'model_comparison' },
      markdown: `# Novel Testable Predictions

## Concept
The standard that separates evidence from post hoc storytelling: predictions about future or previously unknown phenomena that are then verified.

## TJump Position

**Core Principle**: A hypothesis remains "imaginary" until it makes predictions about previously unknown phenomena that are then verified.

**Why Post Hoc Reasoning Fails**
- Infinitely many theories can explain existing data
- Post hoc explanations are "gap fillers" not evidence
- Must predict future, unknown information to count as evidence
- Example: Predicting the sun rises tomorrow is not novel; predicting where a transitional fossil will be found is novel

**Application**: Science (evolution, relativity) succeeds because it makes hundreds of thousands of confirmed NTPs; theology fails because it only provides post hoc stories.

## Related
- Three-Tiered Knowledge
- Methodological Naturalism
- ID / Fine-Tuning critiques
`,
    },
    {
      id: 'jtb',
      title: 'Justified True Belief',
      summary: 'Knowledge as JTB: belief that is true and justified. For empirical claims, justification comes via NTPs and reliable methods.',
      tags: { ...defaultTags, topic: 'epistemology' },
      markdown: `# Justified True Belief

## Concept
Classical analysis of knowledge: S knows that p iff S believes p, p is true, and S is justified in believing p.

## TJump Position
For the empirical tier, knowledge is Justified True Belief. Evidence is what differentiates imagination from reality — and that evidence is delivered by novel testable predictions. Justification is not infallible; it can be probabilistic and still count as knowledge.

## Related
- Three-Tiered Knowledge
- Novel Testable Predictions
- Reliabilism
`,
    },
    {
      id: 'agrippa_trilemma',
      title: "Agrippa's Trilemma",
      summary: 'All knowledge rests on infinite regress, circularity, or dogmatism. TJump: every worldview has this; NTPs break vicious circularity.',
      tags: { ...defaultTags, topic: 'epistemology', debate_mode: 'socratic' },
      markdown: `# Agrippa's Trilemma

## Concept
The problem that all justification must end somewhere: either infinite regress, circular reasoning, or foundationalism/dogmatism.

## TJump Position
Every worldview has this problem, including theism. The key is virtuous vs. vicious circularity. Virtuous: trivial/definitional truths, methodologically consistent, the Cogito as descriptive fact. Vicious: baseless assertions; "Bible is true because God wrote it; God exists because Bible says so" — no independent evidence. Novel testable predictions break the symmetry.

## Related
- Foundationalism
- Map vs. Territory
- Brute Facts
`,
    },
    {
      id: 'map_vs_territory',
      title: 'Map vs. Territory',
      summary: 'Map = our descriptions, logic, concepts. Territory = actual reality. Reification is treating the map as the territory.',
      tags: { ...defaultTags, topic: 'epistemology', methodology: 'conceptual_analysis' },
      markdown: `# Map vs. Territory Analogy

## Concept
The distinction between our representations of reality (map) and reality itself (territory).

## TJump Position
**The Map**: Our descriptions, languages, logic, math, concepts. **The Territory**: Actual reality; what exists independently. Applications: Reification Fallacy (treating abstract concepts as concrete entities); moral intuitions are the map, morality is territory; numbers are descriptive labels, not concrete objects. Critical principle: "Saying so does not make it so" — definitions don't create reality.

## Related
- Mathematical Nominalism
- Ontological Argument critique
- Brute Facts
`,
    },
    {
      id: 'brute_facts',
      title: 'Brute Facts in Naturalism',
      summary: 'Unanalyzable primitives that stop justification chains. TJump: "Reality is reality" is more parsimonious than "God is God."',
      tags: { ...defaultTags, topic: 'metaphysics' },
      markdown: `# Brute Facts in Naturalism

## Concept
Brute facts are final stopping points for justification — unanalyzable primitives that don't require further explanation.

## TJump Position
TJump's brute fact: "Reality is reality" or fundamental laws of physics. Compared to theism: theists use "God is God"; "Reality is reality" is more parsimonious (no added complexity of consciousness). Natural laws have proven basis in experience.

## Related
- Parsimony
- Presuppositionalism critique
- Mirroring Strategy
`,
    },
    {
      id: 'physicalism',
      title: 'Physicalism / Materialism',
      summary: 'Only the natural, material world has been confirmed to exist. Consciousness and morality are emergent.',
      tags: { ...defaultTags, topic: 'metaphysics' },
      markdown: `# Physicalism / Materialism

## Concept
The view that everything that exists is physical — matter and energy — and that mental and moral phenomena are dependent on or identical to physical processes.

## TJump Position
Only the natural, material world has been confirmed to exist. Everything is fundamentally physical matter and energy; consciousness, mind, and morality are emergent properties of matter. No evidence for non-physical substances. Emergent properties are real (bricks to wall, hydrogen to star); consciousness is the process, not a separate substance.

## Related
- Consciousness & Functionalism
- Moral Naturalism
- Mathematical Nominalism
`,
    },
    {
      id: 'nominalism',
      title: 'Mathematical Nominalism',
      summary: 'Numbers and math are human-invented formal languages to describe reality, not independently existing entities.',
      tags: { ...defaultTags, topic: 'metaphysics', methodology: 'conceptual_analysis' },
      markdown: `# Mathematical Nominalism

## Concept
The view that numbers and mathematical objects do not exist as independent abstract entities.

## TJump Position
Math is a "formal language" humans invented to describe reality. Numbers are "adjectives" or "variables," not concrete things. We "cherry-pick" mathematical systems that accurately map onto observed regularities. Math is analytic (true by definition) but not synthetic. Rejection of Platonism: no separate realm of forms or universals.

## Related
- Map vs. Territory
- Ontological Argument critique
- Physicalism
`,
    },
    {
      id: 'moral_naturalism',
      title: 'Moral Naturalism & BAPW',
      summary: 'Morality as objective law of nature: least involuntary imposition of will. BAPW = consent/choice maximized.',
      tags: { ...defaultTags, topic: 'ethics', argument_type: 'moral' },
      markdown: `# Moral Naturalism and BAPW

## Concept
Objective morality grounded in nature rather than in divine command. BAPW = state where involuntary imposition is impossible.

## TJump Position
Morality is an objective law of nature based on "least involuntary imposition of will." Best of All Possible Worlds: choice and consent are highest moral values; morality is descriptive law ("is"), not prescriptive ("ought"). Applications: creating beings without consent = immoral; God drowning babies = definitively immoral. Moral progress shows objective patterns.

## Transcript Examples

- **Ethics & God — TJump Vs CJ Cox** (\`ethics_god_cj_cox\`)
  - Source: \`content/transcripts/6Tqy2CFN4QQ_Ethics_God_TJump_Vs_CJ_Cox.md\`
  - TODO: Insert specific excerpt and timestamp from the transcript here once curated, illustrating the "least involuntary imposition of will" framing and BAPW in live debate.

## Related
- Euthyphro / Theistic Morality critique
- Moral Argument
`,
    },
    {
      id: 'consciousness_functionalism',
      title: 'Consciousness: Functionalism & Emergence',
      summary: 'Consciousness as emergent from physical processes. CD player and computer analogies; identity theory.',
      tags: { ...defaultTags, topic: 'metaphysics', methodology: 'thought_experiment' },
      markdown: `# Consciousness: Functionalism and Emergence

## Concept
Consciousness is not a separate substance but an emergent property of physical processes. Mental states are brain states.

## TJump Position
Consciousness is a higher-order emergent property of physical processes. Composition/Division Fallacy rejected: emergent properties are real (bricks to wall, water to wetness). CD Player analogy: grooves = brain, music = consciousness; you can't find "music" by opening a CD. Computer analogy: hardware = brain, output = mind. The gap is epistemic, not ontological. Identity theory: mental states ARE brain states.

## Related
- AI and Consciousness
- Physicalism
`,
    },
    {
      id: 'parsimony',
      title: 'Parsimony (Occam\'s Razor)',
      summary: 'Prefer simpler explanations; natural over supernatural; "unknown natural" better than "supernatural mind."',
      tags: { ...defaultTags, topic: 'epistemology', methodology: 'model_comparison' },
      markdown: `# Parsimony (Occam's Razor)

## Concept
Prefer simpler explanations with fewer assumptions when they explain the same phenomena.

## TJump Position
Natural explanations over supernatural; known entities over invented. "Unknown natural" always better than "supernatural mind." If theists can posit eternal God, naturalists can posit eternal nature — without adding consciousness, the latter is more parsimonious. Mirroring strategy exposes arbitrary assumptions.

## Related
- Methodological Naturalism
- Brute Facts
- Cosmological / Fine-Tuning critiques
`,
    },
    {
      id: 'methodological_naturalism',
      title: 'Methodological Naturalism',
      summary: 'Only natural things confirmed through reliable methodology. Science separates real from imaginary.',
      tags: { ...defaultTags, topic: 'epistemology' },
      markdown: `# Methodological Naturalism

## Concept
The methodological stance that we should only accept natural explanations as confirmed until established by reliable methods.

## TJump Position
Only natural things have been confirmed through reliable methodology. Science is the only method that consistently separates real from imaginary. Deference to scientific consensus. Apply same standards to all claims (humans, AI, gods); no "biological exceptionalism."

## Related
- Novel Testable Predictions
- Parsimony
`,
    },
  ],
  arguments: [
    {
      id: 'cosmological',
      title: 'Cosmological Argument',
      summary: 'Everything that begins to exist has a cause; the universe began to exist; therefore the universe has a cause. TJump challenges the first premise and causal assumptions.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'cosmological' },
      markdown: `# Cosmological Argument

## Opponent Claim
Everything that begins to exist has a cause. The universe began to exist. Therefore the universe has a cause.

## Premise Structure
- P1: Everything that begins to exist has a cause
- P2: The universe began to exist
- C: The universe has a cause

## TJump Response
Challenges P1 and argues causal assumptions are probabilistic rather than necessary. We don’t have a priori certainty that everything that begins to exist has a cause; that’s an empirical or metaphysical claim that needs justification.

## Counterarguments
- Probabilistic critique: causation may be statistical, not universal
- Causal assumption critique: “begins to exist” may not apply to the universe in the same way
- Infinite regress and epistemic justification challenges
`,
    },
    {
      id: 'fine_tuning',
      title: 'Fine Tuning Argument',
      summary: 'The constants of the universe appear fine-tuned for life; this is taken as evidence for design or multiverse.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'teleological' },
      markdown: `# Fine-Tuning Argument Critique

## Opponent Claim
The constants of the universe appear fine-tuned for life; this is taken as evidence for design or a designer.

## TJump Response

**Alternative Explanations**
- Multiverse hypothesis: based on tested physics (vacuum states, inflation); infinite universes with different constants guarantee one supports life; no designer needed.
- Natural law/necessity: constants may be interconnected by undiscovered "super-law"; fine-tuning only apparent.

**God Requires Equal Fine-Tuning**: "Who designed the designer?" God's specific nature needs explanation; God is equally or more complex than the universe. Simpler to posit eternal, non-conscious nature.

**Complexity Is Not Evidence of Design**: Complexity alone doesn't prove design without testable predictions. ID lacks novel testable predictions = pseudoscience.

## Related
- Novel Testable Predictions
- Cosmological Argument
- Ontological Argument
`,
    },
    {
      id: 'moral_euthyphro',
      title: 'Moral Argument / Euthyphro Dilemma',
      summary: 'Is something good because God commands it, or does God command it because it is good? TJump: objective morality must be independent of any mind.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'moral' },
      markdown: `# Critique of Theistic Morality (Euthyphro)

## Opponent Claim
God is the source of objective morality; without God, morality would be subjective or arbitrary.

## The Modified Euthyphro Dilemma
1. Is something good because God deems it so? Then morality is subjective (God's whim).
2. Does God deem it good because of an independent standard? Then God is unnecessary for morality.

## TJump Response
True objective morality must be independent of consciousness, including God's consciousness. Commands and authority are irrelevant — moral quality is determined by objective truth. Moral failures of biblical God: drowning babies (Flood), cursing children, creating beings without consent = slavery. Could have created BAPW where suffering is optional, but didn't.

## Related
- Moral Naturalism & BAPW
- Moral Argument (theistic)
`,
    },
    {
      id: 'ontological_critique',
      title: 'Ontological Argument Critique',
      summary: 'Purely analytic "playing with definitions." Parody arguments (magical pineapple, square circle); definability does not imply existence.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'metaphysical' },
      markdown: `# Ontological Argument Critique

## Opponent Claim
God, defined as the greatest conceivable being, must exist in reality (existence is a perfection).

## TJump Response
**Core Objection**: Purely analytic argument — "playing with definitions." Logically valid but not sound. Definitions are arbitrary; cannot move from conceptual truth to synthetic reality without empirical evidence.

**Parody Arguments**
- Magical Pineapple: Define "true maximally great being" as a magical pineapple with no consciousness; works equally well in the OA structure.
- Square Circle: Can define "maximally great square circle"; if method justifies logical impossibilities, it's absurd.

**The Defeater**: If a world without God is conceivable (naturalism, atheism, Hinduism), the argument fails. Defeats the claim of necessary existence.

## Related
- Map vs. Territory
- Analytic vs. Synthetic
- Mathematical Nominalism
`,
    },
    {
      id: 'id_critique',
      title: 'Intelligent Design Critique',
      summary: 'ID lacks novel testable predictions; post hoc only. Irreducible complexity false; evolution predicted mechanisms later confirmed.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'teleological' },
      markdown: `# Intelligent Design Critique

## Opponent Claim
Certain biological structures are irreducibly complex and therefore designed.

## TJump Response
**ID Is Pseudoscience**: Lacks novel testable predictions; only post hoc explanations. Ruled pseudoscience in federal court (Kitzmiller v. Dover). Relies on argument from incredulity/ignorance.

**Irreducible Complexity Is False**: Non-coding DNA was never claimed non-functional; ENCODE confirmed non-coding functions, consistent with evolution. Gene duplication, epigenetics, niche construction explain complexity. Evolution predicted and confirmed mechanisms before full discovery. Genetic similarities support evolution and made predictions about fossil locations later confirmed.

## Related
- Novel Testable Predictions
- Fine-Tuning critique
- Methodological Naturalism
`,
    },
    {
      id: 'presuppositionalism_critique',
      title: 'Presuppositionalism Critique',
      summary: 'Laws of nature can provide non-conscious ultimate standard. "Reality is reality" grounds logic; grounding in God\'s mind makes truth subjective.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'epistemic' },
      markdown: `# Presuppositionalism Critique

## Opponent Claim
Logic, reason, and truth presuppose God; without God there is no foundation for knowledge.

## TJump Response
**Laws of Nature Provide Non-Conscious Ultimate Standard**: Naturalistic Pantheism — eternal, all-powerful, non-conscious nature. "Reality is reality" grounds laws of logic. Logic describes reality's invariant consistency; doesn't require divine mind.

**Avoiding Subjective Grounding**: Grounding truth in God's mind makes it subjective (depends on God's whims). Non-conscious standard ensures objectivity. Natural laws have proven basis; supernatural mind does not.

**Emergence Refutes "Matter to Mind" Gap**: Composition/Division Fallacy to claim non-conscious matter can't produce consciousness. Emergent properties demonstrate new qualities arise from parts lacking them.

## Related
- Brute Facts
- Map vs. Territory
- Consciousness & Functionalism
`,
    },
  ],
  debates: [
    {
      id: 'debate_001',
      title: 'Epistemology & Justification',
      summary: 'Discussion on foundationalism, probability, and justification. Placeholder for timestamped debate segments once transcripts are added.',
      tags: { ...defaultTags, topic: 'epistemology' },
      markdown: `# Epistemology Debate (Placeholder)

## Topic
Foundationalism, probability, and justification.

## How to Add Real Content
Per \`ps.md\`: download YouTube transcripts, clean and segment by topic, then create \`content/transcripts/debate_YYYYMMDD_topic_slug.md\` with timestamp, context, and segment text. Each claim in the app should be traceable to a transcript segment (video ID + timestamp).

## TJump Themes in This Area
- Knowledge can be probabilistic; no need for infallible foundations.
- Novel testable predictions break vicious circularity.
- Virtuous vs. vicious circularity; the Cogito as descriptive fact.
`,
    },
    {
      id: 'debate_theistic_args',
      title: 'Theistic Arguments (Cosmological, Moral, Fine-Tuning)',
      summary: 'Placeholder for debates where TJump responds to cosmological, moral, and fine-tuning arguments.',
      tags: { ...defaultTags, topic: 'arguments' },
      markdown: `# Theistic Arguments Debates (Placeholder)

## Topics
Cosmological argument, moral argument / Euthyphro, fine-tuning, ontological argument, ID, presuppositionalism.

## TJump's Recurring Moves
- Universe vs. reality distinction; mirroring strategy (eternal nature without consciousness).
- Euthyphro: objective morality independent of any mind.
- NTPs: theology provides post hoc stories, not predictions.
- Parsimony: "Reality is reality" more parsimonious than "God is God."
`,
    },
  ],
  transcripts: [
    {
      id: 'transcript_001',
      title: 'Transcript Library',
      summary: 'Cleaned transcript segments with topic, timestamp, and context. Add files under content/transcripts/ per ps.md.',
      tags: { ...defaultTags, topic: 'epistemology' },
      markdown: `# Transcript Library

## Purpose
Every philosophical claim in the explorer should be traceable to one or more **transcript segments** (video title, timestamp, excerpt). No invented positions or quotes.

## File Convention (ps.md)
- \`content/transcripts/debate_YYYYMMDD_topic_slug.md\`
- Sections: Video Title, Topic, Timestamp, Transcript Segment, Context
- Stable ID for linking from concept and argument pages

## Adding Transcripts
1. Download transcript (e.g. from YouTube).
2. Clean and segment by theme (epistemology, specific arguments, methods).
3. Generate transcript markdown with timestamp, context, and text.
4. Optionally link segments to concept/argument pages via transcriptId + timestamp.
`,
    },
  ],
  evaluations: [
    {
      id: 'eval_cosmological',
      title: 'Cosmological Argument — Logical Evaluation',
      summary: 'Pre-written evaluation: validity, soundness, coherence, evidence strength, rhetorical clarity. Verdict: logically valid but empirically weak.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'cosmological' },
      markdown: `# Logical Evaluation: Cosmological Argument

## Validity
**VALID** — If the premises are accepted, the conclusion logically follows.

## Soundness
**UNSOUND** — Premise 1 lacks empirical support; causal principle is contested.

## Coherence
**MODERATE** — Argument structure is internally consistent.

## Evidence Strength
**LOW** — Relies heavily on metaphysical assumptions.

## Rhetorical Clarity
**HIGH** — Argument is clearly articulated.

## Final Verdict
Logically valid but empirically weak. The “AI Judge” style evaluation is static and pre-authored; the app does not run any live AI.
`,
    },
    {
      id: 'eval_fine_tuning',
      title: 'Fine-Tuning Argument — Logical Evaluation',
      summary: 'Pre-written evaluation. Verdict: weak evidence; multiverse and necessity undercut design inference.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'teleological' },
      markdown: `# Logical Evaluation: Fine-Tuning Argument

## Validity
**MODERATE** — Inference from fine-tuning to design is inductive; multiple alternative hypotheses available.

## Soundness
**UNSOUND** — Alternatives (multiverse, necessity) are empirically motivated; "who designed the designer" undercuts.

## Evidence Strength
**LOW** — No novel testable predictions from design hypothesis; post hoc explanation.

## Final Verdict
Empirically weak; design inference undercut by parsimony and alternative explanations. Static, pre-authored.
`,
    },
    {
      id: 'eval_moral_argument',
      title: 'Moral Argument / Euthyphro — Logical Evaluation',
      summary: 'Pre-written evaluation. Euthyphro dilemma undercuts theistic grounding; objective morality independent of God.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'moral' },
      markdown: `# Logical Evaluation: Moral Argument (Theistic) / Euthyphro

## Validity
**VARIABLE** — If Euthyphro dilemma holds: either morality is God's whim (subjective) or God is unnecessary for morality.

## Soundness
**UNSOUND** — Moral naturalism and BAPW provide non-theistic objective morality; moral progress fits secular models.

## Evidence Strength
**LOW** — No predictive advantage for theistic morality. Biblical moral failures conflict with God as standard of goodness.

## Final Verdict
Euthyphro undermines theistic moral grounding. Static, pre-authored.
`,
    },
    {
      id: 'eval_ontological',
      title: 'Ontological Argument — Logical Evaluation',
      summary: 'Pre-written evaluation. Analytically valid but not sound; parody arguments show definability does not imply existence.',
      tags: { ...defaultTags, topic: 'arguments', argument_type: 'metaphysical' },
      markdown: `# Logical Evaluation: Ontological Argument

## Validity
**VALID** in standard form — but premises are definitional/analytic.

## Soundness
**UNSOUND** — Cannot move from conceptual truth to synthetic existence without empirical evidence. Parody arguments (magical pineapple, square circle) show method validates contradictory conclusions.

## Evidence Strength
**NONE** — Purely a priori; no empirical or predictive content. Conceivability of God-free worlds defeats necessary existence.

## Final Verdict
Playing with definitions; not sound. Static, pre-authored.
`,
    },
  ],
};

export function getSectionItems(kind: SectionKind): SectionItem[] {
  return SECTION_ITEMS[kind] ?? [];
}

/** Find a section item by id across all sections (for mind map node → detail). */
export function getSectionItemById(id: string): SectionItem | undefined {
  const kinds: SectionKind[] = ['epistemology', 'arguments', 'debates', 'transcripts', 'evaluations'];
  for (const kind of kinds) {
    const item = SECTION_ITEMS[kind].find((item) => item.id === id);
    if (item) return item;
  }
  return undefined;
}
