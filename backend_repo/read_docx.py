import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path):
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    text = []
    try:
        with zipfile.ZipFile(docx_path) as docx:
            tree = ET.fromstring(docx.read('word/document.xml'))
            for paragraph in tree.findall('.//w:p', ns):
                para_text = []
                for run in paragraph.findall('.//w:r', ns):
                    t = run.find('w:t', ns)
                    if t is not None and t.text is not None:
                        para_text.append(t.text)
                text.append(''.join(para_text))
        return '\n'.join(text)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    text = extract_text_from_docx(sys.argv[1])
    with open('extracted_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
