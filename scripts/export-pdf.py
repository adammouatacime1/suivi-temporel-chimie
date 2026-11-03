"""Export local du cours complet et des corrigés (Python Playwright + Chromium)."""
import os
import sys
from playwright.sync_api import sync_playwright
url = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8000/'
target = sys.argv[2] if len(sys.argv) > 2 else 'docs/cours-et-corriges.pdf'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1200, 'height':900})
    page.goto(url, wait_until='networkidle')
    page.locator('.katex').first.wait_for()
    page.evaluate('document.fonts.ready')
    page.pdf(path=target, format='A4', print_background=True, prefer_css_page_size=True)
    browser.close()
print(f'PDF du cours et des corrigés exporté : {target}')
