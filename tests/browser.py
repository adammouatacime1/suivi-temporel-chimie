"""Functional checks for the built site. Requires Python Playwright + Chromium.
Run a server on dist, then: python3 tests/browser.py http://127.0.0.1:8000/
"""
import math
import os
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8000/'

def slider(page, selector, value):
    page.locator(selector).evaluate('(e,v)=>{e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}))}', str(value))

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), args=['--no-sandbox'])
    context = browser.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True, reduced_motion='reduce')
    page = context.new_page()
    errors, failed_requests, remote = [], [], []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('response', lambda r: failed_requests.append(f'{r.status} {r.url}') if r.status >= 400 else None)
    page.on('request', lambda r: remote.append(r.url) if not r.url.startswith(URL.split('/',3)[0]+'//'+URL.split('/')[2]) else None)
    page.goto(URL,wait_until='networkidle')
    assert page.locator('.katex').count() > 500
    assert page.locator('.katex-error').count() == 0
    pdf = page.request.get(URL + 'docs/cours-et-corriges.pdf')
    assert pdf.status == 200 and 'application/pdf' in pdf.headers.get('content-type','')
    assert pdf.body().startswith(b'%PDF-')
    assert page.locator('a.pdf-button').count() >= 2
    assert page.locator('form[data-exercise]').count() == 14
    assert page.locator('.sim-card').count() == 5
    assert page.locator('details.correction[open]').count() == 0
    assert not page.evaluate('Array.from(document.querySelectorAll("a")).filter(e=>e.hash && !document.getElementById(e.hash.slice(1))).map(e=>e.hash)'), 'broken section links'
    assert not page.evaluate('Object.entries(Array.from(document.querySelectorAll("[id]")).reduce((a,e)=>(a[e.id]=(a[e.id]||0)+1,a),{})).filter(([id,n])=>n>1)'), 'duplicate IDs'

    for width in (320,375,390,768,1440):
        page.set_viewport_size({'width':width,'height':900})
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), f'page overflow at {width}'
    page.set_viewport_size({'width':390,'height':844})
    page.locator('#menu').click()
    assert page.locator('#menu').get_attribute('aria-expanded') == 'true'
    page.locator('#sidebar a[href="#bases"]').click()
    assert page.locator('#menu').get_attribute('aria-expanded') == 'false'

    page.locator('[data-progress="bases"]').check()
    page.locator('[data-progress="ex-quantites"]').check()
    page.locator('#theme').click()
    assert page.locator('html').get_attribute('data-theme') == 'dark'
    page.reload(wait_until='networkidle')
    assert page.locator('[data-progress="bases"]').is_checked()
    assert page.locator('[data-progress="ex-quantites"]').is_checked()
    assert page.locator('#progress-text').inner_text() == '1 / 7 chapitres compris'
    assert page.locator('html').get_attribute('data-theme') == 'dark'
    page.locator('#theme').click()

    # Every numerical form: incorrect response, then correct response (French decimal).
    answers = ['5','0,12','2,5','12','2','1','6','4','0,002','0,0002','40','13,9','0,000417','5']
    for form, answer in zip(page.locator('form[data-exercise]').all(), answers):
        form.locator('input').fill('99999')
        form.locator('button').click()
        assert form.locator('[data-result="retry"]').count() == 1
        form.locator('input').fill(answer)
        form.locator('button').click()
        assert form.locator('[data-result="correct"]').count() == 1, form.get_attribute('data-exercise')
    page.locator('#answer-quantites').fill('pas un nombre')
    page.locator('form[data-exercise="quantites"] button').click()
    assert page.locator('#answer-quantites').get_attribute('aria-invalid') == 'true'
    for button in page.locator('[data-hint]').all():
        button.click()
        assert page.locator('#'+button.get_attribute('data-hint')).is_visible()
        button.click()
        assert page.locator('#'+button.get_attribute('data-hint')).is_hidden()
    for summary in page.locator('details.correction summary').all():
        summary.click()
        assert summary.locator('..').get_attribute('open') is not None
        summary.click()
    for card in page.locator('[data-question]').all():
        for button in card.locator('[data-choice]').all():
            button.click()
            assert card.locator('.answer-feedback').inner_text()
            assert button.get_attribute('aria-pressed') == 'true'

    # Exact stoichiometry and limits through UI, including absent reactants.
    page.locator('#zinc-initial').fill('4')
    page.locator('#acid-initial').fill('6')
    slider(page,'#s1-time',3)
    assert '1,00' in page.locator('#zinc-table tr').nth(0).inner_text()
    assert '0,00' in page.locator('#zinc-table tr').nth(1).inner_text()
    assert page.locator('#s1-time').get_attribute('max') == '3'
    page.locator('#zinc-initial').fill('-1')
    assert page.locator('#zinc-initial').input_value() == '0'
    assert page.locator('#s1-time').input_value() == '0'
    assert page.locator('[data-play="s1"]').is_disabled()
    page.locator('#zinc-initial').fill('4')
    page.locator('#acid-initial').fill('10')
    slider(page,'#s2-time',math.log(2)/.3)
    assert '1,994 mmol' in page.locator('#tangent-values').inner_text()  # range rounds to its 0.05 min step (2.30 min)
    page.locator('#show-secant').check()
    assert 'Sécante de' in page.locator('#tangent-values').inner_text()
    page.locator('#half-solution').uncheck()
    slider(page,'#half-guess',2.3)
    page.locator('#half-check').click()
    assert 'Bien placé' in page.locator('#half-feedback').inner_text()
    page.locator('#half-solution').check()
    assert '2,310' in page.locator('#half-values').inner_text()
    slider(page,'#s4-time',5)
    extent = page.locator('#pressure-values strong').first.inner_text()
    pressure_before = page.locator('#pressure-values strong').nth(1).inner_text()
    slider(page,'#gas-volume',1)
    assert extent == page.locator('#pressure-values strong').first.inner_text(), 'gas volume changed kinetics'
    assert pressure_before != page.locator('#pressure-values strong').nth(1).inner_text()
    for option in ('temperature','concentration','surface','catalyst'):
        page.locator('#factor-choice').select_option(option)
        assert page.locator('#factor-explanation').inner_text()
    slider(page,'#factor-ratio',3)
    assert '0,77 min' in page.locator('#factor-values').inner_text()

    for i in range(1,6):
        page.locator(f'[data-reset="s{i}"]').click()
        page.locator(f'[data-play="s{i}"]').click()
        page.wait_for_timeout(1050)
        assert float(page.locator(f'#s{i}-time').input_value())>0, f'animation {i} did not advance'
        page.locator(f'[data-pause="s{i}"]').click()
        before=page.locator(f'#s{i}-time').input_value()
        page.wait_for_timeout(150)
        assert page.locator(f'#s{i}-time').input_value()==before
        page.locator(f'[data-reset="s{i}"]').click()
        assert float(page.locator(f'#s{i}-time').input_value())==0

    page.emulate_media(reduced_motion='no-preference')
    page.locator('[data-play="s2"]').click()
    page.wait_for_timeout(350)
    assert float(page.locator('#s2-time').input_value())>0
    page.locator('[data-pause="s2"]').click()
    # Print expands all corrections, then restores their initial state.
    page.evaluate('window.dispatchEvent(new Event("beforeprint"))')
    assert page.locator('details.correction[open]').count()==14
    page.emulate_media(media='print')
    assert page.locator('details.correction').first.is_visible()
    page.pdf(path='/tmp/chimie-cours-corriges.pdf',format='A4',print_background=True)
    page.evaluate('window.dispatchEvent(new Event("afterprint"))')
    assert page.locator('details.correction[open]').count()==0
    page.emulate_media(media='screen')
    page.goto(URL, wait_until='networkidle')
    page.screenshot(path='/tmp/chimie-mobile.png')
    page.set_viewport_size({'width':1440,'height':1000})
    page.screenshot(path='/tmp/chimie-desktop.png')
    assert not errors, errors
    assert not failed_requests, failed_requests
    assert not remote, remote
    print('PASS: 5 viewports, 14 answers, 28 hints, 14 corrections, 4 QCM, 5 simulations, normal/reduced motion, persistence, theme, local assets, formulas, links and print.')
    browser.close()
