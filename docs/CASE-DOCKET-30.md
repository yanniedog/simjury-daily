# The First 30 Days — case docket (`d-0001` … `d-0030`)

**What this is:** the design spec for the first 30 daily cases, feeding the M3a batch
PRs ([ROADMAP.md](../ROADMAP.md)). Each entry is author-ready: charge, truth,
difficulty, trap shape, the real trial *pattern* it is built from, the surface read,
the twist, and a beat-by-beat sketch with `direction` and `reveal_stamp` assignments.

**Provenance rule (important):** the *pattern* lines below cite real historical
phenomena and, where useful, real documented cases. Those citations exist **only in
this document** as design provenance. They must **never** be copied into case JSON —
no real person's name, no real case name, appears in anything play-reachable. The
M3a validator's banned-token list is seeded from the names cited here. Every case is
fiction and is labelled fiction.

---

## Design system

### The four trap shapes

The daily must not be meta-gameable. If every case were a twist, "always vote against
your gut" would beat honest reading. So cases come in four shapes, and the mix is a
design constraint:

| Shape | Surface read | Truth | Count | Job |
|-------|-------------|-------|-------|-----|
| **T1 — Framed by the obvious** | Guilty | Not Guilty | 11 | The genre's heart: vivid story, quiet exoneration |
| **T2 — Sympathetic culprit** | Not Guilty | Guilty | 8 | Charm and character vs documents |
| **T3 — It is what it looks like** | Guilty | Guilty | 8 | Calibration: the obvious read is *right*; the trap is doubting solid evidence |
| **T4 — Rightly accused of nothing** | Not Guilty | Not Guilty | 3 | Calibration: trust the boring paper trail against a scary accusation |

Twist rate = 19/30 (63%). A pure contrarian scores ~63% on verdicts but takes nearly
every per-beat trap, so trap-dodge scoring punishes the strategy. Keep twist rate
≤ ~60–65% in future docket versions and rotate which weekday carries the straight
(T3/T4) cases so the rhythm never becomes predictable.

### Verdict mix and sequencing

**16 Guilty / 14 Not Guilty**, no run longer than 3 of the same verdict (the M3a
validator enforces 2–5 Guilty in any rolling 7 days and max-run ≤ 3).

### Difficulty rhythm

Weekly ramp: Mondays easiest, Sundays the feature case. `difficulty_target` by day:

| Week | Mon → Sun |
|------|-----------|
| 1 (d1–d7) | .60* · .40 · .45 · .40 · .55 · .60 · .65 |
| 2 (d8–d14) | .35 · .50 · .50 · .45 · .60 · .60 · .70 |
| 3 (d15–d21) | .35 · .50 · .50 · .55 · .55 · .60 · .75 |
| 4 (d22–d28) | .35 · .50 · .45 · .55 · .55 · .60 · .75 |
| 5 (d29–d30) | .45 · .65 |

\* d-0001 already shipped at .60; the proper ramp starts day 2.

### Per-case checklist (authoring floor)

Every case must have: 4–6 beats · ≥ 1 `misleading` beat · ≥ 1 `decisive` beat · both
`direction`s represented · a `twist` that names the lesson in-world · `reveal_note`s
that teach the pattern **without any real name** · `gen_meta` naming a human reviewer
and the batch PR. Kinds should mix `witness` / `exhibit` / `direction` (a judge's
instruction is the game's best teaching device — use one in most cases).

### Batch plan (six PRs)

| PR | Cases |
|----|-------|
| batch-1 | d-0002 … d-0006 |
| batch-2 | d-0007 … d-0011 |
| batch-3 | d-0012 … d-0016 |
| batch-4 | d-0017 … d-0021 |
| batch-5 | d-0022 … d-0026 |
| batch-6 | d-0027 … d-0030 |

`publish_date`s are assigned at the **L** phase (launch epoch + day − 1); the
validator enforces contiguity.

---

## Week 1 — the hook

### Day 1 · d-0001 — "The Emberline Bakery Fire" ✅ shipped
**Present day · Arson with intent to defraud · Truth: NOT GUILTY · diff .60 · T1**
The flagship archetype: motive story (debt + red fuel can) vs mechanism (electrical
origin, no accelerant, lapsed policy — nothing to collect). Already in `cases/`.

### Day 2 · d-0002 — "The Borrowed Face"
**1890s London · Obtaining money by false pretences · Truth: NOT GUILTY · diff .40 · T1**
- **Pattern:** serial misidentification — several sincere victims independently pick
  the same wrong man from parades stacked against him. *Cf. the Adolf Beck case.*
- **Surface:** five defrauded widows, no collusion, each swears he is the swindler
  "Colonel Faversham". How can five honest people be wrong?
- **Twist:** the real swindler is a near-double. The Colonel charmed his victims with
  fluent French begging letters in a fine copperplate hand; the defendant is a
  Sheffield grinder who cannot write French and whose right hand is workshop-stiffened
  (surgeon's evidence). All five parades showed him as the only grey-haired man.
- **Beats (5):**
  1. `witness · guilt · misleading` — the first widow, utterly certain: "I'd know him anywhere."
  2. `witness · guilt · misleading` — the inspector: five separate complainants picked him out. (Reveal: each parade had one grey-haired man in it.)
  3. `exhibit · innocence · decisive` — the swindler's French letters beside the defendant's laboured signature and the surgeon's report on his hand.
  4. `witness · innocence · minor` — his landlady's alibi, honest but wobbly on dates.
  5. `direction · innocence · minor` — the judge: an identification may be perfectly honest and perfectly wrong; weigh the conditions of the parade.

### Day 3 · d-0003 — "The Ledger of Small Sums"
**Present day · Embezzlement · Truth: GUILTY · diff .45 · T2**
- **Pattern:** the beloved-fiduciary fraud — twenty years of trust versus forensic
  accounting; character evidence doing the work documents should do.
- **Surface:** the parish treasurer everyone loves; the vicar vouches; the books only
  went wrong when the new software arrived.
- **Twist:** a duplicate-vendor scheme. "Fairfield Supplies" is registered to her own
  PO box, and the skimmed amounts track her online bingo losses week by week. The
  software didn't create the vendor; she did.
- **Beats (5):**
  1. `witness · innocence · misleading` — the vicar: "I would trust her with my life."
  2. `exhibit · guilt · decisive` — Fairfield Supplies invoices beside the PO-box registration in her name.
  3. `witness · innocence · misleading` — the IT volunteer blames the new software. (Reveal: it logs vendors; it cannot invent them.)
  4. `exhibit · guilt · decisive` — the bank timeline: every Fairfield payment lands within days of a bingo debt.
  5. `direction · guilt · minor` — the judge: good character is evidence, but it cannot outweigh a document trail.

### Day 4 · d-0004 — "The Silver Hoof"
**1900s racing stable · Killing a horse to defraud insurers · Truth: GUILTY · diff .40 · T3**
- **Pattern:** insurance slaughter of bloodstock — a documented recurring scandal in
  racing history.
- **Surface:** the trainer says an intruder got into the yard. It looks exactly like
  what it is.
- **Twist:** none needed — the calibration lesson is that "surely it's a trap" is
  itself the trap. The policy was tripled five weeks earlier and paid in cash; the
  yard dog never barked; the necropsy finds an injection site and the trainer's kit
  is missing a syringe.
- **Beats (5):**
  1. `witness · innocence · misleading` — a stable lad saw "a vagrant by the gate". (Reveal: a casual labourer, fully alibied.)
  2. `exhibit · guilt · decisive` — the tripled policy, premium paid in cash.
  3. `witness · guilt · minor` — the night watchman: the dog knows strangers, and the dog never barked.
  4. `exhibit · guilt · decisive` — necropsy: injection site; the trainer's veterinary kit one syringe short.
  5. `direction · innocence · minor` — the judge: insurance alone is prudence, not proof. (Reveal: correct as far as it goes — it's the syringe that convicts.)

### Day 5 · d-0005 — "The Bitter Tonic"
**1850s market town · Murder of a husband by arsenic · Truth: NOT GUILTY · diff .55 · T1**
- **Pattern:** arsenic-era poisoning prosecutions upended by the victim's own dosing
  habits and pharmacy ledgers — the "poisoner wife" story vs the era's casual
  arsenic-taking. *Cf. the Styrian-defence disputes of Victorian toxicology.*
- **Surface:** she bought flypapers, the marriage was loud, and her husband died with
  arsenic in him.
- **Twist:** he was an arsenic-eater — a "vigour tonic" habit, common in the period.
  A rival pharmacy's ledger shows *his* standing order stretching back two years, and
  hair analysis shows chronic ingestion long predating the marriage trouble. The
  flypapers were for the shop.
- **Beats (5):**
  1. `witness · guilt · misleading` — the housemaid: her mistress soaked flypapers in a basin.
  2. `exhibit · guilt · misleading` — the chemist's poison register with her signature.
  3. `exhibit · innocence · decisive` — the rival pharmacy's ledger: the husband's own standing order for arsenical tonic, two years running.
  4. `witness · innocence · decisive` — the analyst: hair segments show chronic dosing long before any quarrel.
  5. `direction · innocence · minor` — the judge: means plus a quarrel is not administration.

### Day 6 · d-0006 — "The Man Who Confessed Twice"
**Present day · Armed robbery · Truth: NOT GUILTY · diff .60 · T1**
- **Pattern:** the false confession — long custody, suggestible suspect, every
  "insider detail" available in the press, the account contradicted by the scene.
  *Cf. the documented interrogation-driven exonerations.*
- **Surface:** he confessed. On tape. Twice.
- **Twist:** the confession describes entering by the side door — welded shut for
  years. Every detail he "could only have known" ran in the local paper. The custody
  log shows thirteen hours, no solicitor, statement signed at 3 a.m.
- **Beats (5):**
  1. `exhibit · guilt · misleading` — the taped confession, fluent and detailed.
  2. `witness · guilt · misleading` — the detective: "he knew things only the robber knew." (Reveal: every detail had been printed in the Gazette.)
  3. `exhibit · innocence · decisive` — the scene report: the side door in his account has been welded shut for years.
  4. `exhibit · innocence · decisive` — the custody log: thirteen hours, no solicitor, 3 a.m.
  5. `direction · innocence · minor` — the judge: a confession is evidence, and like all evidence it must be tested for reliability.

### Day 7 · d-0007 — "The Anchor and the Storm"
**1870s merchant sail · Murder of an able seaman lost overboard · Truth: GUILTY · diff .65 · T2**
- **Pattern:** the falsified ship's log — maritime inquiries turning on document
  examination of the master's own record.
- **Surface:** a storm, no body, a loyal crew. The sea takes men; it always has.
- **Twist:** the log's three storm-night entries were written in a single sitting
  (one ink-load, one hand-state, per the examiner). The dead man had lodged a pay
  complaint naming the master at the last port. A young ordinary seaman finally breaks
  the messdeck story: a quarrel aft, then nothing.
- **Beats (5):**
  1. `witness · innocence · misleading` — the mate: "seas boarding us all night; a man could go without a cry."
  2. `exhibit · guilt · decisive` — the document examiner: three days of log entries, written at one time.
  3. `exhibit · guilt · minor` — the pay complaint naming the master, filed ashore.
  4. `witness · guilt · decisive` — the ordinary seaman recants: a quarrel aft by the taffrail, then silence.
  5. `direction · innocence · minor` — the judge: no body is no bar to the charge, but the sea demands caution of an accuser.

---

## Week 2 — widen the patterns

### Day 8 · d-0008 — "The Sunday Painter"
**Present day · Art fraud (selling a forged panel) · Truth: NOT GUILTY · diff .35 · T4**
- **Pattern:** restorer over-suspicion — a "modern pigment, instant fake" headline
  undone by documented conservation history. The boring paper trail wins.
- **Surface:** a celebrity connoisseur found titanium white in a "17th-century" panel
  the defendant restored and later sold.
- **Twist:** the modern pigment sits only in a 1974 museum restoration layer — the
  invoice and condition report match the sample site exactly. The panel is genuine,
  with old repairs, like almost everything old.
- **Beats (4):**
  1. `witness · guilt · misleading` — the connoisseur: "titanium white — an instant fake."
  2. `exhibit · innocence · decisive` — the 1974 restoration invoice and condition report, sample site marked.
  3. `exhibit · guilt · misleading` — a provenance gap, 1939–1952. (Reveal: war-era gaps are the norm in honest collections.)
  4. `witness · innocence · minor` — the conservator: the cross-section shows modern pigment only within the repair layer.

### Day 9 · d-0009 — "The Nine-Minute Gap"
**Present day · Causing death by dangerous driving; failing to stop · Truth: GUILTY · diff .50 · T2**
- **Pattern:** the household alibi versus vehicle telemetry — the car as the witness
  that cannot be coached.
- **Surface:** his wife says he was home by 23:30; the bonnet damage was "a deer
  strike"; nobody saw the collision.
- **Twist:** the airbag control module logged an impact at 23:41. Paint transfer on
  the cyclist's frame matches his respray batch. The phone stayed home; the car
  testified anyway.
- **Beats (5):**
  1. `witness · innocence · misleading` — the wife: home by half past eleven, they watched the news.
  2. `exhibit · innocence · misleading` — the body-shop manager: "deer strikes look just like this." (Reveal: the impact height matches handlebars, not a deer.)
  3. `exhibit · guilt · decisive` — the airbag module: impact event, 23:41, 47 mph.
  4. `exhibit · guilt · decisive` — paint chemistry: two-stage respray, same batch.
  5. `direction · guilt · minor` — the judge on circumstantial evidence: strands of a cord, not links of a chain.

### Day 10 · d-0010 — "The Choirmaster's Watch"
**1920s cathedral town · Burglary of church plate · Truth: GUILTY · diff .50 · T3**
- **Pattern:** junk tracker-dog evidence pointing at a man who is guilty anyway.
  The sophisticated lesson: junk is junk even when it happens to be right — convict
  on the ledger, not the bloodhound.
- **Surface:** a bloodhound trailed dramatically from the vestry to his door; the
  verger's watch turned up pawned.
- **Twist:** the hound evidence is theatre (a two-day-old trail across a market
  square, a handler who knew the address). It doesn't matter: the pawn ledger carries
  his verified hand under an alias, and filings of church silver sit in his workshop
  vice.
- **Beats (5):**
  1. `witness · guilt · misleading` — the handler's thrilling account of the trail. (Reveal: worthless — stale trail, cued handler.)
  2. `exhibit · guilt · decisive` — the pawn ledger: "J. Marsh", in his verified hand.
  3. `witness · innocence · misleading` — a choir member: "a cathedral man thirty years — impossible."
  4. `exhibit · guilt · decisive` — silver filings in his workshop vice matching the chalice assay.
  5. `direction · innocence · minor` — the judge: follow the dog nowhere; weigh the ledger.

### Day 11 · d-0011 — "The Second Set of Books"
**1920s city · Fraud — an investment house on fabricated returns · Truth: GUILTY · diff .45 · T3**
- **Pattern:** fabricated brokerage statements; redemptions paid from new deposits.
  The defence that "the crash took the money" — but no shares were ever bought.
- **Surface:** dozens of investors were paid like clockwork for years; then the
  market fell on everyone. Bad luck isn't theft.
- **Twist:** the client statements are printed on paper whose watermark wasn't
  manufactured until three years *after* the dates they carry. Exchange records show
  no purchase, ever, in any client's name.
- **Beats (5):**
  1. `witness · innocence · misleading` — a grateful early investor: paid every quarter, to the day. (Reveal: from new deposits.)
  2. `exhibit · guilt · decisive` — the watermark: paper younger than the statements printed on it.
  3. `witness · innocence · misleading` — his clerk: "he seemed to believe it himself."
  4. `exhibit · guilt · decisive` — the exchange: no shares ever bought.
  5. `direction · guilt · minor` — the judge: optimism is no defence to reporting purchases that never occurred.

### Day 12 · d-0012 — "The Sleepwalker's Kitchen"
**Present day · Wounding with intent · Truth: NOT GUILTY · diff .60 · T1**
- **Pattern:** automatism — violence without a conscious mind, accepted where the
  medical history is documented and predates the event. *Cf. the landmark parasomnia
  acquittals.*
- **Surface:** he was found standing over his brother-in-law at 3 a.m., pan in hand,
  eyes open.
- **Twist:** twenty years of documented parasomnia — sleep-clinic EEGs, prior
  episodes of cooking full meals asleep — all predating any family friction. Open
  eyes are typical of the condition. He dialled 999 seconds after waking, and the
  money quarrel at dinner was mild and resolved.
- **Beats (5):**
  1. `witness · guilt · misleading` — the victim: "his eyes were open; he looked straight at me." (Reveal: open eyes are the textbook presentation.)
  2. `exhibit · innocence · decisive` — the sleep-clinic file: EEG-confirmed parasomnia, years before.
  3. `witness · guilt · misleading` — the sister: they had argued about money at dinner.
  4. `exhibit · innocence · minor` — the 999 recording: confusion and horror, seconds after waking.
  5. `direction · innocence · minor` — the judge: intent requires a conscious mind; an act without will is not a crime.

### Day 13 · d-0013 — "The Hand of M. Corbin"
**1890s provincial city · Forging and uttering a will · Truth: GUILTY · diff .60 · T2**
- **Pattern:** duelling handwriting "experts" as courtroom theatre, settled by ink
  chemistry — the era of graphology overreach.
- **Surface:** the devoted nephew who nursed his uncle for years, against a pack of
  greedy distant heirs. The experts cancel each other out.
- **Twist:** the will's ink contains a synthetic dye first manufactured two years
  after the testator died. A stationer's receipt shows the nephew bought a
  letter-copying outfit three weeks after the funeral.
- **Beats (5):**
  1. `witness · innocence · misleading` — a famed graphologist: "indubitably the testator's hand."
  2. `witness · guilt · misleading` — the rival graphologist: "a patent forgery." (Reveal: both were performing; the science of loops settles nothing.)
  3. `exhibit · guilt · decisive` — the chemist: the ink's dye did not exist while the testator lived.
  4. `exhibit · guilt · minor` — the stationer's receipt for a copying outfit, dated after the death.
  5. `direction · guilt · minor` — the judge: where experts conflict, look for the fact no expert can bend.

### Day 14 · d-0014 — "The Lighthouse Keepers"
**1860s rock light · Murder of a fellow keeper · Truth: NOT GUILTY · diff .70 · T1**
- **Pattern:** isolation plus macabre-but-innocent conduct read as guilt. *Cf. the
  Smalls Lighthouse ordeal of 1801, which ended two-man postings.*
- **Surface:** two men alone on a rock for five weeks; one comes back dead, lashed to
  the gallery rail, and the survivor is half mad and won't stop apologising to the
  corpse.
- **Twist:** the relief boat couldn't land for five weeks (the shore station's
  weather log proves it). He lashed the body where the relief could see it precisely
  so no one could say he'd slipped it into the sea. The surgeon finds fall injuries,
  and rope burns on the *dead man's* palms from the vane line he was re-securing when
  the gust took him.
- **Beats (5):**
  1. `witness · guilt · misleading` — the relief crew: wild-eyed survivor, corpse lashed to the rail "like a trophy."
  2. `exhibit · guilt · misleading` — the keepers' log, blank for the last three days. (Reveal: he kept a slate; the log was soaked when the lantern-room door stove in.)
  3. `exhibit · innocence · decisive` — the surgeon: injuries of a fall from the gallery; rope burns on the dead man's own palms.
  4. `exhibit · innocence · decisive` — the shore station's weather log: no landing possible for five weeks; his distress flags correctly flown (logged by a passing brig).
  5. `direction · innocence · minor` — the judge: horror at what isolation does to a man is not evidence that he killed.

---

## Week 3 — trust and doubt in both directions

### Day 15 · d-0015 — "The Copper Weathervane"
**Present day · Theft of church roof metal · Truth: GUILTY · diff .35 · T3**
- **Pattern:** the "bought it in good faith from a man in a van" defence versus the
  defendant's own devices.
- **Surface:** a scrap dealer with the church's copper in his yard and a receipt from
  an anonymous seller.
- **Twist:** his own truck's GPS parked at the lychgate from 02:10 to 03:40. The
  truck bed holds roofing nails and slate dust matching the roof, and the "seller's
  receipt" carries pen indentations from his own invoice pad.
- **Beats (4):**
  1. `exhibit · innocence · misleading` — the good-faith purchase receipt.
  2. `exhibit · guilt · decisive` — the truck's GPS: at the church, small hours, ninety minutes.
  3. `exhibit · guilt · decisive` — bed sweepings: roof nails and slate dust; the receipt indented from his own pad.
  4. `witness · guilt · minor` — the churchwarden: flashing cut in lengths matching the dealer's shear.

### Day 16 · d-0016 — "The Turnstile Twin"
**Present day · Robbery of a betting shop · Truth: GUILTY · diff .50 · T3**
- **Pattern:** the identical-twin defence — "the camera can't tell us apart" played
  as automatic reasonable doubt. The lesson: doubt must be reasonable, not merely
  conceivable.
- **Surface:** the CCTV face is a match — for two people. The defence says his twin
  did it, and DNA can't help.
- **Twist:** the twin was in A&E across town for the whole window (admission
  records). The cashier noticed the robber favouring his left wrist — the defendant's
  old fracture — and counter fibres match the defendant's jacket.
- **Beats (5):**
  1. `witness · innocence · misleading` — the defence: "we're identical; that footage convicts a face we share." (Reveal: true, and irrelevant once the twin is placed elsewhere.)
  2. `exhibit · guilt · decisive` — hospital records: the twin in A&E during the robbery.
  3. `witness · guilt · minor` — the cashier: the robber guarded his left wrist.
  4. `exhibit · guilt · decisive` — fibre match: counter tape to the defendant's jacket.
  5. `direction · innocence · minor` — the judge: doubt must be reasonable, not merely conceivable.

### Day 17 · d-0017 — "The Salted Claim"
**1870s gold country · Fraud — selling shares in a salted mine · Truth: GUILTY · diff .50 · T2**
- **Pattern:** mine-salting — genuine assays of doctored rock. *Cf. the great diamond
  hoax of 1872 and the shotgun-salting technique.*
- **Surface:** a genial old prospector; the assays were real and rich; if investors
  got greedy, whose fault is that?
- **Twist:** the assays were honest — the rock face wasn't. The gold flakes show
  impact-flattening and lead smears: fired into the face with a shotgun. Independent
  drill cores show values dying six inches in.
- **Beats (5):**
  1. `witness · innocence · misleading` — the respected assayer: "my numbers were accurate." (Reveal: accurate assays of a salted face.)
  2. `exhibit · guilt · decisive` — the metallurgist: flattened flakes, lead traces — gold fired from a gun barrel.
  3. `witness · innocence · misleading` — thirty years of honest digging, says everyone.
  4. `exhibit · guilt · decisive` — the engineer's cores: barren beyond the skin of the face.
  5. `direction · guilt · minor` — the judge: a true report of a false thing is still a false pretence.

### Day 18 · d-0018 — "The Wrecker of Point Morrow"
**1830s coast · Luring a ship ashore by false lights · Truth: NOT GUILTY · diff .55 · T1**
- **Pattern:** the legend-driven prosecution — deliberate wrecking-by-false-lights is
  mostly folklore; villages plundered wrecks, but luring is near-mythical. A family's
  name on trial instead of evidence.
- **Surface:** the whole parish "knows" old Tregan showed a lamp on the cliff, and
  wreck goods were found in his barn.
- **Twist:** the "false light" was his farmhouse window, which bears inland — a
  Trinity pilot testifies no seaman could mistake it for the harbour light. The
  surviving mate saw no light at all: they struck in fog on the ebb. The barn goods
  were beachcombed after the wreck — a lesser offence, freely admitted.
- **Beats (5):**
  1. `witness · guilt · misleading` — the parish constable: "everyone knows what the Tregans are."
  2. `exhibit · guilt · misleading` — wreck goods in the barn. (Reveal: salvage after the fact, admitted — a different charge.)
  3. `witness · innocence · decisive` — the surviving mate: thick fog, no light seen, struck on the ebb set.
  4. `witness · innocence · decisive` — the Trinity pilot: that window bears inland; it cannot be read as the harbour light from seaward.
  5. `direction · innocence · minor` — the judge: try the charge, not the family's name.

### Day 19 · d-0019 — "The False Alibi"
**Present day · Domestic burglary · Truth: NOT GUILTY · diff .55 · T1**
- **Pattern:** the fabricated alibi that hides shame, not guilt — the classic
  *Lucas*-direction scenario: people lie for reasons other than murder... or burglary.
- **Surface:** his sister's alibi collapses on cross-examination — she was lying.
  Jurors' instinct: liars are guilty.
- **Twist:** the real alibi was humiliating — he was at a payday-loan office begging
  an extension, confirmed late by the office's door log and a clerk. His sister
  invented the sofa-and-television evening to spare him. The burglar's shoeprint at
  the sill is three sizes too small.
- **Beats (5):**
  1. `witness · guilt · minor` — a neighbour saw "a man about his height" at the fence.
  2. `witness · guilt · misleading` — the collapse: his sister admits the alibi was invented. (Reveal: hers was the lie, and hers alone.)
  3. `exhibit · innocence · decisive` — the loan office's door log and CCTV still, across town.
  4. `exhibit · innocence · minor` — the sill shoeprint: size 8; he takes an 11.
  5. `direction · innocence · minor` — the judge: a false alibi may be the refuge of the frightened as well as the guilty.

### Day 20 · d-0020 — "The Cellar Print"
**Present day · Burglary — a jeweller's safe · Truth: GUILTY · diff .60 · T3**
- **Pattern:** weaponised scepticism — a defence expert reciting real historical
  fingerprint failures to fog a case where the forensics are actually overwhelming.
- **Surface:** the defence floods the courtroom with genuine examples of fingerprint
  misattribution. If the flagship forensic science can fail, what's left?
- **Twist:** the general critique is true and irrelevant: here there are three
  blind-verified prints, his blood on the broken sash, and the bearer bonds up his
  chimney flue.
- **Beats (5):**
  1. `witness · innocence · misleading` — the defence expert: "fingerprint identification has convicted innocent men." (Reveal: true in general; nothing to do with this evidence.)
  2. `exhibit · guilt · decisive` — blood on the sash; DNA match.
  3. `exhibit · guilt · decisive` — bearer bonds recovered from his flue.
  4. `witness · guilt · minor` — the examiner: three concordant prints, verified blind by a second examiner.
  5. `direction · guilt · minor` — the judge: scepticism is a tool, not a verdict.

### Day 21 · d-0021 — "The Night Nurse" *(Sunday feature)*
**Present day · Murder of two patients · Truth: NOT GUILTY · diff .75 · T1**
- **Pattern:** shift-correlation prosecutions and the prosecutor's fallacy — the
  1-in-millions statistic that collapses under roster scrutiny. *Cf. the documented
  European nursing exonerations (Lucia de Berk line).*
- **Surface:** she was on duty for every flagged death. An expert puts the odds of
  coincidence at one in seven million.
- **Twist:** she was rostered to the acute ward *because* she took the sickest
  patients — adjust for acuity and the cluster vanishes. The incident list was
  compiled after suspicion fell on her: deaths on her shifts were flagged, identical
  deaths on other shifts filed as natural. Deaths continued at the same rate after
  her suspension, and no toxin was ever found.
- **Beats (5):**
  1. `witness · guilt · misleading` — the statistician: one in seven million.
  2. `witness · guilt · misleading` — a colleague: "she was always there when it happened." (Reveal: hindsight selection — she was always there, full stop.)
  3. `exhibit · innocence · decisive` — the roster analysis: sickest patients assigned to her; acuity-adjusted, no cluster.
  4. `exhibit · innocence · decisive` — the ward record after her suspension: same death rate; exhumations clean.
  5. `direction · innocence · minor` — the judge: the chance of a coincidence is not the chance of innocence.

---

## Week 4 — the deep cuts

### Day 22 · d-0022 — "The Depot Clock"
**Present day · Assault outside a nightclub · Truth: NOT GUILTY · diff .35 · T4**
- **Pattern:** the sincere-but-contaminated identification versus a timestamped
  record; ID confidence inflated by social-media exposure before the parade.
- **Surface:** the victim is one hundred percent certain, and compelling with it.
- **Twist:** depot CCTV, clock-verified, shows the defendant four miles away six
  minutes before the attack. The victim had seen his photo circulating on a local
  Facebook group before ever attending the parade.
- **Beats (4):**
  1. `witness · guilt · misleading` — the victim, certain and moving.
  2. `exhibit · innocence · decisive` — the depot CCTV with engineer-verified clock.
  3. `exhibit · innocence · minor` — the Facebook thread, timestamped before the identification parade.
  4. `direction · innocence · minor` — the judge: confidence is not accuracy; a mistaken witness can be a convincing one.

### Day 23 · d-0023 — "The Poison-Pen of Alder Lane"
**1920s village · Criminal libel — obscene anonymous letters · Truth: NOT GUILTY · diff .50 · T1**
- **Pattern:** the accuser wrote them. *Cf. the Littlehampton letters prosecutions of
  the 1920s.*
- **Surface:** filthy letters on the defendant's own brand of notepaper, signed with
  her initials, in the middle of a boundary feud with the complainant.
- **Twist:** a post-office sting — stamps invisibly marked and sold only to the
  complainant — puts the complainant's stamps on the next letter, posted while the
  defendant was under observation elsewhere. The fluent copperplate of the letters is
  beyond the defendant's laboured schoolroom hand.
- **Beats (5):**
  1. `exhibit · guilt · misleading` — her notepaper, her initials. (Reveal: who signs a poison-pen letter?)
  2. `witness · guilt · misleading` — the complainant, tearful and specific.
  3. `exhibit · innocence · decisive` — the sting: marked stamps sold only to the complainant, on a letter posted while the defendant was watched elsewhere.
  4. `witness · innocence · minor` — the schoolmistress: the defendant's hand cannot sustain that script.
  5. `direction · innocence · minor` — the judge: initials at the foot of a libel are evidence of a signature — or of a snare.

### Day 24 · d-0024 — "The Cold Chain"
**Present day · Contaminating goods with intent to extort · Truth: GUILTY · diff .45 · T3**
- **Pattern:** insider extortion behind an alternative-suspect misdirection; the
  mundane digital exhaust (printer dots, loyalty cards) that extortionists forget.
- **Surface:** the defence has a better villain — a fired maintenance engineer who
  swore revenge on the dairy.
- **Twist:** the engineer has been in Auckland since March (stamped passport). The
  ransom notes carry the tracking dots of the defendant's office printer, printed
  during his badge-logged hours, and he bought the emetic with his loyalty card.
- **Beats (5):**
  1. `witness · innocence · misleading` — the HR manager: the fired engineer made threats. (Reveal: overseas throughout.)
  2. `exhibit · guilt · decisive` — printer identification dots on all three notes: his office device, his badge hours.
  3. `exhibit · guilt · decisive` — the purchase record: emetic, paid with his loyalty card.
  4. `exhibit · innocence · misleading` — no fingerprints on the jars. (Reveal: gloves prove care, not innocence.)
  5. `direction · guilt · minor` — the judge: an alternative suspect must be more than a name.

### Day 25 · d-0025 — "The Vanishing Bridegroom"
**1900s seaside towns · Obtaining property by false pretences; bigamy · Truth: GUILTY · diff .55 · T2**
- **Pattern:** the serial courtship swindler and the amnesia defence — Edwardian
  marriage-fraud prosecutions.
- **Surface:** a distinguished gentleman with a genuine head injury and a gap where
  his past should be. One of his wives still defends him from the gallery.
- **Twist:** four courtships, and the love letters are word-for-word identical. Bank
  drafts show each dowry arriving in the next town with him. Under a physician's
  standard tests the amnesia evaporates — he "forgets" only what incriminates.
- **Beats (5):**
  1. `witness · innocence · misleading` — the loyal wife: "he is incapable of deceit."
  2. `exhibit · guilt · decisive` — four bundles of love letters, verbatim identical.
  3. `witness · innocence · misleading` — the defence physician on traumatic amnesia. (Reveal: he failed the standard malingering checks.)
  4. `exhibit · guilt · decisive` — the bank drafts: each windfall travels with him to the next town.
  5. `direction · guilt · minor` — the judge: a pattern repeated four times is design, not misfortune.

### Day 26 · d-0026 — "The Quarry Gate"
**Present day · Gross-negligence manslaughter · Truth: NOT GUILTY · diff .55 · T4**
- **Pattern:** scapegoating the man at the lever for a systemic failure — the
  industrial-disaster prosecution that stops one rung too low.
- **Surface:** most jurors arrive sympathetic to the shot-firer — surely it's the
  company's fault. The prosecution's timeline lands hard anyway: the siren-to-blast
  gap looks forty seconds short. The trap runs toward guilt.
- **Twist:** the exclusion-zone radio had been dead six weeks — his six written
  fault reports were filed and ignored. The prosecution measured from the wrong
  siren; the second siren is logged at the full interval. And the victim entered the
  zone on a supervisor's text, after clearance.
- **Beats (5):**
  1. `witness · guilt · misleading` — the site manager: "the shot-firer owns the zone; the rules are clear."
  2. `exhibit · guilt · misleading` — the prosecution timeline: forty seconds short. (Reveal: measured from the wrong siren.)
  3. `exhibit · innocence · decisive` — six fault reports on the dead radio, filed, stamped, ignored.
  4. `exhibit · innocence · decisive` — the supervisor's text sending the fitter into the zone after clearance.
  5. `direction · innocence · minor` — the judge: negligence is judged against the system a man was actually given.

### Day 27 · d-0027 — "The Locked Gallery"
**Present day · Theft of a jewel collection · Truth: GUILTY · diff .60 · T2**
- **Pattern:** the investigator as thief — alarm-raiser bias ("thieves don't summon
  the police") plus the impossible-crime frame that only the insider could build.
- **Surface:** the security chief discovered the theft, called it in, and has
  cooperated with everything. The vault shows no way in — this was an outside genius.
- **Twist:** the audit log has a checksum gap exactly spanning his badge-logged
  "system test". Paste replicas of the collection were ordered months earlier on his
  card, delivered to his lock-up. The impossible entry needed his master key and his
  knowledge of the one camera blind arc — the mystery was the confession.
- **Beats (5):**
  1. `witness · innocence · misleading` — the detective: "he called it in; thieves don't summon the police." (Reveal: controlling the discovery is the oldest move there is.)
  2. `exhibit · guilt · decisive` — the audit log's checksum gap, exactly during his badge-logged maintenance window.
  3. `exhibit · guilt · decisive` — the invoice for paste replicas, his card, his lock-up.
  4. `witness · innocence · misleading` — the locksmith: the vault cannot be breached from outside. (Reveal: precisely.)
  5. `direction · guilt · minor` — the judge: exclusive opportunity is evidence where access is truly exclusive.

### Day 28 · d-0028 — "The Man from the Sea" *(Sunday feature)*
**1870s county seat · Perjury — swearing himself the lost heir · Truth: GUILTY · diff .75 · T2**
- **Pattern:** the great impostor claims — a grieving family's recognition versus
  what cannot be coached. *Cf. the Tichborne claimant.*
- **Surface:** the *mother* recognises him. He knows the pony's name, the loose
  stair, the summer-house initials. Twelve years at sea change a man; the family
  lawyers just want the estate.
- **Twist:** the heir was raised half in French — the claimant cannot conjugate
  *être*. Coaching letters from an old shipmate of the real heir sit in his sea
  chest, containing every childhood detail he has performed. Photograph comparison
  (ear, brow) corroborates. A mother's recognition is the easiest thing in the world
  to give a man she cannot bear to lose twice.
- **Beats (6):**
  1. `witness · innocence · misleading` — the mother: "a mother knows her son."
  2. `witness · innocence · misleading` — the old groom: he knew the pony's name, the loose stair. (Reveal: every detail appears in the coaching letters.)
  3. `exhibit · guilt · decisive` — the coaching correspondence found in his sea chest.
  4. `witness · guilt · decisive` — the tutor: the heir's first language was French; the claimant cannot decline a verb.
  5. `exhibit · guilt · minor` — the photographic comparison: earlobe and brow against the heir's last portrait.
  6. `direction · guilt · minor` — the judge: weigh what can be coached against what cannot.

---

## Week 5 — close the month

### Day 29 · d-0029 — "The Miller's Measure"
**1300s manor court · Theft by false measure · Truth: GUILTY · diff .45 · T3**
- **Pattern:** weights-and-measures fraud — the oldest commercial crime; assize-era
  enforcement against the proverbially distrusted miller. The trap is the proverb:
  *everyone* hates the miller, so surely this is scapegoating.
- **Surface:** a bad harvest needs a villain, and the village has blamed millers
  since before anyone living was born.
- **Twist:** the reeve sets the toll-dish against the king's standard measure: a
  tenth heavy. Warmed by the fire, the dish gives up a false bottom of blackened wax.
  The proverb was a prejudice; the dish is a fact.
- **Beats (4):**
  1. `witness · innocence · misleading` — the reeve concedes it: every honest miller is called a thief in a lean year.
  2. `exhibit · guilt · decisive` — the toll-dish against the standard: a tenth heavy; the wax false bottom revealed by the fire.
  3. `witness · guilt · minor` — the carter: the miller alone handled the dish and kept it locked.
  4. `direction · guilt · minor` — the steward's charge: prejudice against a trade convicts no one; the dish speaks for itself.

### Day 30 · d-0030 — "The Gaslight Corridor" *(finale)*
**1880s lodging house · Murder of a fellow lodger · Truth: NOT GUILTY · diff .65 · T1**
- **Pattern:** tunnel vision and withheld exculpatory evidence — the disclosure
  failure. The month's closing lesson: a verdict is only as good as what reaches the
  courtroom.
- **Surface:** his knife by the body, a supper-table quarrel heard by the whole
  house, blood on his cuff.
- **Twist:** a constable's notebook, produced at the eleventh hour by an uneasy
  sergeant, records a third lodger seen burning clothing in the yard at dawn — a
  report taken and shelved. The "his" knife came from the common kitchen rack every
  lodger used. The cuff blood is a cradling pattern, not a striking one: he held the
  dying man and shouted for help.
- **Beats (5):**
  1. `exhibit · guilt · misleading` — his pocketknife by the body. (Reveal: the kitchen's communal rack; four lodgers swore to using it.)
  2. `witness · guilt · misleading` — the landlady: a supper quarrel, "words like blows."
  3. `exhibit · guilt · misleading` — blood on his cuff. (Reveal: the surgeon reads it as cradling, not striking.)
  4. `exhibit · innocence · decisive` — the constable's shelved notebook: a third lodger burning clothes at dawn, reported and buried.
  5. `direction · innocence · minor` — the judge: the crown must disclose what cuts both ways; weigh hardest the evidence that nearly never reached you.

---

## Variety ledger (for docket v2 planning)

- **Eras:** present day ×12 · Victorian/Edwardian ×9 · 1920s–30s ×3 · Age of Sail /
  coastal ×3 · gold-rush ×1 · 1850s ×1 · medieval ×1.
- **Charge families:** homicide ×5 · fraud/false pretences ×6 · theft/burglary ×6 ·
  robbery ×2 · driving/industrial manslaughter ×2 · arson ×1 · poisoning ×1 ·
  extortion ×1 · libel ×1 · perjury ×1 · assault/wounding ×2 · regulatory (measures)
  ×1 · maritime (wrecking) ×1.
- **Lessons taught:** identification failure ×3 (parade, twin, contaminated ID) ·
  statistics/base-rate ×1 · false confession ×1 · junk science ×4 (hound, graphology,
  fingerprint-scepticism inversion, arson-adjacent) · document forensics ×4 (ink,
  watermark, log, printer dots) · disclosure failure ×1 · character-evidence traps
  throughout.

Docket v2 should rebalance toward whichever shapes and eras players discuss least —
the reveal is the product, and the ledger above is the menu it draws from.
