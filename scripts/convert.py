#!/usr/bin/env python
import os
import subprocess
import sys
import venv
from base64 import b64encode

DPI = 300


def do_convert():
    fitz = __import__('fitz')

    input_file = sys.argv[1]
    output_file = os.path.splitext(input_file)[0] + '.pptx'

    document = fitz.Document(input_file)
    subproc = subprocess.Popen(['node_modules/.bin/ts-node', 'scripts/convert.ts', output_file], stdin=subprocess.PIPE)

    for i, page in enumerate(document):
        matrix = fitz.Matrix(DPI / 72, DPI / 72, 0)
        pixmap: fitz.Pixmap = page.get_pixmap(matrix=matrix)
        subproc.stdin.write(b64encode(pixmap.tobytes()) + b'\n')
        subproc.stdin.flush()

    subproc.stdin.close()
    subproc.wait()


def main():
    if not os.path.exists('venv'):
        venv.create('venv', with_pip=True)
        subprocess.call(['sh', '-c', 'source venv/bin/activate && pip install PyMuPDF'])

    if os.environ.get('VIRTUAL_ENV'):  # in venv
        # convert PDF to PPTX
        do_convert()
    else:  # system interpreter
        os.execvp('sh', ['sh', '-c', f'source venv/bin/activate && exec python {sys.argv[0]} {sys.argv[1]}'])


if __name__ == '__main__':
    main()
