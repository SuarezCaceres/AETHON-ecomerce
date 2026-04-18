/**
 * seccion-extra.js
 * Maneja: reacciones con emojis, editor de comentarios, tabs y lista de comentarios.
 */
document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════════════
       REACCIONES
    ════════════════════════════════════════ */
    const reactions   = { upvote: 2, funny: 0, love: 0, surprised: 0, angry: 0, sad: 0 };
    const userReacted = {};   // key → true/false

    document.querySelectorAll('.emoji-item').forEach(item => {
        const key = item.dataset.key;
        const btn = item.querySelector('.emoji-btn');

        btn.addEventListener('click', () => {
            if (userReacted[key]) {
                // toggle off
                reactions[key]--;
                userReacted[key] = false;
                btn.classList.remove('active');
            } else {
                // toggle on
                reactions[key]++;
                userReacted[key] = true;
                btn.classList.add('active');
            }
            document.getElementById('count-' + key).textContent = reactions[key];
            updateReactionTotal();
        });
    });

    function updateReactionTotal() {
        const total = Object.values(reactions).reduce((a, b) => a + b, 0);
        const el = document.getElementById('reactionCount');
        if (el) el.textContent = total + ' reaction' + (total !== 1 ? 's' : '');
    }


    /* ════════════════════════════════════════
       EDITOR — contador de palabras + formato
    ════════════════════════════════════════ */
    const editor    = document.getElementById('commentEditor');
    const wordCount = document.getElementById('wordCount');

    if (editor && wordCount) {
        editor.addEventListener('input', () => {
            const text  = editor.innerText.trim();
            const words = text === '' ? 0 : text.split(/\s+/).filter(Boolean).length;
            wordCount.textContent = words;
        });
    }

    // Toolbar buttons
    document.querySelectorAll('.tb-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const cmd = btn.dataset.cmd;

            if (cmd === 'createLink') {
                const url = prompt('Ingresa la URL:');
                if (url) document.execCommand('createLink', false, url);
            } else if (cmd === 'insertCode') {
                // wrap selection in <code>
                const sel = window.getSelection();
                if (sel && sel.rangeCount) {
                    const range = sel.getRangeAt(0);
                    const code  = document.createElement('code');
                    code.style.cssText = 'background:#2a2a2a;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em;color:#f8c555;';
                    try { range.surroundContents(code); } catch(err) { /* partial selection */ }
                }
            } else {
                document.execCommand(cmd, false, null);
            }

            editor.focus();
            btn.classList.toggle('active', document.queryCommandState(cmd));
        });
    });


    /* ════════════════════════════════════════
       SUBMIT COMENTARIO
    ════════════════════════════════════════ */
    const submitBtn  = document.getElementById('submitComment');
    const commentList = document.getElementById('commentList');
    const commentBadge = document.getElementById('commentBadge');
    let commentCount = 1;

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const text = editor.innerText.trim();
            if (!text) return;

            commentCount++;

            // Crear item
            const item = document.createElement('div');
            item.className = 'comment-item';
            item.innerHTML = `
                <div class="comment-avatar">T</div>
                <div class="comment-body">
                    <div class="comment-meta">
                        <span class="comment-user">Tú</span>
                        <span class="comment-time">ahora mismo</span>
                    </div>
                    <p class="comment-text">${editor.innerHTML}</p>
                    <div class="comment-actions">
                        <button class="ca-btn">👍 Like</button>
                        <button class="ca-btn">↩ Reply</button>
                    </div>
                </div>
            `;

            // Insertar según tab activa
            const activeTab = document.querySelector('.ctab.active')?.dataset.tab;
            if (activeTab === 'oldest') {
                commentList.appendChild(item);
            } else {
                commentList.insertBefore(item, commentList.firstChild);
            }

            // Resetear editor
            editor.innerHTML = '';
            wordCount.textContent = '0';
            if (commentBadge) commentBadge.textContent = commentCount;

            // Animación de entrada
            item.style.opacity = '0';
            item.style.transform = 'translateY(-8px)';
            requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        });
    }


    /* ════════════════════════════════════════
    TABS
    ════════════════════════════════════════ */
    document.querySelectorAll('.ctab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const mode   = this.dataset.tab;
            const items  = [...commentList.querySelectorAll('.comment-item')];

            if (mode === 'latest') {
                // most recent first → reverse DOM order
                items.reverse().forEach(i => commentList.appendChild(i));
            } else if (mode === 'oldest') {
                // oldest first
                items.reverse().forEach(i => commentList.appendChild(i));
            }
            // 'best' would sort by likes — left as UI-only for now
        });
    });

});