/* BOMPER BREINKRAG • Navigasie, lesse, vasvrae en kopieerbare lesvoorstelle */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const menu = $('mainNav');
  const mobileToggle = $('mobileToggle');
  if (menu && mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.textContent = open ? '×' : '☰';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.textContent = '☰';
    }));
  }
  if ($('siteYear')) $('siteYear').textContent = new Date().getFullYear();
  const data = window.BOMPER_DATA || { lessons: [], questions: [] };

  if ($('lessonGrid')) {
    const grid = $('lessonGrid');
    const search = $('lessonSearch');
    const filters = Array.from(document.querySelectorAll('[data-grade]'));
    const dialog = $('lessonDialog');
    const urlGrade = new URLSearchParams(location.search).get('graad');
    let grade = ['8', '9', '10', '11', '12'].includes(urlGrade) ? urlGrade : 'almal';
    const updateFilters = () => filters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.grade === grade)));
    function openLesson(lesson) {
      $('lessonGrade').textContent = `GRAAD ${lesson.grade} • ${lesson.topic}`;
      $('lessonTitle').textContent = lesson.title;
      $('lessonDescription').textContent = lesson.desc;
      $('lessonFormula').textContent = lesson.formula;
      $('lessonExample').textContent = lesson.example;
      $('lessonPractice').href = `oefen.html?graad=${lesson.grade}`;
      if (dialog?.showModal) dialog.showModal();
    }
    function renderLessons() {
      const term = search.value.toLocaleLowerCase('af').trim();
      const selected = data.lessons.filter(l => (grade === 'almal' || String(l.grade) === grade) && [l.title, l.topic, l.desc, `graad ${l.grade}`].join(' ').toLocaleLowerCase('af').includes(term));
      grid.replaceChildren();
      selected.forEach(l => {
        const card = document.createElement('article'); card.className = 'lesson-card';
        const top = document.createElement('div'); top.className = 'lesson-top';
        const chip = document.createElement('span'); chip.className = 'chip orange'; chip.textContent = `GRAAD ${l.grade}`;
        const mark = document.createElement('span'); mark.className = 'lesson-mark'; mark.textContent = l.mark;
        top.append(chip, mark);
        const h = document.createElement('h3'); h.textContent = l.title;
        const d = document.createElement('p'); d.textContent = l.desc;
        const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn btn-outline btn-sm'; btn.textContent = 'Maak mini-les oop ↗'; btn.addEventListener('click', () => openLesson(l));
        card.append(top, h, d, btn); grid.append(card);
      });
      $('lessonCount').textContent = `${selected.length} mini-les${selected.length === 1 ? '' : 'se'}`;
      $('lessonEmpty').hidden = selected.length > 0;
    }
    filters.forEach(b => b.addEventListener('click', () => { grade = b.dataset.grade; updateFilters(); renderLessons(); }));
    search.addEventListener('input', renderLessons);
    $('closeDialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    updateFilters(); renderLessons();
  }

  if ($('quizContent')) {
    const container = $('quizContent');
    let pool = [], index = 0, score = 0;
    const initialGrade = new URLSearchParams(location.search).get('graad');
    function renderStart() {
      $('quizStage').textContent = 'Gereed om te begin?';
      container.replaceChildren();
      const p = document.createElement('p'); p.className = 'muted'; p.textContent = 'Kies jou graad om te begin:';
      const group = document.createElement('div'); group.className = 'field-group';
      const lbl = document.createElement('label'); lbl.htmlFor = 'quizGrade'; lbl.className = 'field-label'; lbl.textContent = 'Graad';
      const sel = document.createElement('select'); sel.id = 'quizGrade'; sel.className = 'field';
      for (const [val, txt] of [['almal', 'Alle grade'], ['8', 'Graad 8'], ['9', 'Graad 9'], ['10', 'Graad 10'], ['11', 'Graad 11'], ['12', 'Graad 12']]) {
        const option = document.createElement('option'); option.value = val; option.textContent = txt; sel.append(option);
      }
      if (['8', '9', '10', '11', '12'].includes(initialGrade)) sel.value = initialGrade;
      group.append(lbl, sel);
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn btn-orange'; btn.textContent = 'Begin vasvra →'; btn.addEventListener('click', startQuiz);
      const note = document.createElement('p'); note.className = 'form-help'; note.style.marginTop = '15px'; note.textContent = 'Beantwoord die vrae teen jou eie tempo.';
      container.append(p, group, btn, note);
    }
    function startQuiz() {
      const sel = $('quizGrade'); const grade = sel?.value || 'almal';
      // Fisher–Yates shuffle so each grade gets a fair question order.
      pool = data.questions.filter(q => grade === 'almal' || String(q.grade) === grade);
      for (let i = pool.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      pool = pool.slice(0, 5);
      index = 0; score = 0;
      if (pool.length) renderQuestion();
    }
    function renderQuestion() {
      const q = pool[index]; let picked = -1, checked = false;
      $('quizStage').textContent = `Vraag ${index + 1} van ${pool.length}`;
      container.replaceChildren();
      const progress = document.createElement('div'); progress.className = 'quiz-progress';
      const fill = document.createElement('span'); fill.style.width = `${index / pool.length * 100}%`; progress.append(fill);
      const h = document.createElement('h2'); h.className = 'quiz-question'; h.textContent = q.q;
      const choices = [];
      const list = document.createElement('div'); list.setAttribute('role', 'group'); list.setAttribute('aria-label', 'Antwoordkeuses');
      const feedback = document.createElement('p'); feedback.className = 'quiz-feedback'; feedback.setAttribute('role', 'status');
      const row = document.createElement('div'); row.className = 'quiz-actions';
      const points = document.createElement('span'); points.className = 'muted small'; points.textContent = `Punte: ${score}`;
      const next = document.createElement('button'); next.type = 'button'; next.className = 'btn btn-orange'; next.disabled = true; next.textContent = 'Kontroleer antwoord';
      q.choices.forEach((value, i) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'quiz-choice'; b.textContent = `${String.fromCharCode(65 + i)}.  ${value}`;
        b.addEventListener('click', () => {
          if (checked) return;
          picked = i; next.disabled = false;
          choices.forEach((btn, j) => btn.classList.toggle('selected', j === i));
        });
        choices.push(b); list.append(b);
      });
      next.addEventListener('click', () => {
        if (!checked) {
          checked = true;
          if (picked === q.correct) score++;
          choices.forEach((b, i) => {
            b.disabled = true;
            b.classList.toggle('correct', i === q.correct);
            b.classList.toggle('wrong', i === picked && picked !== q.correct);
          });
          feedback.textContent = (picked === q.correct ? 'Korrek! ' : 'Nie heeltemal nie. ') + q.why;
          points.textContent = `Punte: ${score}`;
          next.textContent = index === pool.length - 1 ? 'Sien my punt →' : 'Volgende vraag →';
        } else {
          index++;
          if (index >= pool.length) renderResult(); else renderQuestion();
        }
      });
      row.append(points, next); container.append(progress, h, list, feedback, row);
    }
    function renderResult() {
      $('quizStage').textContent = 'Vasvra voltooi'; container.replaceChildren();
      const h = document.createElement('h2'); h.style.fontSize = '48px'; h.style.margin = '16px 0 13px'; h.innerHTML = `<span class="accent">${score} / ${pool.length}</span>`;
      const p = document.createElement('p'); p.className = 'muted'; p.textContent = score === pool.length ? 'Uitstekend! Jy het elke vraag reggekry.' : score >= Math.ceil(pool.length / 2) ? 'Mooi werk! Hersien die vrae waaroor jy getwyfel het.' : 'Goeie poging. Hersien die mini-lesse en probeer weer.';
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn btn-orange'; btn.textContent = 'Probeer weer ↻'; btn.addEventListener('click', renderStart);
      container.append(h, p, btn);
    }
    // Keep grade picked via query string, including on first load.
    if (['8', '9', '10', '11', '12'].includes(initialGrade)) $('quizGrade').value = initialGrade;
    $('startQuiz').addEventListener('click', startQuiz);
  }

  if ($('copyRequest')) {
    $('copyRequest').addEventListener('click', async () => {
      const grade = $('requestGrade').value;
      const value = $('requestText').value.trim();
      if (!value) { $('copyStatus').textContent = 'Skryf asseblief eers jou lesversoek.'; $('requestText').focus(); return; }
      const message = `BOMPER BREINKRAG — lesvoorstel${grade ? ' (' + grade + ')' : ''}: ${value}`;
      try {
        await navigator.clipboard.writeText(message);
        $('copyStatus').textContent = 'Gekopieer! Plak nou jou lesvoorstel in ’n YouTube-kommentaar.';
      } catch (_) {
        $('requestText').focus(); $('requestText').select();
        $('copyStatus').textContent = 'Kopieer met Ctrl+C (of Kopieer op jou foon) en plaas dit op YouTube.';
      }
    });
  }
})();
