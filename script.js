(() => {
  'use strict';

  // SET YOUR REAL CONTACT ADDRESS BEFORE PUBLISHING.
  const CONTACT_EMAIL = 'hello@example.com';
  const cta = document.querySelector('#contactCta');
  if (cta) {
    cta.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Let’s talk about a project')}&body=${encodeURIComponent('Hi Oussama,\n\nHere is what I am working on:\n\n')}`;
  }

  document.querySelector('#year').textContent = new Date().getFullYear();

  const toggle = document.querySelector('#personaToggle');
  const label = document.querySelector('#personaLabel');
  const description = document.querySelector('#heroDescription');
  const intro = document.querySelector('.eyebrow');
  toggle.addEventListener('click', () => {
    const polite = document.body.dataset.persona !== 'polite';
    document.body.dataset.persona = polite ? 'polite' : 'savage';
    toggle.setAttribute('aria-pressed', String(!polite));
    label.textContent = polite ? 'SAVAGE MODE: OFF' : 'SAVAGE MODE: ON';
    document.querySelectorAll('[data-savage][data-polite]').forEach(node => {
      node.textContent = node.dataset[polite ? 'polite' : 'savage'];
    });
    description.textContent = polite
      ? 'Independent software engineer building thoughtful digital products, reliable platforms, and integrations that work.'
      : 'I design, build, untangle, and harden software. The stranger the challenge, the more interesting the conversation.';
    intro.innerHTML = polite
      ? '<span class="eyebrow-line"></span> THOUGHTFUL ENGINEERING. REAL-WORLD RESULTS. <span class="asterisk">✳</span>'
      : '<span class="eyebrow-line"></span> YOUR FRIENDLY NEIGHBORHOOD TECHNICAL NIGHTMARE <span class="asterisk">✳</span>';
  });

  const verdicts = {
    legacy: { status: 'CODE TRIAGE / REQUIRED', text: 'Diagnosis: suspicious layers of “we’ll fix it later.” Prognosis: survivable. Start with a proper audit and an honest plan.' },
    new: { status: 'GREENFIELD / DETECTED', text: 'Diagnosis: an ambitious idea with excellent opportunities for accidental overengineering. Treatment: define the smallest thing worth shipping.' },
    security: { status: 'INCIDENT / UNDER REVIEW', text: 'Diagnosis: the architecture is sending distress signals. First step: reproduce the issue, secure the essentials, then fix the cause.' }
  };
  const result = document.querySelector('#diagnosisResult');
  const status = document.querySelector('#diagnosisStatus');
  document.querySelectorAll('[data-diagnosis]').forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-diagnosis]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      const verdict = verdicts[button.dataset.diagnosis];
      status.textContent = verdict.status;
      // textContent avoids HTML injection into the diagnosis region.
      result.querySelector('span:last-child').textContent = verdict.text;
    });
  });
})();
