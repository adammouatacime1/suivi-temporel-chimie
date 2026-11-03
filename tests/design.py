"""Non-regression checks for the Diffraction design integration.

Requires Python Playwright and an installed Chromium. Serve the built site first:
  python3 tests/design.py http://127.0.0.1:8000/
  python3 tests/design.py URL --kit /path/to/design-kit --output docs/test

The original kit is the colour/type reference, never a pixel-equality reference:
the two laboratories deliberately display different scientific content. The HTML
report presents their real screenshots side by side. It does not invent a visual
similarity score. The historical commit is served privately on a temporary local
port to compare the actual rendered mathematical and pedagogical content.
"""
import argparse
from collections import Counter
from contextlib import contextmanager
import difflib
import functools
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import io
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tarfile
import tempfile
import threading
from html import escape

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
EXTERNAL_KIT = Path('/tmp/diffraction-design-source/design-kit')
DEFAULT_KIT = EXTERNAL_KIT if EXTERNAL_KIT.exists() else ROOT / 'design-kit'
SECTIONS = ['bases', 'avancement', 'quantites', 'suivi', 'vitesse', 'demi',
            'facteurs', 'simulations', 'exercices', 'revision', 'glossaire', 'erreurs']


@contextmanager
def historical_site(ref):
    """Read an existing commit without resetting or changing the working tree."""
    archive = subprocess.run(['git', 'archive', '--format=tar', ref], cwd=ROOT,
                             check=True, capture_output=True).stdout
    with tempfile.TemporaryDirectory(prefix='chimie-design-baseline-') as directory:
        with tarfile.open(fileobj=io.BytesIO(archive)) as files:
            files.extractall(directory, filter='data')

        class QuietHandler(SimpleHTTPRequestHandler):
            def log_message(self, *_args):
                pass

        handler = functools.partial(QuietHandler, directory=directory)
        server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            yield f'http://127.0.0.1:{server.server_port}/'
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)


def snapshot(page):
    """Ignore visual chrome and KaTeX's duplicate presentation, retain raw TeX."""
    return page.evaluate(r"""ids => Object.fromEntries(ids.map(id => {
      const section = document.getElementById(id);
      if (!section) return [id, null];
      const formulas = [...section.querySelectorAll('.katex annotation')].map(a => a.textContent.trim());
      const diagramLabels = [...section.querySelectorAll('svg[role="img"]')]
        .filter(svg=>!svg.closest('[aria-hidden="true"]'))
        .map(svg=>svg.textContent.replace(/\s+/g,' ').trim()).filter(Boolean);
      const clone = section.cloneNode(true);
      clone.querySelectorAll('.katex').forEach(math => {
        const tex = math.querySelector('annotation')?.textContent || math.textContent;
        math.replaceWith(document.createTextNode(` ⟦${tex}⟧ `));
      });
      clone.querySelectorAll('svg,script,style,[aria-hidden="true"]').forEach(el => el.remove());
      const text = clone.textContent.normalize('NFC')
        .replace(/[▶Ⅱ↺⌁✎▤●→↳↑☰◐]/g, '').replace(/\s+/g, ' ').trim();
      const controls = [...section.querySelectorAll('input,select')].map(el => ({
        id: el.id, type: el.type,
        min: el.getAttribute('min'), max: el.getAttribute('max'), step: el.getAttribute('step'),
        options: el.tagName === 'SELECT' ? [...el.options].map(o => [o.value,o.text]) : null
      }));
      return [id, {text, formulas, controls, diagramLabels}];
    }))""", SECTIONS)


CONTRAST_AUDIT = r"""() => {
  const rgba = value => {
    const match = value.match(/^rgba?\(([^)]+)\)$/);
    if (!match) return null;
    const n = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return [n[0],n[1],n[2],n.length>3?n[3]:1];
  };
  const over = (front,back) => {
    const a=front[3]+back[3]*(1-front[3]);
    return [0,1,2].map(i=>(front[i]*front[3]+back[i]*back[3]*(1-front[3]))/a).concat(a);
  };
  const luminance = c => c.slice(0,3).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4)
    .reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
  const ratio = (a,b) => {
    const x=luminance(a),y=luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
  };
  const backgroundCache = new WeakMap();
  function backgrounds(el) {
    if (!el) return [[255,255,255,1]];
    if (backgroundCache.has(el)) return backgroundCache.get(el);
    const style=getComputedStyle(el), bg=rgba(style.backgroundColor);
    let colors=backgrounds(el.parentElement).map(base=>bg?over(bg,base):base);
    // Test both gradient endpoints/stops, rather than assuming a white background.
    const stops=[...style.backgroundImage.matchAll(/rgba?\([^)]+\)/g)].map(m=>rgba(m[0])).filter(Boolean);
    if(stops.length) colors=colors.flatMap(base=>stops.map(stop=>over(stop,base))).slice(0,24);
    backgroundCache.set(el,colors); return colors;
  }
  const failures=[], samples=[];
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while(node=walker.nextNode()) {
    const text=node.textContent.trim(), el=node.parentElement;
    if(!text||!el||el.closest('svg,.katex,script,style,option,textarea,noscript,[aria-hidden="true"]')) continue;
    if(el.closest('button:disabled,input:disabled,select:disabled')) continue;
    const r=el.getBoundingClientRect(), style=getComputedStyle(el);
    if(!el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true})||!r.width||!r.height||r.right<=0||r.left>=innerWidth) continue;
    if(el.closest('.skip')&&!el.matches(':focus')) continue;
    const color=rgba(style.color);
    if(!color) continue;
    const size=parseFloat(style.fontSize), weight=parseInt(style.fontWeight)||400;
    const required=(size>=24||(size>=18.66&&weight>=700))?3:4.5;
    const contrast=Math.min(...backgrounds(el).map(bg=>ratio(over(color,bg),bg)));
    const item={text:text.slice(0,130),selector:el.id?'#'+el.id:el.tagName.toLowerCase()+'.'+[...el.classList].join('.'),
      color:style.color, fontSize:size, weight, ratio:Math.round(contrast*100)/100, required};
    samples.push(item);
    if(contrast+.01<required) failures.push(item);
  }
  return {tested:samples.length, failures, lowest:samples.sort((a,b)=>a.ratio-b.ratio).slice(0,12)};
}"""


TOUCH_AUDIT = r"""() => [...document.querySelectorAll('button,input:not([type="hidden"]),select,summary,a')]
  .filter(el=>!el.disabled&&el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true}))
  .flatMap(el=>{
    const style=getComputedStyle(el);
    // Inline links inside prose have the WCAG inline-target exception.
    if(el.tagName==='A'&&style.display==='inline'&&!el.closest('nav,.top-tools'))return [];
    let target=el;
    if(el.matches('input[type="checkbox"],input[type="radio"]'))target=el.closest('label')||el.labels?.[0]||el;
    const r=target.getBoundingClientRect();
    if(!r.width||!r.height||r.right<=0||r.left>=innerWidth)return [];
    return r.width>=43.5&&r.height>=43.5?[]:[{id:el.id,text:(el.getAttribute('aria-label')||target.textContent||el.type).trim().slice(0,95),width:r.width,height:r.height}];
  })"""


def run(args):
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    source_css = args.kit / 'src/styles.css'
    if not source_css.is_file():
        raise SystemExit(f'Kit source absent : {source_css}. Fournir --kit /chemin/design-kit.')
    css = source_css.read_text()
    tokens = sorted(set(re.findall(r'(--lk-[\w-]+)\s*:', css)))
    report = {'url': args.url, 'baseline': args.baseline_ref, 'source': str(args.kit),
              'source_css_sha256': hashlib.sha256(css.encode()).hexdigest(),
              'checks': [], 'failures': [], 'captures': []}

    def check(name, condition, detail=None):
        report['checks'].append({'name': name, 'passed': bool(condition), 'detail': detail})
        if not condition:
            report['failures'].append(name)

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'), args=['--no-sandbox'])
        context = browser.new_context(viewport={'width':390,'height':844}, reduced_motion='reduce')
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(args.url, wait_until='networkidle')
        page.wait_for_selector('#exercices .exercise')
        page.wait_for_function('document.querySelectorAll(".katex").length>500')
        current = snapshot(page)
        with historical_site(args.baseline_ref) as baseline_url:
            baseline_page = context.new_page()
            baseline_page.goto(baseline_url, wait_until='networkidle')
            baseline_page.wait_for_function('document.querySelectorAll(".katex").length>500')
            previous = snapshot(baseline_page)
            baseline_page.close()
        (output/'pedagogical-content-before.json').write_text(json.dumps(previous, ensure_ascii=False, indent=2))
        (output/'pedagogical-content-after.json').write_text(json.dumps(current, ensure_ascii=False, indent=2))
        for section in SECTIONS:
            before, after = previous.get(section), current.get(section)
            check(f'Contenu présent : {section}', before is not None and after is not None)
            if before is None or after is None:
                continue
            diff = list(difflib.unified_diff(before['text'].split('. '),after['text'].split('. '),n=1))[:16]
            check(f'Texte pédagogique conservé : {section}', before['text']==after['text'], diff)
            check(f'Formules TeX conservées : {section}', Counter(before['formulas'])==Counter(after['formulas']),
                  {'before':len(before['formulas']), 'after':len(after['formulas'])})
            check(f'Bornes et choix scientifiques conservés : {section}', before['controls']==after['controls'])
            check(f'Légendes scientifiques SVG conservées : {section}', Counter(before['diagramLabels'])==Counter(after['diagramLabels']))

        actual_copy = ROOT / 'design-kit/src/styles.css'
        if actual_copy.exists():
            check('Feuille du kit copiée sans modification', actual_copy.read_bytes()==source_css.read_bytes())

        for theme in ('light','dark'):
            page.evaluate("theme=>{document.documentElement.dataset.theme=theme;document.querySelector('.lab-kit').dataset.labTheme=theme}", theme)
            source = page.evaluate(r"""async ({css,tokens,theme})=>{
              const frame=document.createElement('iframe');
              frame.style.cssText='position:fixed;left:-10000px;width:400px;height:400px';
              document.body.append(frame);
              const doc=frame.contentDocument;
              doc.open();doc.write('<!doctype html><style>'+css+'</style><div class="lab-kit" data-lab-theme="'+theme+'">Référence</div>');doc.close();
              const style=frame.contentWindow.getComputedStyle(doc.querySelector('.lab-kit'));
              const result={tokens:Object.fromEntries(tokens.map(t=>[t,style.getPropertyValue(t).trim()])),font:style.fontFamily};
              frame.remove();return result;
            }""", {'css':css,'tokens':tokens,'theme':theme})
            actual = page.locator('.lab-kit').first.evaluate("(el,tokens)=>{const s=getComputedStyle(el);return {tokens:Object.fromEntries(tokens.map(t=>[t,s.getPropertyValue(t).trim()])),font:s.fontFamily}}", tokens)
            mismatches={name:{'source':source['tokens'][name],'current':actual['tokens'][name]} for name in tokens if source['tokens'][name]!=actual['tokens'][name]}
            check(f'Tokens exacts du kit : {theme}', not mismatches, mismatches)
            check(f'Pile typographique exacte : {theme}', source['font']==actual['font'], actual['font'])

            for width in (390,600,768,1440):
                page.set_viewport_size({'width':width,'height':844 if width==390 else 1000})
                page.evaluate('scrollTo(0,0)')
                overflow = page.evaluate('({viewport:innerWidth,document:document.documentElement.scrollWidth})')
                check(f'Absence de débordement : {theme}/{width}', overflow['document']<=width, overflow)
                touch = page.evaluate(TOUCH_AUDIT)
                check(f'Cibles tactiles ≥44px : {theme}/{width}', not touch, touch[:40])
                if width in (390,1440):
                    audit = page.evaluate(CONTRAST_AUDIT)
                    check(f'Contrastes des textes et actions : {theme}/{width}', not audit['failures'], audit)
                    name=f'chimie-{width}-{theme}.png'
                    page.screenshot(path=str(output/name))
                    report['captures'].append({'name':name,'theme':theme,'width':width,'zone':'Vue d’ensemble'})
                    simulation=page.locator('#sim-zinc')
                    simulation.screenshot(path=str(output/f'chimie-simulation-{width}-{theme}.png'))
                    page.evaluate('scrollTo(0,0)')

            page.set_viewport_size({'width':390,'height':844})
            page.evaluate("()=>{document.body.tabIndex=-1;document.body.focus();scrollTo(0,0)}")
            focus_failures=[]
            for _ in range(75):
                page.keyboard.press('Tab')
                focus=page.evaluate("""()=>{const e=document.activeElement,s=getComputedStyle(e),r=e.getBoundingClientRect();return {tag:e.tagName,id:e.id,name:(e.getAttribute('aria-label')||e.textContent||e.type||'').trim().slice(0,90),visible:e.matches(':focus-visible'),outline:s.outlineStyle,width:parseFloat(s.outlineWidth),shadow:s.boxShadow,rect:{left:r.left,right:r.right,width:r.width,height:r.height}}}""")
                if focus['tag']=='BODY':
                    break
                ring=focus['visible'] and ((focus['outline']!='none' and focus['width']>=2) or focus['shadow']!='none')
                in_view=focus['rect']['right']>0 and focus['rect']['left']<390
                if not ring or not in_view:
                    focus_failures.append(focus)
            check(f'Navigation Tab et focus visible : {theme}', not focus_failures, focus_failures)
            page.evaluate('document.body.removeAttribute("tabindex")')

        check('Aucune erreur JavaScript pendant les vérifications', not errors, errors)
        browser.close()

    # Original screenshots are evidence of the source design, not a new mock-up.
    for width, device in ((390,'mobile'),(1440,'desktop')):
        for theme in ('light','dark'):
            reference=args.kit/f'references/diffraction-{device}-{theme}.png'
            if reference.exists():
                shutil.copyfile(reference,output/f'source-{width}-{theme}.png')

    (output/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    rows=''.join(f'<tr><td>{escape(c["name"])}</td><td>{"Réussi" if c["passed"] else "À corriger"}</td></tr>' for c in report['checks'])
    comparisons=''.join(f'<section><h2>{width}px · {theme}</h2><div class="pair"><figure><img src="source-{width}-{theme}.png" alt="Laboratoire de diffraction de référence"><figcaption>Source : laboratoire de diffraction</figcaption></figure><figure><img src="chimie-{width}-{theme}.png" alt="Site de chimie dans le même thème et à la même largeur"><figcaption>Intégration : cours de cinétique</figcaption></figure></div><p><a href="chimie-simulation-{width}-{theme}.png">Voir le module de simulation</a></p></section>' for width in (390,1440) for theme in ('light','dark'))
    (output/'index.html').write_text(f'<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vérification de l’intégration du design</title><style>body{{font:16px/1.6 system-ui,sans-serif;max-width:1500px;margin:auto;padding:20px;background:#edf2f5;color:#243b49}}.pair{{display:grid;grid-template-columns:1fr 1fr;gap:20px}}figure{{margin:0}}img{{width:100%;height:auto;border:1px solid #617785}}table{{border-collapse:collapse;background:white;width:100%}}td{{padding:8px;border:1px solid #617785}}a{{color:#243e4e}}@media(max-width:600px){{.pair{{grid-template-columns:1fr}}}}</style><h1>Vérification de l’intégration du design</h1><p>La source et le cours ont des contenus différents. Ces captures permettent de comparer le langage visuel ; aucune égalité de pixels n’est attendue.</p><p>Les tokens sont comparés à la feuille source, les textes et formules à la version antérieure. Les contrastes mesurent les couleurs CSS appliquées, y compris les fonds transparents et les étapes des dégradés ; ils ne remplacent pas une vérification sur iPhone réel.</p><p><a href="report.json">Rapport détaillé JSON</a></p>{comparisons}<h2>Résultats</h2><table><tbody>{rows}</tbody></table></html>')
    print(f'{len(report["checks"])} contrôles ; {len(report["failures"])} à corriger. Rapport : {output}/index.html')
    for failure in report['failures']:
        print(f'  ÉCHEC : {failure}')
    return 1 if report['failures'] else 0


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('url',nargs='?',default='http://127.0.0.1:8000/')
    parser.add_argument('--kit',type=Path,default=DEFAULT_KIT)
    parser.add_argument('--baseline-ref',default='b2e9f41')
    parser.add_argument('--output',type=Path,default=Path('/tmp/chimie-design-checks'))
    raise SystemExit(run(parser.parse_args()))
