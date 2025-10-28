// A11y extras (progressive enhancement, sem quebrar nada existente)
(function(){
  function ready(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded', fn);} else { fn(); } }
  ready(function(){
    // 1) Skip link dinâmico
    var main = document.querySelector('main');
    if(main && !main.id){ main.id = 'conteudo'; }
    var skip = document.createElement('a');
    skip.href = '#conteudo';
    skip.className = 'skip-link';
    skip.textContent = 'Pular para o conteúdo';
    document.body.insertBefore(skip, document.body.firstChild);

    // 2) Toggle Alto Contraste (Alt+H) + persistência
    var KEY = 'pref_contrast_high';
    function applyPref(){
      try{
        var pref = localStorage.getItem(KEY);
        if(pref === '1'){ document.body.classList.add('contrast-high'); }
      }catch(e){}
    }
    applyPref();
    document.addEventListener('keydown', function(e){
      if(e.altKey && (e.key==='h' || e.key==='H')){
        e.preventDefault();
        document.body.classList.toggle('contrast-high');
        try{ localStorage.setItem(KEY, document.body.classList.contains('contrast-high') ? '1' : '0'); }catch(err){}
      }
    });

    // 3) Força foco visível ao navegar por teclado
    function handleFirstTab(e){
      if(e.key === 'Tab'){
        document.documentElement.classList.add('using-keyboard');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  });
})();
