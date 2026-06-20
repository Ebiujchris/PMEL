import os, glob, re
html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    # Remove only the standard contact link, not 'Get in Touch' or footer links.
    new_content = re.sub(r'^[ \t]*<li><a href="contact\.html"(?: class="active")?>Contact</a></li>\n', '', content, flags=re.MULTILINE)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Updated {f}')
