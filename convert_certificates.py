from pathlib import Path
import fitz

base = Path('/d/beautiful portfolio')
input_dir = base / 'sertificates'
output_dir = base / 'public' / 'certificates'
output_dir.mkdir(parents=True, exist_ok=True)

for pdf_path in sorted(input_dir.glob('*.pdf')):
    doc = fitz.open(pdf_path)
    print(f'Processing {pdf_path.name} pages={len(doc)}')
    for page_num, page in enumerate(doc, start=1):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        out_name = f"{pdf_path.stem.replace(' ', '_')}_page{page_num}.png"
        out_path = output_dir / out_name
        pix.save(str(out_path))
        print(f'  Saved: {out_path.name}')
